#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int read_txt_file(char *filetxt, int data[], int *count);
void read_bin_file(char *filebin, int data[], int *count);
void show(int data[], int *count);
int comparator(const void *a, const void *b);
void case1(int data1[], int data2[],int result[], int *count1, int *count2, int *resultCount, double *time);
void case2(int data1[], int data2[], int result[], int *count1, int *count2, int *resultCount, double *time);


int read_txt_file(char *filetxt, int data[], int *count){ // function that use to read text file
	FILE *file;
	int t;
	if((file = fopen(filetxt, "r")) != NULL){  //if program can read file
		*count = 0;
		while(fscanf(file, "%d", &t) == 1 ){ // loop while to read every data in file
			data[*count] = t;
			*count = *count + 1; // to count number of data
		}
		fclose(file); // order to close file
	}else{ // if file is caonnot be read
		printf("Cannot read file."); //warn that cannot read 
	}
	return 0;
}

void read_bin_file(char *filebin, int data[], int *count){ // function to read binary file
	FILE *file;
	int b;
	if((file = fopen(filebin, "rb")) != NULL){ //if program can read file
		*count = 0;
		while (!feof(file)){
			if(fread(&b, sizeof(int), 1, file) == 1){ //loop to read data
				data[*count] = b;
				*count = *count +1; //then count the number of data
			}
		}
		fclose(file); //order to close file
	}else{ // if file is cannot be read
		printf("Cannot read file.");
	}
	
}

void show(int data[], int *count){ // function to show data
	int i;
	for( i =0; i < *count; i++){
		printf("%d\n", data[i]);
	}
}

int comparator(const void *a, const void *b){ //function to compare number
	return (*(int*)a - *(int*)b);
}

void case1(int data1[], int data2[],int result[], int *count1, int *count2, int *resultCount, double *time){
	//function to compare every data but not in order
	printf("\n\n*************** Case 1 **************\n");
	
	clock_t start, end;
	double total;
	start = clock(); //function to start the time count like stopwatch
	
	int i, j;
	for(i=0; i < *count1; i++){
		for(j=0; j < *count2; j++){
			if(data1[i] == data2[j]){ //compare if i in data1 = j in data2
				printf(" Found : %d \n",data1[i]); //then show that data
				result[*resultCount] = data1[i]; //make that data be result
				*resultCount = *resultCount + 1; //and count the number of result
			}
		}
	}
	end = clock(); //function to end stopwatch
	total = (double)(end - start) / CLOCKS_PER_SEC; //to check how long of time that comparation used
	*time = total;
	
	printf("\n Total Time : %f s", total); //show the time
	printf("\n Result Count : %d\n\n", *resultCount); //show number of result
	show(result,resultCount);
	
}

void case2(int data1[], int data2[], int result[], int *count1, int *count2, int *resultCount, double *time){
	//function to compare like case1 but use soluton that quicker
	printf("\n\n*************** Case 2 **************\n");
	
	clock_t start, end;
	double total;
	start = clock(); //start the stopwatch
	
	int i, j;
	qsort(data2, *count2, sizeof(int), comparator); //use quick sort to order data in data2
	for(i=0; i < *count1; i++){
		if((int*)bsearch(&data1[i], data2, *count2, sizeof(int), comparator) != NULL){ 
		//search data from data1 in data2 by binary sort
			printf(" Found : %d \n",data1[i]); //if found, then show data
			result[*resultCount] = data1[i];
			*resultCount = *resultCount + 1;//count the number of result
		}
	}
	end = clock();
	total = (double)(end - start) / CLOCKS_PER_SEC; //check how long that used
	*time = total;
	
	printf("\n Total Time : %f s", total); // show the time
	printf("\n Result Count : %d\n\n", *resultCount); //show number of result
	show(result,resultCount);

}

void case3(int data1[], int data2[], int result[], int *count1, int *count2, int *resultCount, double *time){
	//function to compare number from txt file and binary file like case 1 and 2
	printf("\n\n*************** Case 3 **************\n");
	
	clock_t start, end;
	double total;
	start = clock(); // start the stopwatch
	
	int i,j;
	qsort(data1, *count1, sizeof(int), comparator); //order data in data1
	qsort(data2, *count2, sizeof(int), comparator); // order data in data2
	for(i=0,j=0; i < *count1;){ // compare data from data1 and data2
		if(data1[i] < data2[j]){ //
			i++;
		}else if(data1[i] > data2[j]){
			j++;
		}else{ //if data is equal then
			printf(" Found : %d \n",data1[i]); //show data
			result[*resultCount] = data1[i];
			*resultCount = *resultCount + 1; //vount the number of data
			i++;
			j++;
		}
	}
	end = clock(); // end the stopwatch
	total = (double)(end - start) / CLOCKS_PER_SEC; //check how long that used
	*time = total;
	
	printf("\n Total Time : %f s", total); //show the time
	printf("\n Result Count : %d\n\n", *resultCount); //show the number of result
	show(result,resultCount);
	
}

int main(){
	int txt[100000], bin[100000], result[100000];
	int txtCount = 0, binCount = 0, resultCount = 0;
	double time1 = 0, time2 = 0, time3 = 0;
	//declare the variant
	
	read_txt_file("txt100000.txt", txt, &txtCount); //use function raed txt file
	printf("\nTxt Count : %d\n", txtCount);//show number of data in txt file
	read_bin_file("bin100000.bin", bin, &binCount); //use function to read binary file
	printf("Binary Count : %d \n", binCount); //show number of data in binary file
	
	case1(txt, bin, result, &txtCount, &binCount, &resultCount, &time1); //compare data in case1
	
	resultCount = 0;
	read_txt_file("txt100000.txt", txt, &txtCount);
	printf("\nTxt Count : %d\n", txtCount);
	read_bin_file("bin100000.bin", bin, &binCount);
	printf("Binary Count : %d \n", binCount);
	
	case2(txt, bin, result, &txtCount, &binCount, &resultCount, &time2); //compare data in case2
	
	resultCount = 0;
	read_txt_file("txt100000.txt", txt, &txtCount);
	printf("\nTxt Count : %d\n", txtCount);
	read_bin_file("bin100000.bin", bin, &binCount);
	printf("Binary Count : %d \n", binCount);
	
	case3(txt, bin, result, &txtCount, &binCount, &resultCount, &time3);//compare data in case3
	
	printf("\n\n\n*************** RESULT ***************\n");
	printf("TIME || Case 1 : %f s, Case 2 : %f s, Case 3 : %f s\n", time1, time2, time3); //show the time of case 1,2,3

	//compare to find the fastest case
	if(time1 < time2 && time1 < time3){ 
		printf("Case 1 is the fastest way.\n");
	}else if(time2 < time1 && time2 < time3){
		printf("Case 2 is the fastest way.\n");
	}else if(time3 < time1 && time3 < time2){
		printf("Case 3 is the fastest way.\n");
	}else if(time2 == time3){
		printf("Case 2 == Case 3 .\n");
	}
	
	
	return 0;
}
