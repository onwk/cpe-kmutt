#include <stdio.h>
#include <string.h>

int keep[257][257];
void operation(int A[257][257][3], int l, int r){
	if(l == r) return;
	else if(keep[l][r] == 1) return;
	else{
		keep[l][r] = 1;
		for(int i = l; i < r; i++){
			operation(A,l,i);
			operation(A,i+1,r);
			if(A[l][i][0] == 1){
				if(A[i+1][r][0] == 1)
					A[l][r][2] = 1;
				if(A[i+1][r][1] == 1)
					A[l][r][1] = 1;
				if(A[i+1][r][2] == 1)
					A[l][r][0] = 1;
			}
			if(A[l][i][1] == 1){
				if(A[i+1][r][0] == 1)
					A[l][r][2] = 1;
				if(A[i+1][r][1] == 1)
					A[l][r][1] = 1;
				if(A[i+1][r][2] == 1)
					A[l][r][1] = 1;
			}
			if(A[l][i][2] == 1){
				if(A[i+1][r][0] == 1)
					A[l][r][1] = 1;
				if(A[i+1][r][1] == 1)
					A[l][r][2] = 1;
				if(A[i+1][r][2] == 1)
					A[l][r][1] = 1;
			}
		}
	}
	return;
}

int main(){
	int n, i, A[257][257][3];
	int buff, count = 0;
	
	while(count < 10){
		memset(A,0,sizeof(A));
		memset(keep,0,sizeof(keep));
		scanf("%d",&n);
		for(i = 1; i <= n; i++){
			scanf("%1d", &buff);
			A[i][i][buff] = 1;
		}
		operation(A,1,n);
		if(A[1][n][0] == 1){
			printf("yes\n");
		}else{
			printf("no\n");
		}
		count++;	
	}	
}
