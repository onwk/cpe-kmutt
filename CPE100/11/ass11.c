#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

struct studentData;
struct statScoreData;


struct studentData { //Declare type of variant
    long long id;
    char name[40];
    double mid, fin, atten, total, gpoint, point;
    char grade[3];
};


struct statScoreData {//Declare type of variant
    double min, max, mean, sd, sum, sumsqrt;
};

int getnum();
int getint (int minInt, int maxInt);
void read_file (char *filename, int *count);
void calculate_grade (struct studentData data[], int count, int a, int bplus, int b, int cplus, int c, int dplus, int d);
void calculate_statistic (struct studentData data[], int *count, double *min, double *max, double *mean, double *sd, int type);
void showStatistic ();
void printData (struct studentData data);
void DisplayList (struct studentData data[], int count);
void Sort_by_score (struct studentData data[], int count);
void Sort_by_id (struct studentData data[], int count);
void Search_by_score (struct studentData data[], int count);
void Search_by_grade (struct studentData data[], int count);
void Search_by_name (struct studentData data[], int count);
int menu ();
void display (int menu);


int file_loaded = 0;

struct studentData student[100];
struct statScoreData totalStat;
struct statScoreData midStat;
struct statScoreData finalStat;
struct statScoreData attenStat;
//Declare the variants

int studentCount = 0, aCount, bplusCount, bCount, cplusCount, cCount, dplusCount, dCount, fCount;
double gpa;



int getnum(){ //function to check if input be correct form of number
    int invalid, num, added, endCheck;
    char input;
    do
    {
        num = 0;
        invalid = 0;
        added = 0;
        endCheck = 0;
        while (endCheck == 0 && invalid == 0)
        {
            input = getchar();
            if (input >= '0' && input <= '9') //check that input be the number
            {
                num = num * 10 + (input - '0');
                added++;
            }
            else if (input == '\n' && added > 0) //check if input be ENTER
                endCheck = 1;
            else
                invalid = 1;
        }
        if (invalid == 1)
            printf("[ERROR] Invalid input ! Please enter again: "); //Warning to input again

        rewind(stdin);

    } while(invalid == 1);
    return num;
}

int getint (int minInt, int maxInt){ //Check number bbetween min-max value
    int input = getnum(); 
    while(input < minInt || input > maxInt) //loop while to check if input is not between min and max
    {
        printf("[ERROR] Please enter number between %i - %i: ", minInt, maxInt); //warn to input again
        input = getnum(); 
    }
    return input; 
}


void read_file (char *filename, int *count) //Function to read file
{
    FILE *file;
    int a;

    if ((file = fopen(filename, "r")) != NULL) //if file is can be read
    {
        *count = 0;
        struct studentData st;
        char newline;

		//read file and make data be variant
        while (fscanf(file, "%llu ,%[^,] ,%lf ,%lf ,%lf", &st.id, &st.name, &st.mid, &st.fin, &st.atten) == 5)
        {
            st.total = st.mid + st.fin + st.atten; //calculate total score
            student[*count] = st; 
            *count = *count + 1;  //count number of student
        }
        fclose(file);
        printf("Student count: %d", studentCount); //show number of student
        file_loaded = 1;
    } else { //if file is cannot be read
        printf("Can't read file.");
        file_loaded = 0;
    }
}

//function to calculate grade
void calculate_grade (struct studentData data[], int count, int a, int bplus, int b, int cplus, int c, int dplus, int d)
{
	int i;
    aCount = 0;
	bplusCount = 0;
	bCount = 0;
	cplusCount = 0;
	cCount = 0;
	dplusCount = 0;
	dCount = 0;
	fCount = 0;


//give grade by regulative standard
    for (i = 0; i < count;i++) {
        if (data[i].total >= a) {
            strcpy(data[i].grade, "A");
            data[i].gpoint = 4;
            aCount++;
        } else if (data[i].total >= bplus) {
            strcpy(data[i].grade, "B+");
            data[i].gpoint = 3.5;
            bplusCount++;
        } else if (data[i].total >= b) {
            strcpy(data[i].grade, "B");
            data[i].gpoint = 3.0;
            bCount++;
        } else if (data[i].total >= cplus) {
            strcpy(data[i].grade, "C+");
            data[i].gpoint = 2.5;
            cplusCount++;
        } else if (data[i].total >= c) {
            strcpy(data[i].grade, "C");
            data[i].gpoint = 2.0;
            cCount++;
        } else if (data[i].total >= dplus) {
            strcpy(data[i].grade, "D+");
            data[i].gpoint = 1.5;
            dplusCount++;
        } else if (data[i].total >= d) {
            strcpy(data[i].grade, "D");
            data[i].gpoint = 1.0;
            dCount++;
        } else {
            strcpy(data[i].grade, "F");
            data[i].gpoint = 0.0;
            fCount++;
        }
    }
}

