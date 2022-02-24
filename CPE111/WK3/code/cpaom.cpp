#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include<string.h>

typedef struct filesExcel
{
    char str1[100], str2[100];
    long long number;
} Excel;

void readFile_CSV(Excel data[], int *count)
{
    FILE *fp;
    Excel x;
    fp = fopen("test.csv" , "r");
    while(fscanf(fp,"%llu,%[^,],%s",&x.number, x.str1, x.str2) == 3)
    {
        data[*count] = x;
        *count = * count + 1;
    }
    fclose(fp);
}

void swap(Excel *a, Excel *b)
{
    Excel c;
    c =*a;
    *a = *b;
    *b = c;
}

int compare_strings1(const void* a, const void* b)
{
    char x[100], y[100];
    int ans;
    strcpy(x,((Excel *)a)->str2);
    strcpy(y,((Excel *)b)->str2);
    ans = strcmp(x,y);
    return ans;
}

int compare_integer(const void * a, const void * b)
{
    double x,y;
    x = (*(Excel *)a).number;
    y = ((Excel *)b)->number;
    if((x - y) > 0)
    {
        return 1;
    }
    else if((x - y) < 0)
    {
        return -1;
    }
    else{
        return 0;
    }
}

double qsort_int(Excel data[], Excel test[], int count)
{
    clock_t start, end;
    int i, j;
    double minimum_time = 10000, time;
    printf("\n");
    for(i = 0; i < 3; i++)
    {
        for(j = 0; j < count ; j++)
        {
            test[j] = data[j];
        }
        printf("use -> qsort int round %d",i+1);
        start = clock();
        qsort(test, count, sizeof(Excel),compare_integer);
        end = clock();
        time = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf(" |> TIME -> %lf \n",time);
        if(time < minimum_time)
        {
            minimum_time = time;
        }

    }
    printf("  BEST TIME -> %lf sec.\n",minimum_time);
    return minimum_time;
}
double qsort_strings(Excel data[], Excel test[], int count)
{
    clock_t start, end;
    int i, j;
    double minimum_time = 10000, time;
    printf("\n");
    for(i = 0; i < 3; i++)
    {
        for(j = 0; j < count; j++)
        {
            test[j] = data[j];
        }
        printf("use -> qsort strings round %d",i + 1);
        start = clock();
        qsort(test, count, sizeof(Excel),compare_strings1);
        end = clock();
        time = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf(" |> TIME -> %lf \n",time);
        if(time < minimum_time)
        {
            minimum_time = time;
        }
    }
     printf("  BEST TIME -> %lf sec.\n",minimum_time);
    return minimum_time;
}

void quickSort_integer(Excel data[], int first_data, int last_data)
{
    int i = first_data, j = last_data;
    if( first_data < last_data)
    {
        do{
            while((data[i].number <= data[j].number) && (i < j))
            {
                j--;
            }
            if(data[i].number > data[j].number)
            {
                swap(&data[i], &data[j]);
                i++;
            }
            while((data[i].number) <= (data[j].number) && i < j)
            {
                i++;
            }
            if(data[i].number > data[j].number)
            {
                swap(&data[i], &data[j]);
                j--;
            }
        }while( i < j);
        if(first_data < j - 1)
        {
            quickSort_integer(data,first_data,j - 1);
        }
        if(i + 1 < last_data)
        {
            quickSort_integer(data, i + 1, last_data);
        }
    }
}

void quickSort_strings(Excel data[], int first_data, int last_data)
{
    int i = first_data, j = last_data;
    if(first_data < last_data)
    {
        do{
            while(strcmp(data[i].str2,data[j].str2) <= 0 && ( i < j))
            {
                j--;
            }
            if(strcmp(data[i].str2,data[j].str2) > 0)
            {
                swap(&data[i],&data[j]);
                i++;
            }
            while(strcmp(data[i].str2,data[j].str2) <= 0 && ( i < j))
            {
                i++;
            }
            if(strcmp(data[i].str2,data[j].str2) > 0)
            {
                swap(&data[i],&data[j]);
                j--;
            }
        }while( i < j);
        if( first_data < j-1)
        {
            quickSort_strings(data, first_data, j-1);
        }
        if(i + 1 < last_data)
        {
            quickSort_strings(data, i + 1, last_data);
        }
    }
}

