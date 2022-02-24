#include <stdio.h>
#include <string.h>

long BF(char text[], char pattern[]);

int main(){
	int result;
	
	char array[500000];
	char pattern[500000];
	
	scanf("%s", &array);
	scanf("%s", &pattern);
	
	result = BF(array,pattern);
	printf("%d", result);
}

long BF(char text[], char pattern[]){
	int i, j, n, m, count;
	count = 0;
	n = strlen(text);
	m = strlen(pattern);
	for(i = 0; i < n - m + 1; i++){
		j = 0;
		while(j < m && text[i+j] == pattern[j]){
			j++;
			if(j == m){
				count++;
			}
		}
	}
	return count;
}