//calculate several stat like mean and sd
void calculate_statistic (struct studentData data[], int *count, double *min, double *max, double *mean, double *sd, int type){
	//type = 0;
	int i;
    double sum = 0, sumsqr = 0, base;
    
    if (type == 0){ //if type is 0 
		base = data[0].total; //base is total score
	}
    if (type == 1){ //if type is 1
    	base = data[0].mid; //base is midterm score
	}
    if (type == 2){ //if type is 2
    	base = data[0].fin; //base is final score
	}
    if (type == 3){ //if type is 3
    	base = data[0].atten; //base is attend score
	}
    *min = base;
	*max = base; 


	//to fix type of score
    for (i = 0; i < *count;i++) {
        double score = 0;

        if (type == 0){
        	score = data[i].total;
		}
        else if (type == 1) {
        	score = data[i].mid;
		}
        else if (type == 2) {
        	score = data[i].fin;
		}
        else if (type == 3) {
        	score = data[i].atten;
		}
        
        //to check min and max score
        if (*min > score)
            *min = score;
        if (*max < score)
            *max = score;
       
        sum =  sum + score; //calculate the summation of score
        sumsqr = sumsqr + pow(score, 2); //calculate sum of score^2
    }

    //calculate mean and sd
    *mean = (double)sum/(double)*count;
    *sd = sqrt(sumsqr/ *count - pow(*mean, 2));
}

//function to show stat
void showStatistic (){
    
    calculate_statistic(student, &studentCount, &totalStat.min, &totalStat.max, &totalStat.mean, &totalStat.sd, 0);
    calculate_statistic(student, &studentCount, &midStat.min, &midStat.max, &midStat.mean, &midStat.sd, 1);
    calculate_statistic(student, &studentCount, &finalStat.min, &finalStat.max, &finalStat.mean, &finalStat.sd, 2);
    calculate_statistic(student, &studentCount, &attenStat.min, &attenStat.max, &attenStat.mean, &attenStat.sd, 3);
    
    gpa = 0.0; 
   
   	int i;
    for (i = 0; i < studentCount; i++) {
        gpa += student[i].gpoint; //calculate gpa
    }
    gpa /= studentCount; //calculate average gpa

   //show stat
    printf("|   Score   |    mid    |    final   |    atten   |    total   |\n");
    printf("|-----------|-----------|------------|------------|------------|\n");
    printf("|   min     |   %6.2lf  |   %6.2lf   |   %6.2lf   |   %6.2lf   |\n", midStat.min, finalStat.min, attenStat.min, totalStat.min);
    printf("|   max     |   %6.2lf  |   %6.2lf   |   %6.2lf   |   %6.2lf   |\n", midStat.max, finalStat.max, attenStat.max, totalStat.max);
    printf("|   mean    |   %6.2lf  |   %6.2lf   |   %6.2lf   |   %6.2lf   |\n", midStat.mean, finalStat.mean, attenStat.mean, totalStat.mean);
    printf("|   sd      |   %6.2lf  |   %6.2lf   |   %6.2lf   |   %6.2lf   |\n", midStat.sd, finalStat.sd, attenStat.sd, totalStat.sd);

    printf("\n");
    printf("|           |   A |  B+ |   B |  C+ |   C |  D+ |  D  |  F  |\n");
    printf("|   score   |  %2d |  %2d |  %2d |  %2d |  %2d |  %2d |  %2d |  %2d |\n", aCount, bplusCount, bCount, cplusCount, cCount, dplusCount, dCount, fCount);

    printf("\nGPA: %.2lf", gpa);

}

//function to show data of student
void printData (struct studentData data) {
    printf("%llu | %-40s | %6.2lf | %6.2lf | %6.2lf | %6.2lf |  %-2s | %.1lf |\n",
           data.id, data.name, data.mid, data.fin, data.atten, data.total, data.grade, data.gpoint);
}

//function to show list of student in array
void DisplayList (struct studentData data[], int count)
{
    printf("     ID     |                   NAME                   |   MID  |  FINAL |  ATTEN |  TOTAL |GRADE|POINT|\n");
    printf("            |                                          |        |        |        |        |     |     |\n");
    
    int i;
    for (i = 0; i < count; i++)
    {
        printData(data[i]); //show data of student
    }
    printf("Count: %d", count);
}

//function to order data by score
void Sort_by_score (struct studentData data[], int count)
{
    int i, j;
    for (i = 0; i < count;i++) {
        
        for (j = i+1; j < count; j++) {
            
            if (data[i].total < data[j].total) { //compare score
                //then swap
                struct studentData temp;
                temp = data[j];
                data[j] = data[i];
                data[i] = temp;
            }
        }
    }
}

//function to order data by id
void Sort_by_id (struct studentData data[], int count)
{
    int i, j;
    for (i = 0; i < count;i++) {
        struct studentData temp;
        for ( j = i+1; j < count; j++) {
            if (data[i].id > data[j].id) { //compare id
            //then swap
                temp = data[j];
                data[j] = data[i];
                data[i] = temp;
            }
        }
    }

}

