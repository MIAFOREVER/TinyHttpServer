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
#include <map>
using namespace std;
class HttpServer
{
#define QUEUE 1
#define MAXBUFFER 1024
#define IP "127.0.0.1"
    public:
    bool socketInit(int port)
    {
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
    void sendEndMessage(int connect)
    {
        string message="exit";
        sendMessage(message,connect);
    }
    private:
    int socketServerNum;
    int error; 
    struct sockaddr_in server;
    struct sockaddr_in client;
};
class resolver
{
    public:
    map<string,string> interpreter(string recv)
    {
        string recvBuffer=recv;
        map<string,string> message;
        message.clear();
        size_t _method;
        size_t _url;
        size_t _version;
        size_t begin=0;
        size_t body=0;
        string method;
        string url;
        string version;
        string line;
        int num=0;
        for(int i=0;i<recvBuffer.length();i++)
        {
            if(recvBuffer[i]==' '&&num==1)
            {
                _url=i;
                num++;
            }
            else if(recvBuffer[i]==' '&&num==0)
            {
                _method=i;
                num++;
            }
            else if(recvBuffer[i]=='\r')
            {
                _version=i;
                break;
            }
        }
        method=recvBuffer.substr(0,_method);
        url=recvBuffer.substr(_method+1,_url-_method-1);
        version=recvBuffer.substr(_url+1,_version-_url-1);
        message.insert(pair<string,string>("method",method));
        message.insert(pair<string,string>("url",url));
        message.insert(pair<string,string>("version",version));
        recvBuffer=recvBuffer.assign(recvBuffer.begin()+_version+2,recvBuffer.end());
        
        for(int i=0;i<recvBuffer.length();i++)
        {
            if(recvBuffer[i]=='\r'&&recvBuffer[i+1]=='\n')
            {
                line=recvBuffer.substr(begin,i-begin);
                size_t temp=0;
                for(int j=0;j<=line.length();j++)
                {
                    if(line[j]==':')
                    {
                        temp=j;
                        break;
                    }
                }
                string key=line.substr(0,temp);
                string value=line.substr(temp+1,line.length());
                message.insert(pair<string,string>(key,value));
                begin=i+2;
            }
            if(recvBuffer[i]=='\r'&&recvBuffer[i+1]=='\n'&&recvBuffer[i+2]=='\r'&&recvBuffer[i+3]=='\n')
            {
                body=i;
                break;
            }
        }
        recvBuffer.assign(recvBuffer.begin()+body+4,recvBuffer.end());
        begin=0;
        for(int i=0;i<=recvBuffer.length();i++)
        {
            if(recvBuffer[i]=='&'||i==recvBuffer.length())
            {
                int temp;
                line=recvBuffer.substr(begin,i-begin);
                for(int j=0;j<line.length();j++)
                {
                    if(line[j]=='=')
                    {
                        temp=j;
                        break;
                    }
                }
                string key=line.substr(0,temp);
                string value=line.substr(temp+1,line.length()-temp-1);
                message.insert(pair<string,string>(key,value));
                begin=i+1;
            }
        }
        return message;
    }
};
int main()
{
    HttpServer test;
    resolver p;
    test.socketInit(9999);
    test.socketListen();
    while(1)
    {
        cout<<"successful\n";
        int connect=test.socketAccept();
        if(connect!=-1)
        {
            string recvBuffer=test.recvMessage(connect);
            map<string,string> T=p.interpreter(recvBuffer);
            for(auto i=T.begin();i!=T.end();i++)
            {
                cout<<i->first<<" "<<i->second<<endl;
            }
            string message="<p>test</p>";
            test.sendMessage(message,connect);
            test.sendEndMessage(connect);
        }
    }
    return 0;
}