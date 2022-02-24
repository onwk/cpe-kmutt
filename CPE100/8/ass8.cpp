#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int getmenu();
int getint(int min,int max);
int getint();

int getmenu(){
	int select;
	printf("\n\n ---Array Statistic--- \n");
	printf("\n [1] -- Add Data \n");
	printf("\n [2] -- Delete Data \n");
	printf("\n [3] -- Statistic \n");
	printf("\n");
	printf("\n [0] -- Exit the Program \n");
	printf("\n");
	printf("Select: ");
	
	return getint(0,3);
}

int getint(int min,int max){
	int number;
	char enter;
	while((scanf("%d%c",&number,&enter)) != 2 || enter != '\n' || number < min || number > max){
		rewind(stdin);
		printf("Please number between %d - %d: ", min, max);
	}
	return number;
}

int getint(){
	int num;
	char enter;
	while((scanf("%d%c",&num,&enter)) != 2 || enter != '\n' ){
		rewind(stdin);
		printf("Invalid Value --> ");
	}
	return num;	
}

double getdouble(double min, double max, double data[], int *count){
	int end = 0;
	double x;
	char ch;
	while(*count < 20 && end == 0 && scanf("%lf%c",&x,&ch)==2){
		if(x < min || x > max){
			return 0;
		}
		data[*count] = x;
		*count = *count +1;
		if(ch== '\n'){
		end = 1;
		}
	}
	rewind(stdin);
	return 0;
}

int yn(){
	rewind(stdin);
	char ch = getchar();
	while(ch != 'n' && ch != 'y' && ch != 'N' && ch != 'Y' ){
		printf("Please enter again [Y/N]: ");
		ch = getchar();
	}
	if(ch =='Y'|| ch =='y'){
		return 1;
	}else{
		return 0;
	}
}

void Show(double *data, int *count){
	int i;
	if(*count > 0){
		for(i = 0; i <= (*count-1); i++){
			printf("\n   data[%2d]: %5g \n",i,data[i]);
		}
		printf("\n   Count : %d\n",*count);
	}else{
		printf("\n Have no data. \n");
	}
}

void add(double *data, int *count){
	int i;
	printf("\n\n ---Add Data--- \n");
	if(*count < 20){
		printf("\nEnter data: ");
		double x[20];
		int xCount = 0;
		getdouble(0, 100, x, &xCount);
		for(i = 0; i < xCount; i++){
			data[*count] = x[i];
			*count = *count +1;
		}
		printf("\n Data... \n");
		Show(data,count);
	}else if(*count == 20){
		printf("\nArray is full\n");
	}else{
		printf("\nArray is full\n");
	}
}

void remove(double *data, int *count){
	int i, j, k, removeCount = 0, allRemove = 0 , deleted = 0, removeit = 1;
	printf("\n\n ---Delete Data--- \n");
	if(*count > 0){
		printf("\nEnter data: ");
		double x[20];
		int xCount = 0;
		getdouble(0, 100, x, &xCount);
		printf("\n Data that you want to delete is\n");
		for(j = 0; j < xCount; j++){
			for(i = 0; i< *count; i++){
				if(data[i] == x[j]){
					printf("\n data[%d]: %5g \n",i,data[i]);
					removeCount += 1;
					i = *count;
				}
			}
		}
		printf("\n Count; %d \n",removeCount);
		printf("\nConfirm delete[Y/N]: ");
		if(yn() == 1){
			for(j=0;j < xCount; j++){
				for(i=0; i < *count; i++){
					if(data[i] == x[j]){
						if(deleted >= 1){
							printf("\n%5g at data[%d] want to delete it too?[Y/N]: ",x[j], i + allRemove);
							if(yn() == 0){
								i = *count;
								removeit = 0;
							} 
						}
						if( removeit == 1){
							for(k=i;k<(*count-1);k++){
								data[k] = data[k+1];
							}
							deleted += 1;
							allRemove += 1;
							*count = *count -1;
							i = -1;
						}
					}
				}
			}
		}
		printf("\n Data... \n");
		Show(data,count);
	}else{
		printf("\n Have no data. \n");
	}
}

void Stat(double *data, int *count){
	int i = 0;
	double min = data[0], max = data[0], mean, sd, sum = 0, sum2 = 0;
	printf("\n\n ---Calculate Statistic--- \n");
	if(*count > 1){
		for(i=0; i< *count; i++){
			sum += data[i];
			sum2 += pow(data[i],2);
			if(data[i] < min){
				min = data[i];
			}
			if(data[i] > max){
				max = data[i];
			}
		}
		mean = sum / *count;
		sd = sqrt((sum2 / *count) - pow(mean,2) );
		printf(" min : %5g \n", min);
		printf(" max : %5g \n", max);
		printf(" mean: %5g \n", mean);
		printf(" sd  : %5g \n", sd);
	}else if(*count > 0 && *count < 2){
		printf("\nMust have at least 2 data.\n");
	}else{
		printf("\n Have no data. \n");
	}
}

int main(){
	int select, count=0;
	double data[20];
	do{
		system("cls");
		select = getmenu();
		if(select ==1){
			system("cls");
			add(data,&count);
		}else if(select == 2){
			system("cls");
			remove(data,&count);
		}else if(select == 3){
			system("cls");
			Stat(data,&count);
		}
		if(select != 0){
			char enter;
			rewind(stdin);
			do{
				printf("\n Press [Enter] to back to menu.");
				enter = getchar();
			}while(enter != '\n');
		}
	}while(select != 0);
	
	return 0;	
}