//function to search student by define min-max score
void Search_by_score (struct studentData data[], int count)
{
    char again;
    double minRange, maxRange;
    do
    {
        
        rewind(stdin);
        system("cls");
        printf("Enter min and max score: ");
        scanf("%lf %lf", &minRange, &maxRange);
        int countData = 0;
        int i;
        for (i = 0; i < count;i++) {
            if (data[i].total >= minRange && data[i].total <= maxRange) {
                //show data of student who is between min-max
                countData++;
                printData(data[i]);
            }
        }
        printf("Count: %d\n", countData);
        //ask if user want to find again
        rewind(stdin);
        printf("\nDo you want to search again ? [Y/n]: ");
        scanf("%c", &again);
    
    }while(again == 'y' || again == 'Y');
}

//function to search student by define grade
void Search_by_grade (struct studentData data[], int count)
{
    char again;
    char grade[3];
    do
    {
        rewind(stdin);
        system("cls");
        printf("Enter grade A, B+, B, C+, C, D+, D, F or 0 for Exit: ");
        scanf("%2s", &grade); 
        //check if user defined grade
        if (strcmp(grade, "0") != 0) {
            int countData = 0;
            int i;
            for (i = 0; i < count;i++) {
                if (strcmp(data[i].grade, grade) == 0)//compare student grade and defined grade
                {
                    countData++;
                    printData(data[i]);
                }
            }
            printf("Count: %d\n", countData);
            rewind(stdin);
            printf("\nDo you want to search again ? [Y/n]: "); //ask if user want to search again
            scanf("%c", &again);
        }
    }while(strcmp(grade, "0") != 0 && (again == 'y' || again == 'Y'));

}

//function to search student data by name
void Search_by_name (struct studentData data[], int count)
{
    char again;
    double minRange, maxRange;
    do
    {
        rewind(stdin);
        system("cls");
        char name[20];
        printf("Search name: ");
        scanf("%20s", &name);
        //check if user input name
        if (strcmp(name, "0") != 0) {
            int countData = 0;
            int i;
			for (i = 0; i < count;i++) {
                if (strstr(data[i].name, name) != NULL) //check if student have name like defined name
                {
                    countData++;
                    printData(data[i]);
                }
            }
            printf("Count: %d\n", countData);
            rewind(stdin);
            printf("\nDo you want to search again ? [Y/n]: "); //ask if user want to search again
            scanf("%c", &again);
        }
    }while(again == 'y' || again == 'Y');

}


//function of menu
int menu ()
{
    printf("**************************************************\n");
    printf("*                      Menu                      *\n");
    printf("*            [1] Read file                       *\n");
    printf("*            [2] Calculate grade                 *\n");
    printf("*            [3] Statistic                       *\n");
    printf("*            [4] List                            *\n");
    printf("*            [5] List sort by score              *\n");
    printf("*            [6] List sort by id                 *\n");
    printf("*            [7] List score range                *\n");
    printf("*            [8] List grade range                *\n");
    printf("*            [9] List search name                *\n");
    printf("*                                                *\n");
    printf("*            [0] Exit                            *\n");
    printf("**************************************************\n");
    printf("Select: ");
    return getint(0, 9);
}

//function to show result of other function
void display (int menu)
{
    system("cls");
    if (menu == 1) { //read file
        read_file("score.csv", &studentCount);
    } else if (file_loaded == 0) //if user didnot input file then cannot do other menu
        printf("You need to load file first !");
    else if (menu == 2) { //calculate grade
        printf("Enter grade score: A, B+, B, C+, C, D+, D: ");
        int a, bplus, b, cplus, c, dplus, d;
        
        scanf("%d,%d,%d,%d,%d,%d,%d: ", &a, &bplus, &b, &cplus, &c, &dplus, &d);
     
        calculate_grade(student, studentCount, a, bplus, b, cplus, c, dplus, d);
     
        showStatistic();
    } else if (menu == 3) { //show stat
        showStatistic();
    } else if (menu == 4) { //show every student data
        DisplayList(student, studentCount);
    } else if (menu == 5) {//show every student data by sort score
        Sort_by_score(student, studentCount);
        DisplayList(student, studentCount);
    } else if (menu == 6) { //show every student data by sort id
        Sort_by_id(student, studentCount);
        DisplayList(student, studentCount);
    } else if (menu == 7) { //search student data by score
        Search_by_score(student, studentCount);
    } else if (menu == 8) { //search student data by id
        Search_by_grade(student, studentCount);
    } else if (menu == 9) { //search student data by name or keyword
        Search_by_name(student, studentCount);
    }

}


int main ()
{
    char again;
    int select;
    do {
        
        rewind(stdin);
        system("cls");
        select = menu();//show menu
      
        display(select);//show menu that user chose
        if (select != 0)
        {
        	//if user did not choose 0 then
            //program will not be back to menu until user press ENTER
            char input;
            rewind(stdin);
            do
            {
                printf("\n\nPress [ENTER] to back to menu.");
                input = getchar();
            } while(input != '\n');
        }
    } while (select != 0); //if user choose 0 then
    return 0; //end program
}
