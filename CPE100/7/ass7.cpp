#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int getmenu();
int getint(int min,int max);
int getnum();
int fibo(int a);
int fac(int f);
double Sum(int start, int stop, double d);
int fn1(double T[], double S[], int n);
void arr1(double T[],int n);
int fn2(int T[], int n);
void arr2(int T[], int n);
int fn3(int min, int max, int T[]);
void arr3(int min, int max,int T[]);
int fn4(int n, int T[]);
void arr4(int T[],int n);
void fn5(int n);
//declare the functions

int getmenu(){ // function of menu
	int select;
	printf("\n\n Choose the function \n");
	printf("\n [1] -- Function 1 \n");
	printf("\n [2] -- Function 2 \n");
	printf("\n [3] -- Function 3 \n");
	printf("\n [4] -- Function 4 \n");
	printf("\n [5] -- Function 5 \n");
	printf("\n");
	printf("\n [0] -- Exit the Program \n");
	printf("\n");
	printf("Select: "); // users choose the number of functions
	
	return getint(0,5); // send number to getint to check that not error
}

int getint(int min,int max){ // function to check value that not error and that value between min and max
	int number;
	char enter;
	while((scanf("%d%c",&number,&enter)) != 2 || enter != '\n' || number < min || number > max){
		//recieve value and check that min < value < max and not be a charater
		rewind(stdin);
		//re-value
		printf("Please number between %d - %d: ", min, max);
		//warn users to input value again
	}
	return number; 
}

int getnum(){ // function to check value that not error , do not have min/max
	int num;
	char enter;
	while((scanf("%d%c",&num,&enter)) != 2 || enter != '\n' ){
		//recieve value and check that not be a character
		rewind(stdin);
		//re-value
		printf("Invalid Value --> ");
		//warn users to input again
	}
	return num;	
}

int fibo(int a){ // function to calculate fibonacci
	int ans;
	if(a<=1){ 
		ans = a; //if value <= 1 answer will be that value
	}else{
		ans = fibo(a-1) + fibo(a-2);	 //if value > 1 answer will be sum of value in location a-1 and a-2 
	}
	return ans;
}

int fac(int f){ // function to calculate factorial
	int ans, i; // declare value
	ans = f;
	for(i = f,ans = 1; i > 1 ;i--){ //give i = f and ans=1 if i>1 then i-1 per round 
		ans = ans*i; // give ans = ans *i
	}
	return ans;
}

double Sum(int start, int stop, double d){ // function to calculate summation
	int i; //declare variant
	double ans = 0;
	for(i = start; i <= stop; i++){ // give i = value of start if i <= value of stop then i+1 per round
		ans += i * d; //calculate ans = ans+(i*d)
	}
	return ans;
}

int fn1(double T[],double S[] ,int n){ // First function to calculate Summation/factorial
	double sum = 0;
	int i=1;
	//Daclare variant
	while(i<=n){  //loop at i <= n
		T[i] = Sum(1, i, 2.0)/ fac(i); 
		// calculate T(location i) = Sum of(1 to i that different for 2) divide by factorial of i
		sum += T[i]; // then sum = sum + T(location i)
		S[i] = sum; // then give S(location i) = sum
		i++; // then i+1
	}
	return 0;
}

void arr1(double T[],int n){ //function to show value of function fn1
	int i, sum;
	double S[100] = {0};
	//Declare variant
	printf("\n*--i--*----fi----*----sum----*\n");
	printf("******************************\n");
	fn1(T,S,n); // send variant to calculate in fn1
	for(i=1;i<=n;i++){ // give i =1 if i <= value of n then i+1 per round
	printf("* %2d * %9lf * %9lf *\n", i, T[i], S[i]); 
	//show location of i, value of location i, summation of value at location i
	}
	printf("******************************\n");
	printf("ans = %lf \n",S[i-1]); // show summation at last location
}

int fn2(int T[], int n){ // function to calculate fibonacci that ans is an even number
	int fi;
	int count = 1;
	int i = 1;
	// Declare variant
	while(count <= n){ // loop at value of count <= value of n
		fi = fibo(i); // gibe fi = value of fibonacci(location i)
		T[i] = fi; // give T(location i) = fi
		count++; //then count+1
		i++; // then i+1
	}
	return 0;
}

void arr2(int T[], int n){ // function to show value of function fn2
 	int count=1,i, ans; //Decalre variant
 	printf("\n* count *   i   *   fi   *\n");
	printf("**************************\n");
 	fn2(T,n*3); // send variant to calculate in fn2
 	for(i=1;count<=n;i++){ //loop that i=1 if count <= n then i+1 per round
 		if(T[i] % 2 == 0){ //if value of T(location i) is divisible of 2
 			ans = T[i]; //then give ans = T(location i)
 			printf("* %3d * %4d * %7d *\n", count, i, T[i]);
 			//show number of count, i, ans
 			count++;
 		}
	}
	printf("**************************\n");
	printf("count = %2d, ans = %d ", n, ans );	//show number of count and value of ans
 }

