#include<stdio.h>
#include<string.h>
#include<ctype.h>
#include<stdlib.h>
#include<math.h>


typedef struct linkedlist {
	double num;
	struct linkedlist* next;
} linkedlist;


typedef struct stringList {
	struct linkedlist* first, * last;
} raddata;

int cut(char cmd[], char sprCmd[][100]);
int syncheck(char sprCmd[][100]);
int paramcheck(int cmdCount, char sprCmd[][100], int syntaxType, double numberList[]);
int todouble(int cmdCount, char sprCmd[][100], double numberList[]);
void display(linkedlist* first);
void add(linkedlist** first, linkedlist** last, double num);
void push(linkedlist** first, linkedlist** last, double num);
int insert(linkedlist** first, linkedlist** last, double num);
void pop(linkedlist** first, linkedlist** last);
void deletedata(linkedlist** first, linkedlist** last, linkedlist** prev, linkedlist** cur);
int search(linkedlist** first, linkedlist** last, double num);
int op(linkedlist** first, linkedlist** last, int opcode, double* answer);
int ops(linkedlist** first, linkedlist** last, int opcode, double* answer);
double peek(linkedlist** first, linkedlist** last, int idx);
void sort(linkedlist** first, linkedlist** last);
void devide(linkedlist* first, raddata radixTable[], int digit);
void merge(linkedlist** curFirst, linkedlist** curLast, raddata radixTable[]);
int yesno(double num);
void help();

int main()
{
	char cmd[10000], sprCmd[1000][100];
	int i, cmdCount, syntaxType, ret, listCount = 0;
	double numberList[10000], answer;
	linkedlist* first = NULL, * last = NULL;

	do {
		display(first);

		printf("command> ");
		gets(cmd);

		cmdCount = cut(cmd, sprCmd);
		syntaxType = syncheck(sprCmd);

		if (syntaxType == -1)
			printf("answer> error\n");
		else if (paramcheck(cmdCount, sprCmd, syntaxType, numberList) == -1)
			printf("answer> error\n");
		else
		{

			if (syntaxType == 2 || syntaxType == 3 || syntaxType == 4 || syntaxType == 5 || syntaxType == 6 || syntaxType == 12 || syntaxType == 15)
			{
				if (listCount == 0)
					printf("answer> No data.\n");
				else if (syntaxType == 2)
				{
					pop(&first, &last);

					listCount--;
				}
				else if (syntaxType == 3)
				{
					sort(&first, &last);
				}
				else if (syntaxType == 4)
				{
					if (op(&first, &last, 1, &answer) == -1)
						printf("answer> Cant operate\n");
					else
						printf("answer> %g\n", answer);
				}
				else if (syntaxType == 5)
				{
					if (op(&first, &last, 2, &answer) == -1)
						printf("answer> Cant operate\n");
					else
						printf("answer> %g\n", answer);
				}
				else if (syntaxType == 6)
				{
					op(&first, &last, 3, &answer);
					printf("answer> %g\n", answer);
				}

				else if (syntaxType == 12)
				{
					ret = search(&first, &last, numberList[1]);
					if (ret == -1)
						printf("answer> %g not found.\n", numberList[1]);
					else
						listCount -= ret;
				}

				else if (syntaxType == 15)
				{
					if (listCount <= (int)numberList[1])
						printf("answer> maximum peek %d\n", listCount - 1);
					else
					{
						answer = peek(&first, &last, (int)numberList[1]);
						printf("answer> %g\n", answer);
					}
				}
			}

			else if (syntaxType >= 7 && syntaxType <= 11)
			{
				if (listCount == 0)
					printf("answer> No data.\n");
				else if (listCount == 1)
					printf("answer> Cant operate\n");
				else if (syntaxType == 7)
				{
					ops(&first, &last, 1, &answer);
					printf("answer> %g\n", answer);
					listCount--;
				}
				else if (syntaxType == 8)
				{
					ops(&first, &last, 2, &answer);
					printf("answer> %g\n", answer);
					listCount--;
				}
				else if (syntaxType == 9)
				{
					ops(&first, &last, 3, &answer);
					printf("answer> %g\n", answer);
					listCount--;
				}
				else if (syntaxType == 10)
				{
					if (ops(&first, &last, 4, &answer) == -1)
						printf("answer> Cant operate\n");
					else
					{
						printf("answer> %g\n", answer);
						listCount--;
					}
				}
				else if (syntaxType == 11)
				{
					ops(&first, &last, 5, &answer);
					printf("answer> %g\n", answer);
					listCount--;
				}
			}

			else
			{
				if (syntaxType == 0){
					printf("answer> End program.\n");
					printf("Program written by 62070501064");
				}else if (syntaxType == 1)
					help();
				else if (syntaxType == 13)
				{
					push(&first, &last, numberList[1]);
					listCount++;
				}
				else if (syntaxType == 14)
				{
					if (insert(&first, &last, numberList[1]) == -1)
						printf("answer> Please sort\n");
					else
						listCount++;
				}
				else if (syntaxType == 16)
				{
					for (i = 1; i <= numberList[0]; i++)
						add(&first, &last, numberList[i]);
					listCount += numberList[0];
				}
			}
		}
	} while (syntaxType != 0);
	return 0;
}

