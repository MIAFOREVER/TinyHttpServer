#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <errno.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string>
#include <iostream>
#include <fstream>
#include <thread>
#include <vector>
#include "client.cpp"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h>
#include <bits/types.h>
using namespace std;



class HttpServer
{
#define QUEUE 1
#define MAXBUFFER 1024
#define IP "127.0.0.1"
    private:
    bool socketInit(int port)
    {
        startCgiService("cgi");
        socketServerNum=socket(AF_INET,SOCK_STREAM, 0);
        server.sin_family = AF_INET; 
        server.sin_port = htons(port); 
        server.sin_addr.s_addr = htonl(INADDR_ANY);
        if(bind(socketServerNum,(struct sockaddr *)&server,sizeof(server))==-1) 
        { 
            cout<<"bind error!"<<endl;
            return false;
        }
        return true;
    }
    bool socketListen()
    {
        if(listen(socketServerNum,QUEUE) == -1) 
        { 
            cout<<"listen error!"<<endl;
            return false; 
        }
        return true;
    }
    bool sendMessage(const string& message,int connect)
    {
        if(send(connect, message.c_str(), message.length(), 0)==-1)
        {
            return false;
        } 
        return true;
    }
    string recvMessage(int connect)
    {
        char buffer[1024]={0};
        int len = recv(connect, buffer, sizeof(buffer),0); 
        if(len==-1)
        {
            cout<<"recv message error!"<<endl;
            error=-1;
            string recvMessage="";
            return recvMessage;
        }
        else
        {
            buffer[len]='\0';
            string recvMessage=buffer;
            return recvMessage;
        }
    }
    void closeConnect(int connect)
    {
        close(connect);
    }
    