double timer_quickSort_integer(Excel data[], Excel test[], int count)
{
    clock_t start, end;
    int i, j;
    double minimum_time = 10000, time;
    printf("\n");
    for(i = 0; i < 3; i++)
    {
        for(j = 0; j < count; j++)
        {
            test[j] = data[j];
        }
        printf("use -> quick sort integer round %d",i + 1);
        start = clock();
        quickSort_integer(test, 0, count - 1);
        end = clock();
        time = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf(" |> TIME -> %lf \n",time);
        if(time < minimum_time)
        {
            minimum_time = time;
        }
    }
     printf("  BEST TIME -> %lf sec.\n",minimum_time);
    return minimum_time;
}

double timer_quickSort_strings(Excel data[], Excel test[], int count)
{
    clock_t start, end;
    int i, j;
    double minimum_time = 10000, time;
    printf("\n");
    for(i = 0; i < 3; i++)
    {
        for(j = 0; j < count; j++)
        {
            test[j] = data[j];
        }
        printf("use -> quick sort String round %d",i + 1);
        start = clock();
        quickSort_strings(test, 0, count - 1);
        end = clock();
        time = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf(" |> TIME -> %lf \n",time);
        if(time < minimum_time)
        {
            minimum_time = time;
        }
    }
     printf("  BEST TIME -> %lf sec.\n",minimum_time);
    return minimum_time;
}

int main()
{
    int count = 0;
    Excel *data, *test;
    double time1, time2, time3, time4;

    data = (Excel *)malloc(100000*sizeof(Excel));
    test = (Excel *)malloc(100000*sizeof(Excel));

    readFile_CSV(data, &count);
    printf("Load File...\n -> Load -> %d records\n",count);
    printf("\n--------------------------------");
    printf("\n:: Show Data Before sorting   ::\n");
    printf("--------------------------------\n");
    printf("::  data[0]     -> %llu | %s | %s\n",data[0].number, data[0].str1, data[0].str2);
    printf("::  data[49999] -> %llu | %s | %s\n",data[49999].number, data[49999].str1, data[49999].str2);
    printf("::  data[99999] -> %llu | %s | %s\n",data[99999].number, data[99999].str1, data[99999].str2);

    printf("\n--------------------------------");
    printf("\n::     use function Sort      ::\n");
    printf("--------------------------------\n");
    time2 = timer_quickSort_integer(data, test, count);
    time4 = timer_quickSort_strings(data, test, count);
    time3 = qsort_strings(data, test, count);
    time1 = qsort_int(data, test, count);

    printf("\n--------------------------------");
    printf("\n:: Show Data After sorting    ::\n");
    printf("--------------------------------\n");
    printf("data[0]     -> %llu | %s | %s\n",test[0].number, test[0].str1, test[0].str2);
    printf("data[49999] -> %llu | %s | %s\n",test[49999].number, test[49999].str1, test[49999].str2);
    printf("data[99999] -> %llu | %s | %s\n",test[99999].number, test[99999].str1, test[99999].str2);

    printf("\n--------------------------------");
    printf("\n::       Show Time            ::\n");
    printf("--------------------------------\n");
    printf("INTEGER SORT.");
    printf("\n  Min time of qsort             : %g sec.\n",time1);
    printf("  Min time of user qsort        : %g sec.\n",time2);
    printf("\n");
    printf("STRING SORT.\n");
    printf("  Min time of qsort             : %g sec.\n",time3);
    printf("  Min time of user qsort        : %g sec.\n",time4);

    printf("\n--------------------------------");
    printf("\n::         Result             ::\n");
    printf("--------------------------------\n");
    printf("INTEGER SORT.\n");
    if(time1<time2){
        printf("  'qsort' function is bester than 'quick sort by user manual'.\n");
    }else{
        printf("  'quick sort by user manual' is bester than 'qsort' function.\n");
    }

    printf("STRING SORT.\n");
    if(time3<time4){
        printf("  'qsort' function is bester than 'quick sort by user manual'.\n");
    }else{
        printf("  'quick sort by user manual' is bester than 'qsort' function.\n");
    }

    printf("\nEnd Program");
    printf("\nProgram written by \n");
}
