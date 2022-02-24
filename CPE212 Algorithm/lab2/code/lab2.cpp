#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int read_txt_file(char *filetxt, int data[], int *count);
void show(int data[], int *count);
void swap(int x, int y);
void InsertSort(int data[], int *n, double *time);
void BubbleSort(int data[], int *n, double *time);
void SelectionSort(int data[], int *n, double *time);

int read_txt_file(char *filetxt, int data[], int *count){ 
	FILE *file;
	int t;
	if((file = fopen(filetxt, "r")) != NULL){ 
		*count = 0;
		while(fscanf(file, "%d", &t) == 1 ){ 
			data[*count] = t;
			*count = *count + 1; 
		}
		fclose(file); 
	}else{ 
		printf("Cannot read file."); 
	}
	return 0;
}

void show(int data[], int *count){ 
	int i;
	for( i =0; i < *count; i++){
		printf("%d\n", data[i]);
	}
}

void swap(int x, int y){
	int temp;
	temp = x;
	x = y;
	y = temp;
}

void InsertSort(int data[], int *n, double *time){

	clock_t start, end;
	double total;
	start = clock(); 
	
	int i, j, v;
	for(i = 1; i < *n -1; i++){
		v = data[i];
		j = i-1;
		while(j >= 0 && data[j] > v){
			data[j+1] = data[j];
			j--;
		}
		data[j+1] = v;	
	}
	end = clock(); 
	total = (double)(end - start) / CLOCKS_PER_SEC;
	*time = total;
	
	printf("\n Total Time : %f s", total);
}

void BubbleSort(int data[], int *n, double *time){

	clock_t start, end;
	double total;
	start = clock(); 
	
	int i, j;
	for(i = 1; i < *n - 2; i++){
		for(j = 0; j < *n - 2 - i ; j++){
			if(data[j+1] < data[j]){
				swap(data[j], data[j+1]);
			}
		}
	}
	end = clock(); 
	total = (double)(end - start) / CLOCKS_PER_SEC;
	*time = total;
	
	printf("\n Total Time : %f s", total);
}

void SelectionSort(int data[], int *n, double *time){

	clock_t start, end;
	double total;
	start = clock(); 
	
	int i, j, min;
	for(i = 0; i < *n - 2; i++){
		min = i;
		for(j = i + 1; j < *n - 1; j++){
			if(data[j] < data[min] && min < j){
				swap(data[j], data[min]);
			}
		}
	}
	end = clock(); 
	total = (double)(end - start) / CLOCKS_PER_SEC;
	*time = total;
	
	printf("\n Total Time : %f s", total);
}

int CompareTime(double *time1, double *time2, double *time3){
	
	if(*time1 < *time2 && *time1 < *time3){ 
		printf("\n\nListA is best case.\n");
		if(*time2 < *time3) printf("\nListC is worst case.\n");
		else if(*time2 > *time3) printf("\nListB is worst case.\n");
		else if(*time2 = *time3) printf("\nListB and ListC use the same time.");
	}else if(*time2 < *time1 && *time2 < *time3){
		printf("\n\nListB is best case.\n");
		if(*time1 < *time3) printf("\nListC is worst case.\n");
		else if(*time1 > *time3) printf("\nListA is worst case.\n");
		else if(*time1 = *time3) printf("\nListA and ListC use the same time.");
	}else if(*time3 < *time1 && *time3 < *time2){
		printf("\n\nListC is best case.\n");
		if(*time1 < *time2) printf("\nListB is worst case.\n");
		else if(*time1 > *time2) printf("\nListA is worst case.\n");
		else if(*time1 = *time2) printf("\nListA and ListB use the same time.");
	}
}

int main(){
	int txtA[100000], txtB[100000], txtC[100000];
	int txtACount = 0, txtBCount = 0, txtCCount = 0;
	double Aistime = 0, Bistime = 0, Cistime = 0, Abstime = 0, Bbstime = 0, Cbstime = 0;
	double Asstime = 0, Bsstime = 0, Csstime = 0;
	
	read_txt_file("ListA.txt", txtA, &txtACount);
	printf("\nListA Count : %d\n", txtACount);
	read_txt_file("ListB.txt", txtB, &txtBCount);
	printf("\nListB Count : %d\n", txtBCount);
	read_txt_file("ListC.txt", txtC, &txtCCount);
	printf("\nListC Count : %d\n", txtCCount);
	
	printf("\n\n*************** Insertion Sort **************\n");
	printf("\n\n ListA \n");
	InsertSort(txtA, &txtACount, &Aistime);
	printf("\n\n ListB \n");
	InsertSort(txtB, &txtBCount, &Bistime);
	printf("\n\n ListC \n");
	InsertSort(txtC, &txtCCount, &Cistime);
	
	CompareTime(&Aistime, &Bistime, &Cistime);
	
	read_txt_file("ListA.txt", txtA, &txtACount);
	read_txt_file("ListB.txt", txtB, &txtBCount);
	read_txt_file("ListC.txt", txtC, &txtCCount);
	
	printf("\n\n\n*************** Bubble Sort **************\n");
	printf("\n\n ListA \n");
	BubbleSort(txtA, &txtACount, &Abstime);
	printf("\n\n ListB \n");
	BubbleSort(txtB, &txtBCount, &Bbstime);
	printf("\n\n ListC \n");
	BubbleSort(txtC, &txtCCount, &Cbstime);
	
	CompareTime(&Abstime, &Bbstime, &Cbstime);
	
	read_txt_file("ListA.txt", txtA, &txtACount);
	read_txt_file("ListB.txt", txtB, &txtBCount);
	read_txt_file("ListC.txt", txtC, &txtCCount);

	printf("\n\n\n*************** Selection Sort **************\n");
	printf("\n\n ListA \n");
	SelectionSort(txtA, &txtACount, &Asstime);
	printf("\n\n ListB \n");
	SelectionSort(txtB, &txtBCount, &Bsstime);
	printf("\n\n ListC \n");
	SelectionSort(txtC, &txtCCount, &Csstime);
	
	CompareTime(&Asstime, &Bsstime, &Csstime);
}
