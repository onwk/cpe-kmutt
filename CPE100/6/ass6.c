#include <stdio.h>
#include <math.h>
#include <stdlib.h>

double diff(double x, double a, double b, double c);
double Newton_Raphson(double Xp,double a, double b, double c,double err, double *Xn);
double get_double();
double getdoub(double min, double max);
void Calculate();

double diff(double x, double a, double b, double c){
	double ans;
	ans = (a*x*x + b*x + c)/(2*a*x + b);
	return ans;
}

double Newton_Raphson(double Xp, double a, double b, double c,double err, double *Xn){
	double delta;
	int limit = 1000, count = 0, addCount = 0;
	do{
		while(2*a*Xp + b == 0 && addCount <= limit){
		Xp +=  0.0000001;
		addCount++;
		}
		delta = diff(Xp, a, b, c);
		*Xn = Xp - delta;
		Xp = *Xn;
		count++;
	}while(fabs(delta) > err && count <= limit && addCount <= limit);
	if(count <= limit && addCount <= limit){
	return count;
	}else{
		return 0;
	}
}

double get_double(){
    char input;
    double num;
    rewind(stdin);
    scanf("%lf%c",&num,&input);
    while(input != '\n'){
    	rewind(stdin);
    	printf("\nInvalid Value-->");
    	scanf("%lf%c",&num,&input);
	}
	return num;
}

double getdoub(double min, double max){
	double result = get_double();
	while (result < min || result > max)
	{
		printf(" Please number between %lf - %lf: ", min, max);
		result = get_double();
	}
	return result;
}

void Calculate(){
	double x1 = 0, x2 = 0;
	double a, b, c; 
	int count1, count2;
	printf("----------------------------------------");
	printf("\nCalculate (ax^2 + bx + c)/(2ax + b)\n");
	printf("----------------------------------------");
	printf("\nEnter a: ");
	a = get_double();
	printf("\nEnter b: ");
	b = get_double();
	printf("\nEnter c: ");
	c = get_double();
	count1 = Newton_Raphson(100.123, a, b, c, 0.00001, &x1);
	count2 = Newton_Raphson(-100.123, a, b, c, 0.00001, &x2);
	//printf("%lf%lf",x1,x2);
	printf("\n----------------------------------------\n");
	if(count1 == 0 && count2 == 0){
		printf("\nError, cannot find answer.\n");
	}else if (fabs(x1 - x2) < 0.001) {
		printf("\nYour anwser is %.2lf\n", x1);
	}else{
		printf("\nAnswer is %.2lf, %.2lf\n", x1, x2);
	}
	printf("\n>>Count = %d <<",count1);
}

int main(){
	char ch;
	do{
	system("cls");
	Calculate();
	printf("\n\n\nDo you want to calculate again ? (y/n) ");
        ch = getchar();
        while(ch != 'y' && ch != 'Y' && ch != 'N' && ch != 'n')
        {
            rewind(stdin);
            printf("Please enter only y or n : ");
            ch = getchar();
        }
	}while(ch == 'y' || ch == 'Y');
	return 0;
}
