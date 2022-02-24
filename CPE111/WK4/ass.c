#include <stdio.h> 
#include <string.h> 
#include <stdlib.h>
#include <ctype.h> 
#include <math.h>

typedef struct node{
double data;
struct node *next;
}linkedlist;

//declare first lat ptr and prev to be an pointer for data 
linkedlist *first = NULL, *last = NULL, *ptr = NULL, *prev = NULL;

int isnum(char *s);
int str_seg(char word[][255],char *buff);
void add(double n);
void search_delete (double data);
void push(double n);
void peek(int n);
void list();
double pop();
void sq_rt();
void Pow();
void rec();
void neg();
void plus();
void minus();
void multiply();
void divide();
void help();
void swap_node (linkedlist * a, linkedlist * b);
void sort();
void insert(double data);

int countdata = 0;

int main(){ 
	char str[1000], buff[1000], word[255][255]; //give size of data and buff and word in 2 dimension array
	int i, count = 0, check;
	double x[1000];
	do{
		list(); //show data in list by command list
		rewind(stdin);
		printf("command> "); 
		gets(str); //recieve input by gets and keep in str
		strcpy(buff,str); //copy input and keep in buff

		count = str_seg(word,buff);
		for(i = 0; i < strlen(word[0]); i++){ //loop in length of word
			word[0][i] = tolower(word[0][i]); //change word in to lower char
		}
		
		for(i = 1; i < count; i++){
			x[i] = atof(word[i]);  //change from string to number
		}

		if(strcmp(word[0],"list") == 0 || strcmp(word[0],"end") == 0 || strcmp(word[0],"sort") == 0|| strcmp(word[0],"pop") == 0|| strcmp(word[0],"help") == 0|| strcmp(word[0],"sqrt") == 0|| strcmp(word[0],"rec") == 0 
		|| strcmp(word[0],"neg") == 0 || strcmp(word[0],"+") == 0 || strcmp(word[0],"-") == 0 || strcmp(word[0],"*") == 0 || strcmp(word[0],"/") == 0 || strcmp(word[0],"pow") == 0 )
		{ 	//check if word[0] same as some word above 
			//if there is only one word
			if(count == 1) { 
				if(countdata > 0){ //if in list have data
					if(strcmp(word[0],"list") == 0){
						//if that word is list do nothing
					}else if(strcmp(word[0],"pop") == 0){
						printf("answer> %g\n",pop());
						//if that word is pop then show answer of function pop
					}else if(strcmp(word[0],"sqrt") == 0){
						sq_rt();
						//if that word is sqrt then send to function sq_rt
					}else if(strcmp(word[0],"rec") == 0){
						rec();
						//if that word is rec then send to function rec
					}else if(strcmp(word[0],"neg") == 0){
						neg();
						//if that word is neg then send to function neg
					}
				}else{ //in case there is no data in list
					printf("answer> no data\n");
				}
				
				if(countdata >= 2){ //in case have more than 2 data in list
					//if command is +
					if(strcmp(word[0],"+") == 0){
						plus(); //then use plus function
					}
					//if command is sort
					if(strcmp(word[0],"sort") == 0){
						sort(); //send to function sort
					}
					//if command is -
					if(strcmp(word[0],"-") ==0 ){
						minus(); //send to minus function
					}
					//if command is *
					if(strcmp(word[0],"*") == 0){
						multiply(); //send to multiply function
					}
					//if command is /
					if(strcmp(word[0],"/") == 0){
						divide(); //send to divide function
					}
					//if command is pow
					if(strcmp(word[0],"pow") == 0){
						Pow(); //send to function Pow
					}	
				}else if((countdata == 1) && (strcmp(word[0],"sort") == 0 || strcmp(word[0],"+") == 0 || strcmp(word[0],"-") == 0 || strcmp(word[0],"*") == 0 || strcmp(word[0],"/") == 0 || strcmp(word[0],"pow") == 0 )){
					//in case there is only one data in list but command is same as above
					printf("answer> cannot operation\n");
				}
				//if command is help
				if(strcmp(word[0],"help") == 0 ){
					help(); //send to function help to show list of command
				}
			}else{
				printf("answer> parameter error\n");
			}
		}else if(strcmp(word[0],"delete") == 0 || strcmp(word[0],"peek") == 0 || strcmp(word[0],"push") == 0 ){
			//if commamd is same as above
			if(count == 2){ // if there is 2 word
				if(isnum(word[1]) == 1) { //if first word is number
					if(countdata != 0) { //do this if there is data in list
						if(strcmp(word[0],"delete") == 0){
							search_delete(x[1]); //find data to delete start from first data
						}else if(strcmp(word[0],"peek") == 0){
							peek(x[1]); //see location from first data
						}
						if(strcmp(word[0],"push") == 0){
							push(x[1]); //add data that was input into linkedlist
						}
					}else { //in case there is no data
						if(strcmp(word[0],"push") == 0){
							push(x[1]);
						}else{
							printf("answer> no data\n");
						}
					}
				}else{
					printf("answer> parameter error\n");
				}
			}else{
				printf("answer> syntax error\n");
			}
		}else if(strcmp(word[0],"add") == 0 || strcmp(word[0],"insert") == 0 ){
			//if command is same as above
			if(count > 1){ //in case there more than 1 word
				check = 1; //use to be condition for loop
				for(i = 1; i < count; i++){
					if(isnum(word[i]) == 0){ //check if there is number after command
						check = 0;
					}
				}
				
				if(check == 1){ //in case there is number after command
					if(strcmp(word[0],"add") == 0){ // if command is add
						for(i = 1; i < count; i++) { //loop for every number that add
							add(x[i]); //then add every number
						}
					}	
					if(strcmp(word[0],"insert") == 0){//if command is insert
						for(i = 1; i < count; i++){//loop for every number
							insert(x[i]); //insert every number
						}
					}
				}else{
					printf("answer> parameter error\n");
				}
			}else{
				printf("answer> syntax error\n");
			}
		}else{
			printf("answer> syntax error\n");
		}
	}while( (strcmp(str,"end") != 0 && strcmp(str,"exit") != 0 )||(strcmp(str,"end") == 0 && strcmp(str, "exit") == 0)); 
	//do until command is end or exit
	printf("\nEND PROGRAM\n");
	printf("Program writen by 62070501064 Onwipa Kujaroenpaisan\n");
	return 0 ;
}

