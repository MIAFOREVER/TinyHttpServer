#include<fstream>
#include<iostream>
using namespace std;
#include <stdlib.h>
 
int main(){
	char *pathvar = getenv("PATH"); 
	printf("pathvar is : %s\n",pathvar);
	return 0;
}