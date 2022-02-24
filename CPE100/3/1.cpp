#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main()
{
	int x, y, count, i;
	char name[20];
	char ch, enter;
	do
	{
		srand(time(NULL));
		x = rand() %100+1;
		count = 0;
		printf("Welcome to Guess Number Game. What is your name? = ");
		scanf("%s",&name);
		printf("\nHello,%s. Game will begins in 3 2 1.\n",name);
		do
		{
		count = count +1;
		printf("\nCounted %d time.",count);
		printf("\nGuess the number (1 to 100): ");
		i = scanf("%d%c",&y,&enter);
			while((i != 2 || enter != '\n' ) || y<1 || y>100)
			{
			printf("\nOnly number between 1 to 100.\n");
			printf("\nCounted %d time.",count);
			printf("\nGuess the number (1 to 100): ");
			rewind(stdin);
			i = scanf("%d%c",&y,&enter);
			}

		if(x==y)
		{
		printf("\nCorrect\n");
		}else {
		if(y>x)
		{
		printf("\nWrong! Your number is too much\n");
		}else{
		printf("\nWrong! Your number is too less\n");	
		}
		}
		if(count==7 && y!=x)
		{
		printf("\nSorry,%s. You Lost.\n",name);
		printf("\nThe correct number is %d\n",x);
		}
		}
		while(count!=7 && y!=x);
		do
		{
			printf("\nEnter y to play agian or n to end the game.");
			scanf("%c",&ch);
		}
		while(ch != 'Y' && ch != 'y' && ch != 'N' && ch != 'n');		
	}
	while(ch =='y'|| ch =='Y');
	
	printf("\nEnd Game. Hope to see you again,%s.",name);
			
	return 0;
}
