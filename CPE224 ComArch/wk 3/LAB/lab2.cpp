#include <stdio.h>

int main(){
	int n = 44, i, fn, f0 = 0, f1 = 1;
	for(i = 1; i < n; i++){ //loop in sequence i < 44
		//add 2 numbers in series and keep in fn
		fn = f0 + f1;
		f0 = f1;
		f1 = fn;
	}
	printf("result: %d", fn);
	return 0;
}