int str_seg(char word[][255],char *buff){
	char *token;
	int count = 0;
	token = strtok(buff," "); //use strtok to cut the word by space
	while (token != NULL) { //in case token is not empty
		strcpy(word[count++],token);  //copy token and keep in word and count it
		token = strtok(NULL," ");
	}
	return count;
}

int isnum(char *s){
	int i, dotcount = 0; 
	for (i = 0; i < strlen(s); i++){ //loop by length of s one by one
		if(isdigit(s[i]) == 0 && s[i] != '.' && s[0] != '-')
		//if there are number with other sign that is not . and - then return 0
			return 0;
		else if(s[i] == '.'){ //if there is dot
			dotcount ++; //count number of dot
			if(dotcount > 1) { //in case it is more than one dot
				return 0; 
			}
		}
	}
	return 1; 
}

void add(double x){
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	ptr->data = x; 
	ptr->next = NULL;

	if(first == NULL){ // in case have no data
		first = last = ptr; 
	}else{
		last->next = ptr;
		last = ptr;
	}
	countdata++; //add up number of data
}

void search_delete(double data){
	char ch;
	int found = 0;
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	prev = (linkedlist*)malloc(sizeof(linkedlist));

	ptr = first; //give ptr point at first data
	if(ptr->data == data) { //if found data that wanted
		found = 1;
		printf("answer> %g found. Enter y to confirm ",data);
		scanf(" %c",&ch);
		if(ch =='y' || ch == 'Y'){
			first = first->next;
			ptr = first;
			//delete first data that found
			countdata--;
		}else{
		ptr = ptr->next;
		}
	}

	while(ptr != NULL){
		while ((ptr != NULL) && (ptr->data != data)) { //loop to find wanted data
			prev = ptr;
			ptr = ptr->next;
		}

		if(ptr != NULL) { // in case found that data
			found = 1;
			printf("answer> %g found. Enter y to confirm ",data);
			scanf(" %ch",&ch);
			if(ch =='y' || ch =='Y'){
				if(ptr==last) //ptr point to last data
					last = prev; //give last be data before last

				prev->next = ptr->next; 
				countdata--; //decrease number of data
				ptr = prev->next;
			}else{
				ptr = ptr->next; //next data
			}

		}else if(found != 1) { //in case it is no found
			printf("answer> %g not found\n",data);
		}
	}
}

void list(){ //function to show list of data
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	ptr = first; 
	if(first != NULL) { // check if there is data in list
		printf("list>");
		while(ptr != NULL) { //loop until ptr point to null
			printf(" %g",ptr->data);
			ptr = ptr->next; //move to next ptr
		}
		printf("\n");
	}else{ //in case there is no data
		printf("list> NULL\n");
	}
}

double pop() { // function to delete first data
	double temp = 0;
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	ptr = first; 
	if(first != NULL) { // check if there is data in list
		first = first->next; //first point to data next to first 
		temp = ptr->data; //keep ptr in temp
	}else{ //in case there is no data
		printf("answer> no data\n");
	}
	countdata--;
	free(ptr); 
	return temp; 
}

