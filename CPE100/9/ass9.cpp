#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

int fn(char *s);
int number(char *s);
int numberFormat(char *s);
int ope(char *s);
int identifier(char *s);
void addSpace(char *s);
void spaceSep(char *s, char data[][50]);
void toLower(char *s);
void deletespaceAtcorner(char *s);
//declare the function

int fn(char *s){ //function to check if input be the function
	char func[10][10] = {"sin","cos","tan","asin","acos","atan","sqrt","log","exp","pow"};
	int i;
	//declare tha variant and name of function
	for(i=0;i<20;i++){ //loop that give i = 0 if i<20 then i+1
		if(strcmp(s, func[i])==0){ //compare string if it is same with declared function
			return 1; // if it is same then return 1
		}
	}
	return 0;
}

int number(char *s){ //function to check if input be number
	double num;
	int i;
	//declare the variant
	for( i=0; i<strlen(s); i++){ //loop that give i=0 if i < length of string then i+1
		if(isdigit(s[i]) == 0 && s[i] != '.'){ // check that if string is not number or .
			return 0; //then return 0
		}
	}
	return numberFormat(s); 
//return result to fuction numberFormat to check sort of number if that correct in format of number
}

int numberFormat(char *s){ //function to check format of number
	int dot = 0, i=0; //declare the variant
	for(i=0; i< strlen(s); i++){ //loop thate give i=0 if i < length of string then i+1
		if(s[i]== '.'){ //check if string at location i be '.'
			dot++; //then dot +1
		}
	}
	if(dot<2){ //check if has '.' < 2
		return 1; // then return 1
	}else{ //if '.' >= 2
		return 0; // then return 0 (wrong format)
	}
}

int ope(char *s){ //function to check string if it is operator
	int i; //declare the variant
	for(i=0; i<strlen(s); i++){ // loop that give i=0 if i< length of string then i+1
		if(strchr(",+-*/^()",s[i])!= NULL){
			//check that if string at location i is same with one of operator
			return 1; // then return 1 
		}
	}
	return 0; // return 0 show that is not operator
}

int identifier(char *s){ //function to check if input is correct in c++ form
	if(!isalpha(s[0]) && s[0] != '_'){ 
	//check if input at location 0 is not character and _ then wrong in c++ form
		return 0; // then return 0
	}else{
		int i; //declare variant
		for(i=1; i<strlen(s); i++){ //loop that give i=1 if i < length of string then i+1
			if(!isalpha(s[i]) && s[i] != '_' && isdigit(s[i]) == 0){
				//check that if other location is not character or _ or number
				return 0; //then return 0
			}
		}
	}
	return 1; //if not be like addition show that string is correct in c++ form then return 1
}

void addSpace(char *s){ //function to add space between operator in every location 
	int i,j;
	char tem[200] = "", old[200] = "";
	//declare the variant
	for( i=0,j=strlen(s);i < j ;i++){ //loop that i=0 and j is length of string and if i<j then i+1
		if(strchr(",+-*/^()",s[i]) != NULL){ //check if there is operator
			sprintf(tem, "%s %c ", old, s[i]); // then add space between operator and save in tem
		}else{ //if it is not
			sprintf(tem, "%s%c", old, s[i]); // then do not add space and save in tem
		}
		strcpy(old, tem); //copy tem and save in old to put in front of next strinf
	}
	strcpy(s, tem); //after all, copy tem to save in original string
}

void spaceSep(char *s, char data[][50]){ //function to seperate string and put in array
	char * word;
	int count = 0;
	//declare the variant
	word = strtok(s, " "); // seperate string between space and save in word
	while(word != NULL){ //loop while word is not space
		strcpy(data[count++],word); //copy word and save in data at location count then count+1
		word = strtok(NULL, " "); //seperate the space and save in word
	}
	data[count][0] = '\0'; //after end the searching then close the array
}

void toLower(char *s){ //function to change string to lower character
	int i; //declare the variant
	for(i=0; s[i]; i++){ //loop to run in every string
		s[i] = tolower(s[i]); //change string to lower character
	}
}

void deletespaceAtcorner(char *s){ //function to delete space in front of and behind input
	char input[100]; //declare the variant
	while(s[strlen(s)-1] == ' '){ //loop while string at last location is space
		input[strlen(s)-1] = '\0'; //then make string end at last character
	}
	while(s[0] == ' '){ // loop while string at first location is space
		strcpy(s, s+1);  // then make that location be the first character not be space
	}
}

int main(){
	char input[100], tem[100];
	int i;
	//declare the variant
	printf("\nEnter input: "); // make user input string
	gets(input); //recieve the input
	deletespaceAtcorner(input); //delete space in front of and behind input
	while(strcmp(input, "exit")!=0 &&strcmp(input, "end")!=0){ 
	//while input is not "exit" and "end" 
		char tem[100], data[100][50];
		int errorCount = 0, fnCount =0, opeCount = 0, idCount = 0, numCount = 0;
		//declare the variant
		printf("**************************************************\n");
		printf("Input: %s\n",input); //show the input
		strcpy(tem, input); //copy input and save in tem
		toLower(tem); // send to function toLower to make input to lower character
		printf("To Lower: %s\n",tem); //show the result of toLower function
		addSpace(tem); //send to function addSpace to space between operator
		printf("Add Space: %s\n",tem); //show the result od addSpace function
		spaceSep(tem,data); //send to function spaceSep to seperate word between space and save data n+in tem
		printf("\n------Analyse------\n"); 
		for(i=0; i< sizeof(data) && strcmp(data[i],"")!=0;i++){
		//loop in size of data if data is not space then analyse in these function
			if(fn(data[i])){ //if string is function
				printf("FUNCTION   : %s\n",data[i]); //show that is function
				fnCount++; //count the function
			}else if(number(data[i])){ //check if it is number
				printf("NUMBER     : %s\n",data[i]); //show that is number
				numCount++; //count the number
			}else if(ope(data[i])){ //check if it is operator
				printf("OPERATOR   : %s\n",data[i]); //show that is operator
				opeCount++; //count the operator
			}else if(identifier(data[i])){ //check if it is identifier
				printf("IDENTIFIER : %s\n",data[i]); //show that is identifier
				idCount++;	//count the identifier
			}else{ //if it is not type of data before
				printf("ERROR	   : %s\n",data[i]); //show that is error
				errorCount++; //count the error
			}
		}
		printf("\n === RESULT ===\n");
		printf("NUMBER 	   : %d\n",numCount); //show the amount of number 
		printf("OPERATOR   : %d\n",opeCount); //show the amount of operator
		printf("FUNCTION   : %d\n",fnCount); // show the amount of function
		printf("IDENTIFIER : %d\n",idCount); //show the amount of identifier
		printf("ERROR 	   : %d\n",errorCount);	//show the amount of error
		printf("TOTAL 	   : %d\n",numCount + opeCount + fnCount + idCount + errorCount);// show the amount of every type
		printf("**************************************************\n");
		printf("\nAnaylyse Again\n");
		printf("\nEnter input: "); // make user input string again
		gets(input); // recieve input
		deletespaceAtcorner(input); //delete space in front of and behind input
	}
	
	printf("\n END PROGRAM\n"); //show that end program
	return 0; //end program
}
