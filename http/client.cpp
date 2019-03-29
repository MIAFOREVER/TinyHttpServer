#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <errno.h>
#include <string.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>
using namespace std;
class HttpClient{
    public:
    void socketInit(char* ip,int port)
    {
        clientSocket = socket(AF_INET,SOCK_STREAM, 0); 
        memset(&client, 0, sizeof(client)); 
        client.sin_family = AF_INET; 
        client.sin_port = htons(port); 
        client.sin_addr.s_addr = inet_addr(ip); 
    }
    bool  socketConnet()
    {
        if (connect(clientSocket, (struct sockaddr *)&client, sizeof(client)) < 0) 
        { 
            cout<<"connect error!"<<endl; 
            return false;
        } 
        return true;
    }
    void socketClose()
    {
        close(clientSocket);
    }
    bool sendMessage(string message)
    {
        int len=send(clientSocket, message.c_str(), strlen(message.c_str()),0);
        if(len==-1)
        {
            cout<<"send error!"<<endl;
            return false;
        }
        return true;
    }
    string receiveMessage()
    {
        char buffer[1024];
        string message;
        int len=recv(clientSocket,buffer,1024,0);
        if(len==-1)
        {
            cout<<"receive error!"<<endl;
            message;
            return message;
        }
        buffer[len]='\0';
        message=buffer;
        return message;
    }
    void sendHttpRequest(string message)
    {
        socketInit("127.0.0.1",8887);
        socketConnet();
        message="GET /index.html HTTP/1.0\r\n";

        message+="User-Agent: Test Robot\r\n";

        message+="Server: TinyHttpServer V0.1.0\r\n";
 
        message+="\r\n";

        message+="<p>this is a test program!\r\n";

        sendMessage(message);
        string recvMessage=receiveMessage();
        cout<<recvMessage;
        socketClose();
    }
    private:
    struct sockaddr_in client;
    int clientSocket;
    int error;
};