void push(double n) { //function to add data into first
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	ptr->data = n; //give ptr be input (n)
	ptr->next = first; //give the input be before first
	first = ptr; //first point to ptr
	if(countdata == 0) { //in case have no data
		last = first; 
	}
	countdata++;
}

void peek(int n){  //command to see data in location n
	int i = 0;
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	ptr = first;
	if(first != NULL) { // check if there is data in list
		if(n == -1) { // show the last data
			printf("answer> %g", last->data);
		}else{
			while(ptr != NULL && n != i) { //while have data and input not equal to i
				i++;
				ptr = ptr->next; //move to next ptr
			}
			if(i < countdata) { //in case i less than number of data
				printf("answer> %g",ptr->data); //show data that ptr point to
			}else{
				printf("answer> maximum peek = %d",countdata-1);
			}
		}
		printf("\n");
	}else if(ptr == NULL){
		printf("NULL\n");
	}
}

void sq_rt(){
	double ans;
	ans = sqrt(pop()); //calculate the first data
	push(ans); //and put ans in first of list
}

void rec(){
	double ans;
	ans = 1/(pop()); //calculate the first data
	push(ans); //and put ans in first of list
	printf("answer> %g\n", ans);
}

void neg(){
	double ans;
	ans = -1*(pop()); //calculate the first data
	push(ans); //and put ans in first of list
	printf("answer> %g\n", ans);
}

void Pow(){
	double x,y;
	x = (pop()); //give the first data in name of x
	y = (pop()); //give the data next to x in name of y
	push(pow(y,x)); //and put answer in first of list
	printf("answer> %g\n", pow(y,x));
}

void plus(){
	double x,y;
	x = (pop()); //give the first data in name of x
	y = (pop()); //give the data next to x in name of y
	push(y + x); //and put answer in first of list
	printf("answer> %g\n", y + x);
}

void minus(){
	double x,y;
	x = (pop()); //give the first data in name of x
	y = (pop()); //give the data next to x in name of y
	push(y - x); //and put answer in first of list
	printf("answer> %g\n", y - x);
}

void divide(){
	double x,y;
	x = (pop()); //give the first data in name of x
	y = (pop()); //give the data next to x in name of y
	push(y / x); //and put answer in first of list
	printf("answer> %g\n", y / x);
}

void multiply(){
	double x,y;
	x = (pop()); //give the first data in name of x
	y = (pop()); //give the data next to x in name of y
	push(x * y);//and put answer in first of list
	printf("answer> %g\n", x * y);
}

void help() { //function to show list of all command
	printf("answer> list of command\n");
	printf(" Add\n");
	printf(" Insert\n");
	printf(" Push\n");
	printf(" Peek\n");
	printf(" Delete\n");
	printf(" Search\n");
	printf(" [sqrt] [rec] [neg] [pow] [+] [-] [*] [/]\n");
	printf(" List\n");
	printf(" Sort\n");
	printf(" Pop\n");
	printf(" Help\n");
	printf(" End\n");	
}

void swap_node (linkedlist * a, linkedlist * b) {
	double tmp = a->data;
	a->data = b->data;
	b->data = tmp;
}

void sort() { //sort data from min to max
	linkedlist * i = first;
	while (i != NULL){ //check if have data
		linkedlist * j = i->next;
		while (j != NULL) { //check if have data in location j
			if (i->data > j->data) //if data[i] is more than data[j]
				swap_node(i, j); //then swao
			j = j->next; //check in next data
		}
		i = i->next; //check in next data
	}
}

void insert(double data) { //put data in sorted list
	linkedlist *x;
	x = (linkedlist*)malloc(sizeof(linkedlist));
	ptr = (linkedlist*)malloc(sizeof(linkedlist));
	prev = (linkedlist*)malloc(sizeof(linkedlist));
	x->data = data;
	ptr = first;
	if(first == NULL){ // in case have no data
		push(data); //then push it
	}else if(first != NULL){
		
		//check if data is sorted
		while(ptr != last && (ptr->data) <= ((ptr->next)->data) ) {
			ptr = ptr->next;
		}
		
		if (ptr == last){ //check if it is all sorted
			if(data >= last->data) { //in case data is more than last data
				add(data); //then add it
			}else if(data <= first->data) { //in case data is less than first data
				push(data); //then push it
			}else{
				ptr = first;
				while(ptr != last && (ptr->data)<data) { //loop while node is less than data
					prev = ptr; //remember node before ptr move to next node
					ptr = ptr->next; //ptr move to next node
				} //after found node to insert
				prev->next = x; //insert x
				x->next = ptr; //give next node from x be ptr
				countdata++;
			}
		}else{
			printf("answer> please sort data before\n");
		}
	}
}