    void sendErrorMessage(int connect)
    {
        string message;
        message="HTTP/1.0 501 Method Not Implemented\r\n";
        
        message+="Content-Type: text/html\r\n";

        message="Server: TinyHttp V0.1.0\r\n";
        
        message+="\r\n";
        
        message+="<HTML><HEAD><TITLE>Method Not Implemented\r\n";
        
        message+="</TITLE></HEAD>\r\n";
        
        message+="<BODY><P>HTTP request method not supported.\r\n";
        
        message+="</BODY></HTML>\r\n";
        sendMessage(message,connect);
    }
    void send404Message(int connect)
    {
        string message;
        message+="HTTP/1.0 404 CAN'T FIND FILE\r\n";

        message+="Content-Type: text/html\r\n";    

        message+="Server: TinyHttp V0.1.0\r\n";    

        message+="\r\n";

        message+="<HTML><HEAD><TITLE>\r\n";

        message+="404</TITLE></HEAD>\r\n";

        message+="<BODY><P>404</p>\r\n";

        message+="</BODY></HTML>\r\n";
        sendMessage(message,connect);
    }
    void startCgiService(string fileName)
    {
        //string T="./"+fileName;
        //system(T.c_str());
        cgiService.socketInit("127.0.0.1",9999);
        cgiService.socketConnet();
    }
    void closeCgiService()
    {
        cgiService.socketClose();
    }
    bool sendFile(int connect,string fileName,string type)
    {
        char buffer[1024]={0};
        ifstream fin;
        fin.open(fileName,std::ios::binary);
        cout<<fileName<<" "<<type<<endl;
        if(fin.is_open())
        {
            string message="HTTP/1.0 200 OK\r\n";
            sendMessage(message,connect);
            message="Server: TinyHttp V0.1.0\r\n";
            sendMessage(message,connect);
            if(type==".html")
                message="Content-Type: text/html;charset=UTF-8\r\n";
            else if(type==".css")
                message="Content-Type: text/css;charset=UTF-8\r\n";
            else if(type==".js")
                message="Content-Type: application/x-javascript;charset=UTF-8\r\n";
            else if(type==".jpg")
                message="Content-Type: application/x-jpg;charset=UTF-8\r\n";
            sendMessage(message,connect);
            message="\r\n";
            sendMessage(message,connect);
            fin.read(buffer,32);
            buffer[32]=0;
            while(!fin.eof())
            {    
                send(connect,buffer,32,0);
                fin.read(buffer,32);
                buffer[32]=0;
                if(fin.eof())
                {
                    buffer[fin.gcount()]=0;
                    send(connect,buffer,fin.gcount(),0);
                    break;
                }
            } 
            fin.close();
            return true;
        }
        else
        {
            return false;
        }
    }
    public:
    void serviceStart(int port)
    {
        socketInit(port);
        socketListen();
    }
    void closeSocket()
    {
        close(socketServerNum);
    }
    int socketAccept()
    {
        socklen_t length = sizeof(client); 
        int connect = accept(socketServerNum, (struct sockaddr*)&client, &length);
        if(connect<0)
        {
            cout<<"connect error!"<<endl;
            return -1;
        } 
        return connect;
    }
    void receiveHttpRequest()
    {
        while(1)
        {
            int connect=socketAccept();
            if(connect!=-1)
            {
                muiltTask(connect);
            }
        }
    }
    void muiltTask(int connect)
    {
        string recv;
        cout<<"\n\n";
        recv=recvMessage(connect);
        cout<<recv<<"\n\n";
        sendHttpRequest(recv,connect);
        closeConnect(connect);
    }
    void sendHttpRequest(string recvBuffer,int connect)
    {
        size_t _method;
        size_t _url;
        size_t _version;
        int num=0;
        for(int i=0;i<recvBuffer.size();i++)
        {
            if(recvBuffer[i]==' ')
            {
                if(num==0)
                    _method=i;
                if(num==1)
                {
                    _url=i;
                    break;
                }
                num++;
            }
        }
        string method=recvBuffer.substr(0,_method);
        string url=recvBuffer.substr(_method+1,_url-_method-1);
        cout<<method<<" "<<url<<" "<<endl;
        if(method=="GET")
        {
            string ip=IP;
            size_t _para=0;
            size_t fileType=0;
            for(int i=0;i<url.size();i++)
            {
                if(url[i]=='?')
                {
                    _para=i;
                }
                if(url[i]=='.')
                {
                    fileType=i;
                }
            }
            string fileName;
            string type;
            if(_para==0)
            {
                fileName=url;
                type=url.assign(url.begin()+fileType,url.end());
            }
                
            else
            {
                fileName=url.assign(url.begin(),url.begin()+_para);
                type=url.assign(url.begin()+fileType,url.begin()+_para);
            }         
            fileName='.'+fileName;
            if(!sendFile(connect,fileName,type))
                send404Message(connect);
        }
        else if(method=="POST")
        {
            cout<<recvBuffer<<endl;
            cgiService.sendMessage(recvBuffer);
            string receiveMessage;
            string receiveBuffer=cgiService.receiveMessage();
            cout<<receiveBuffer<<endl;
            while(receiveBuffer=="exit")
            {
                receiveMessage+=receiveBuffer;
            }
            string requestMessage;
            
            requestMessage+="HTTP/1.0 200 OK\r\n";
            
            requestMessage+="Content-Type: text/html;charset=utf-8\r\n";
            
            requestMessage+="\r\n";
            requestMessage+=receiveMessage;
            /*
            string tempBuffer;
            tempBuffer=cgiService.receiveMessage();
            while(tempBuffer!="\r\n\r\n")
            {
                requestMessage+=tempBuffer;
                tempBuffer=cgiService.receiveMessage();
            }
            */
            sendMessage(requestMessage,connect);
        }
        else 
        {
            sendErrorMessage(connect);
        }
    }
    private:
    int socketServerNum;
    int error; 
    struct sockaddr_in server;
    struct sockaddr_in client;
    HttpClient cgiService;
};

int main()
{
    HttpServer http;
    http.serviceStart(8887);
    http.receiveHttpRequest();
    http.closeSocket();
    return 0;
}