int fn3(int min, int max,int T[]){ // function to find prime number between min and max
	int count=1,i; //declare variant
	while(count < 10){ // loop at value of count <= 10 to find only 10 number
		for(i = min; i <= max; i++){ // loop at i=min and i<=max then i+1 per round
			if(( i == 2 || i == 3 || i == 5 || i == 7 )||( i%2 != 0 && i%3 != 0 && i%5 != 0 && i%7 != 0 ) && i!= 1){
				//condition to find prime number
				T[count] = i; //give T(location at count) = value of i
				count ++; // then count+1
			}		
		}
	}	
	return count; //return number of count
}

void arr3(int min, int max,int T[]){ // function to show value of function fn3
	int count =1, i, sum=0; //declare variant
	printf("* no *  i  *  sum  *\n");
	printf("********************\n");
	count = fn3(min,max, T); // send variant to find value of count in fn3
	for(i = 1; i < count; i++){ // loop that i=1 if i < value of count then i+1 per round
		sum = sum + T[i]; // give sum = sum + T(location i) to find summation
		printf("* %2d * %4d * %6d *\n", i, T[i], sum);
		//show i, value of T at location i, summation
	}
	printf("**********************\n");
	printf("count = %d, sum = %d", count-1,sum); // show number of count that calculate and summation
}

int fn4(int n, int T[]){ //function to calculate series
	int i = 1, sum = 0; //declare variant
	while(sum < n){ // loop at sum < n
		T[i] = (1 +((i-1)*2)) * (40 -(2*(i-1))); // calculate series
		sum = sum + T[i]; // find summation of series
		i++; //then i+1
	}
		return i; //return value of i
}

void arr4(int T[],int n){ // function that show value of fn4
	int count, i,S[100], sum=0; //declare variant
	printf("* no *  i  *  sum  *\n");
	printf("********************\n");
	count = fn4(n,T); //send variant to find value of count in fn4
	for(i=1;i<=count;i++){ // loop that give i=1 if i<= value of count then i+1 per round
		sum +=  T[i]; //find summation of value T at location i
		S[i] = sum; // give S(location i) = sum at location i
		if(sum < n){ //loop at sum < n
		printf("* %2d * %4d * %5d *\n", i, T[i], S[i]);
		//show location i, Term of i, Sum at location i
		}
	}
	printf("*********************\n");
	printf("count = %d, ans = %d\n", i-3, S[i-3]);	
	// show number of count, sum at location i
	// i do not sure why at this show program show value at i+3
}

int fn5(int T[],int n){ // function to find same number of two series
	int i, j, a, b, count = 1; //declare variant
	for(i = 0; i < n; i++){ // loop that give i=0 if i<n then i+1 per round
		a = 1 + ( i * 3 ); // series of a
		for(j = 0; j < n ; j++){ // loop that give j=0 if j<n then j+1 per round
			b = 1 + ( j * 5 ); // series of b
			if(a == b){ //if value of a = value of b
				T[count] = a; //give T at location of count = value of a
				j = n; //then give j=n
				count ++; //then count+1
			}
		}
	}
	return count; //return number of count
}

void arr5(int T[], int n){ // function to show value of function fn5
	int count,i; //declare variant
	printf("\n* no * term *\n");
	printf("*************\n");
	count = fn5(T, n); // send variant to find value of count in fn5
	for(i=1;i<count;i++){ //loop at i < count
		printf("* %2d * %4d *\n", i, T[i]);
		//show i and value of T at location i
	}
	printf("*************\n");
	printf("count = %d \n",i-1); // show number of count
}

int main(){
	int select; //declare variant
	do{
		select = getmenu(); // send to funtion getmenu to choose function
		if(select == 1){ //if choose function 1
			int numfn1,i;
			double S[200] = {0}, T[200] = {0};
			//declare variant
			printf("\nEnter number: "); //make user input number to calculate
			numfn1 = getnum(); //send input to check if input error
			arr1(T, numfn1); //send input to arr1
		}else if(select == 2){ // if choose function 2
			int numfn2, T[100] ={0};//declare variant
			printf("\nEnter number: "); //make user input number to calculate
			numfn2 = getnum(); //send input to check if input error
			arr2(T, numfn2); // send input to arr2
		}else if(select == 3){ // if choose function 3
			int min, max, count,T[100]; //declare variant
			printf("\nEnter minimum number: "); //make user input minimum number of prime number that want to find
			min = getnum(); //send min to check if min error
			printf("\nEnter maximum number: "); //make user input maximum number of prime number that want to find
			max = getnum();//send max to check if max error
			arr3(min, max, T); // send min and max to arr3
		}else if(select == 4){	//if choose function 4
			int max, T[100]; //declare variant
			printf("\nEnter maximum number: ");//make user input maximum number of series that want to find
			max = getnum();//send max to check if max error
			arr4(T, max);// send max to arr4
		}else if(select == 5){ // if choose function 5
			int T[100];//declare variant
			arr5(T,100); //go to arr5
		}
	}
	while(select != 0);// loop at select is not 0
	return 0; // end program
}
