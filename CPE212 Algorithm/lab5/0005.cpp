//#include <stdio.h>
#include <bits/stdc++.h>
using namespace std;

int dp[1000] = {0};
int minCoin(int S[], int m, int n){
	int i,j;
	int keep[m] = {0};
	
	for(i = 0; i <= n; i++){
		dp[i] = INT_MAX;
	}
	
	//base case
	dp[0] = 0;
	
	for(j = 0; j < m; j++){
		for(i = 1; i <= n; i++){
			if(S[j] <= i){
				dp[i] = min(dp[i], 1 + dp[i - S[j]]);
				//keep[j] = dp[i];
			}
			keep[j] = dp[i];
		}
	}
	
	for(j = 0; j < m; j++)
		printf("%d: %d\n", S[j], keep[j]);

	return dp[n];
}

int main(){
	int a,b,count;
	int Arr[100] = { 0 };
	scanf("%d",&a);
	scanf("%d",&count);
	for(int i = 0; i < count; i++){
		scanf("%d",&b);
		Arr[i] = b;
	}
	int coin = minCoin(Arr, count, a);
}
