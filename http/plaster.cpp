#include<string>
#include<iostream>
#include<map>
using namespace std;

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
    map<string,string> temp;
    string test;
    test+="GET /index.html HTTP/1.1\r\n";
    test+="h2:test0\r\n";
    test+="h1ost:test1\r\n";
    test+="h2ost:test2\r\n";
    test+="h3ost:test3\r\n";
    test+="h4ost:test4\r\n";
    test+="h5ost:test5\r\n";
    test+="h6ost:test6\r\n";
    test+="h7ost:test7\r\n";
    test+="\r\n";
    test+="username=test&password=test";
    resolver T;
    temp=T.interpreter(test);
    cout<<endl<<endl;
    for(auto it=temp.begin();it!=temp.end();it++)
    {
        cout<<it->first<<" "<<it->second<<endl;
    }
    //cout<<temp["host:test0"]<<endl;
    return 0;
}