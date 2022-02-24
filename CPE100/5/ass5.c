#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <time.h>

int getint(int min,int max);
int getnum();
int fibo(int a);
int fac(int f);
int nCr(int n,int r);
int GCD(int c,int d);
int yesno();
int get_menu();

int getint(int min,int max){
	int number;
	char enter;
	while((scanf("%d%c",&number,&enter)) != 2 || enter != '\n' || number < min || number > max){
		rewind(stdin);
		printf("Invalid Value --> \n");
	}
	return number;
}

int getnum(){
	int num;
	char enter;
	while((scanf("%d%c",&num,&enter)) != 2 || enter != '\n' ){
		rewind(stdin);
		printf("Invalid Value --> \n");
	}
	return num;	
}

int fibo(int a){
	int ans;
	if(a<=1){
		ans = a;
	}else{
		ans = fibo(a-1) + fibo(a-2);	
	}
	return ans;
}

int fac(int f){
	int ans, i;
	ans = f;
	for(i = f,ans = 1;i>1;i--){
		ans = ans*i;
	}
	return ans;
}

int nCr(int n,int r){
	int ans;
	ans = fac(n)/(fac(r)*fac(n-r));
	return ans;
}

int GCD(int c,int d){
	int ans;
	if(c==0){
		ans = d;
	}
	else if(d==0){
		ans = c;
	}
	else if(c==d){
		ans = c;
	}
	else if(c>d){
		ans = GCD(c-d, d);
	}else{
		ans = GCD(c, d-c);
	}
	return ans;
}

int yesno(){
	char ch;
		printf("\nDo you want to calculate again?(y/n)");
		printf("\nIf yo say no, you will go back to menu:");
		scanf("%c",&ch);
	while(ch!= 'y' && ch!= 'Y' && ch!= 'n' && ch!= 'N'){
		rewind(stdin);
		printf("\nDo you want to calculate again?(y/n)");
		printf("\nIf yo say no, you will go back to menu:");
		scanf("%c",&ch);
	}
	return ch;
}

int get_menu(){
	int select;
	printf("\n--------------------MENU--------------------\n\n");
	printf("	1 - Fibonacci Function					\n");
	printf("	2 - Combination Number(nCr)				\n");
	printf("	3 - GCD									\n");
	printf("	4 - Quadatic Equation					\n");
	printf("	0 - Exit								\n");
	printf("--------------------------------------------\n");
	printf("\n___Enter Menu Number You want: ");
	select = getint(0,4);
	return select;
}

int main(){
	int select,ans1,ans2,ans3,ans4;
	char yn;
	do{	
		system("cls");
		select = get_menu();
		if(select == 1){
			do{
			system("cls");
			printf("\nCalculate Fibonacci Number.\n");
			int a;
			printf("Enter Fibinacci Term f(n) = (0-45) ");
			a = getint(0,45);
			ans1 = fibo(a);
			printf("\nFibonacci Number of f(%d) is %d.\n",a,ans1);
			yn = yesno();
			}while(yn == 'y' || yn == 'Y');
		}
		else if(select == 2){
			do{
			system("cls");
			printf("\nCalculate Combination Number\n");
			printf("Enter n: ");
			int n = getnum();
			printf("\nEnter r: ");
			int r = getint(0,n);
			ans2 = nCr(n,r);
			printf("\nResult is %d.\n",ans2);
			yn = yesno();
			}while(yn == 'y' || yn == 'Y');
		}
		else if(select == 3){
			do{
			system("cls");
			printf("\nCalculate GCD\n");
			printf("\nEnter First Number: ");
			int c = getnum();
			printf("\nEnter Second Number: ");
			int d = getnum();
			ans3 = GCD(c,d);
			printf("\nResult is %d.\n",ans3);
			yn = yesno();
			}while(yn == 'y' || yn == 'Y');
		}
		else if(select == 4){
			do{
			system("cls");
			printf("\nCalculate Quadatic Equation\n");
			double a, b, c, d, x, x1, x2, Re, Im;
    	    a = b = c = 0;
    	    printf("\nProgram calculate root of Equation ax^2+bx+c = 0\n");
        	printf("Enter parameter a : ");
        	scanf("%lf",&a);
        	printf("Enter parameter b : ");
        	scanf("%lf",&b);
        	printf("Enter parameter c : ");
        	scanf("%lf",&c);
    	    if(a==0)
        	{
           	if(b==0)
			{
                printf("Error! invalid equation\n");

            }else if(b!=0)
            {
                x = (-c/b);
            printf("This is linear equation\n");
            printf("Answer of %gx%+g=0 is\n",b,c);
            printf("x = %g\n",x);
            }
			}else if((b*b-4*a*c)>=0)
            {
                x1 = (-b+sqrt(b*b-4*a*c))/(2*a);
            x2 = (-b-sqrt(b*b-4*a*c))/(2*a);
            printf("root of %gx^2 %+gx %g = 0 is\n",a,b,c);
            printf("x1 = %+g\nx2 = %+g\n",x1,x2);
        	}else{
            Re = -b/(2*a);
        	Im = (sqrt(fabs(b*b-4*a*c)))/(2*a);
        	printf("root of %gx^2 %+gx %+g = 0 is complex number\n",a,b,c);
        	printf("x1 = %g + %gi\n",Re,Im);
        	printf("x2 = %g - %gi\n",Re,Im);
        	printf("i is square root of -1\n");
    		}
    		yn = yesno();
    	}while(yn == 'y' || yn == 'Y');
		}
	
	}while(select != 0);
	system("cls");	
	printf("\nEnd Program\n");
	return 0;
}