int cut(char cmd[], char sprCmd[][100])
{
	int count = 0;
	char* ptr;

	ptr = strtok(cmd, " ");
	while (ptr != NULL)
	{
		strcpy(sprCmd[count], ptr);
		count++;
		ptr = strtok(NULL, " ");
	}
	return count;
}


int syncheck(char sprCmd[][100])
{
	int i, ret = -1;
	char validCmd[17][10] = { "end","help","pop","sort","sqrt","rec","neg","+","-","*","/","pow",
							"delete","push","insert","peek","add" };

	for (i = 0; i < 17; i++)
	{
		if (strcmp(sprCmd[0], validCmd[i]) == 0)
			ret = i;
	}

	return ret;
}


int paramcheck(int cmdCount, char sprCmd[][100], int syntaxType, double numberList[])
{
	int type;


	if ((syntaxType >= 0 && syntaxType <= 11) && cmdCount == 1)
		type = 0;

	else if ((syntaxType >= 12 && syntaxType <= 15) && (todouble(cmdCount, sprCmd, numberList) == 0 && cmdCount == 2))
		type = 0;

	else if (syntaxType == 16 && (todouble(cmdCount, sprCmd, numberList) == 0 && cmdCount > 1))
		type = 0;
	else
		type = -1;

	return type;
}


int todouble(int cmdCount, char sprCmd[][100], double numberList[])
{
	int i, j = 1, result = 0;
	char* endptr;

	for (i = 1; i < cmdCount; i++)
	{
		numberList[j] = strtod(sprCmd[i], &endptr);
		if ((*endptr) != 0)
			result = -1;
		j++;
	}

	numberList[0] = j - 1;

	return result;
}


void display(linkedlist* first)
{
	linkedlist* cur;

	if (first == NULL)
		printf("\nlist> NULL\n");
	else
	{
		cur = first;

		printf("\nlist> ");
		do {
			printf("%g ", cur->num);
			cur = cur->next;
		} while (cur != NULL);
		printf("\n");
	}
}


void add(linkedlist** first, linkedlist** last, double num)
{
	linkedlist* newptr;

	newptr = (linkedlist*)malloc(sizeof(linkedlist));
	newptr->num = num;
	newptr->next = NULL;

	if ((*first) == NULL)
		(*first) = (*last) = newptr;
	else
	{
		(*last)->next = newptr;
		(*last) = newptr;
	}
}


void push(linkedlist** first, linkedlist** last, double num)
{
	linkedlist* newdata;

	newdata = (linkedlist*)malloc(sizeof(linkedlist));
	newdata->num = num;

	if ((*first) == NULL)
	{
		newdata->next = NULL;
		(*first) = (*last) = newdata;
	}
	else
	{
		newdata->next = (*first);
		(*first) = newdata;
	}
}


int insert(linkedlist** first, linkedlist** last, double num)
{
	linkedlist* cur = (*first), * newptr;


	while (cur != NULL && cur->next != NULL)
	{
		if (cur->num > (cur->next)->num)
			return -1;
		cur = cur->next;
	}


	newptr = (linkedlist*)malloc(sizeof(linkedlist));
	newptr->num = num;

	if ((*first) == NULL)
	{
		newptr->next = NULL;
		(*first) = (*last) = newptr;
	}
	else if ((*first)->num > num)
	{
		newptr->next = (*first);
		(*first) = newptr;
	}
	else
	{
		cur = (*first);
		while (cur != NULL && cur->next != NULL && (cur->next)->num < num)
			cur = cur->next;

		if (cur == (*last))
		{
			newptr->next = NULL;
			(*last)->next = newptr;
			(*last) = newptr;
		}
		else
		{
			newptr->next = cur->next;
			cur->next = newptr;
		}
	}

	return 0;
}


void pop(linkedlist** first, linkedlist** last)
{
	linkedlist* cur = (*first);

	if ((*first) == (*last)){
		(*first) = (*last) = NULL;
	}else
		(*first) = (*first)->next;

	free(cur);
}


void deletedata(linkedlist** first, linkedlist** last, linkedlist** prev, linkedlist** cur){
	linkedlist* rem = (*cur);

	if ((*cur) == (*first) && (*first) == (*last))
		(*first) = (*last) = NULL;
	else if ((*cur) == (*first))
	{
		(*first) = (*cur)->next;
	}
	else if ((*cur) == (*last))
	{
		(*last) = (*prev);
		(*prev)->next = NULL;
	}
	else
		(*prev)->next = (*cur)->next;

	free(rem);
}


int search(linkedlist** first, linkedlist** last, double num)
{
	int remCount = 0, found = 0;
	linkedlist* cur, * prev, * temp;

	cur = (*first);
	prev = (*first);

	while (cur != NULL)
	{
		if (cur->num == num)
		{
			found++;
			if (yesno(num) == 1)
			{
				remCount++;
				temp = cur->next;
				deletedata(first, last, &prev, &cur);
				cur = temp;
			}
			else
			{
				prev = cur;
				cur = cur->next;
			}
		}
		else
		{
			prev = cur;
			cur = cur->next;
		}
	}

	if (found == 0)
		return -1;
	else
		return remCount;
}


int op(linkedlist** first, linkedlist** last, int opcode, double* answer)
{
	double num, ans;
	int result = 0;

	num = (*first)->num;

	if (opcode == 1)
	{
		if (num < 0)
			result = -1;
		else
			ans = sqrt(num);
	}
	else if (opcode == 2)
	{
		if (num == 0)
			result = -1;
		else
			ans = 1 / num;
	}
	else if (opcode == 3)
	{
		ans = num * -1;
	}

	if (result == 0)
	{
		pop(first, last);
		push(first, last, ans);
		(*answer) = ans;
	}

	return result;
}


int ops(linkedlist** first, linkedlist** last, int opcode, double* answer){
	double numA, numB, ans;
	int result = 0;

	numA = ((*first)->next)->num;
	numB = (*first)->num;

	if (opcode == 1)
	{
		ans = numA + numB;
	}
	else if (opcode == 2)
	{
		ans = numA - numB;
	}
	else if (opcode == 3)
	{
		ans = numA * numB;
	}
	else if (opcode == 4)
	{
		if (numB == 0)
			result = -1;
		else
			ans = numA / numB;
	}
	else if (opcode == 5)
	{
		ans = pow(numA, numB);
	}

	if (result == 0)
	{
		pop(first, last);
		pop(first, last);
		push(first, last, ans);
		(*answer) = ans;
	}

	return result;
}


double peek(linkedlist** first, linkedlist** last, int idx){
	int i = 0;
	linkedlist* cur = (*first);

	if (idx == -1)
		return (*last)->num;
	else
	{
		while (i != idx)
		{
			cur = cur->next;
			i++;
		}

		return cur->num;
	}
}


void sort(linkedlist** first, linkedlist** last){
	linkedlist* curFirst = NULL, * curLast = NULL;
	raddata radixTable[10];
	int digit;

	for (digit = 0; digit < 8; digit++)
	{
		devide(*first, radixTable, digit);
		merge(&curFirst, &curLast, radixTable);
		(*first) = curFirst;
		(*last) = curLast;
	}
}

void devide(linkedlist* first, raddata radixTable[], int digit){
	linkedlist* cur = first;
	int i, num;

	for (i = 0; i < 10; i++)
		radixTable[i].first = radixTable[i].last = NULL;

	while (cur != NULL)
	{
		num = (int)((cur->num) / pow(10, digit)) % 10;
		if (radixTable[num].first == NULL)
		{
			radixTable[num].first = cur;
			radixTable[num].last = cur;
		}
		else
		{
			radixTable[num].last->next = cur;
			radixTable[num].last = cur;
		}

		cur = cur->next;
		radixTable[num].last->next = NULL;
	}
}


void merge(linkedlist** curFirst, linkedlist** curLast, raddata radixTable[]){
	int i;

	(*curFirst) = (*curLast) = NULL;

	for (i = 0; i < 10; i++)
	{
		if (radixTable[i].first != NULL)
		{
			if ((*curFirst) == NULL)
			{
				(*curFirst) = radixTable[i].first;
				(*curLast) = radixTable[i].last;
			}
			else
			{
				(*curLast)->next = radixTable[i].first;
				(*curLast) = radixTable[i].last;
			}
		}
	}
}

int yesno(double num){
	char inp, ret;

	printf("answer> %g found, enter y to delete: ", num);

	while (scanf("%c%c", &inp, &ret) != 2 || ret != '\n')
		printf("answer> error, try again: ");

	if (inp == 'Y' || inp == 'y')
		return 1;
	else
		return 0;
}


void help(){
	printf("commands:\n\n");
	printf("add\n");
	printf("peek\n");
	printf("delete\n");
	printf("push\n");
	printf("pop\n");
	printf("sqrt , rec , neg\n");
	printf("+ , - , * , / , pow\n");
	printf("insert\n");
	printf("sort\n");
	printf("help\n");
	printf("end\n\n");
}
