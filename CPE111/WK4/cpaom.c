#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

typedef struct node{
    double data;
    struct Node *next;
}linkedList;

linkedList *first = NULL, *last = NULL, *ptr = NULL;

void add_data(double num){
    linkedList *ptr;
    ptr = (linkedList *)malloc(sizeof(linkedList));
    ptr -> next = NULL;
    ptr -> data = num;

    if(first == NULL){
        first = last = ptr;
    }else{
        last -> next = ptr;
        last = ptr;
    }
}

void list_data(){
    linkedList *ptr;
    ptr = first;

    if(ptr == NULL){
        printf("LIST> NULL\n");
    }else{
        printf("LIST> ");
        while(ptr != NULL){
            printf("%g ",ptr->data);
            ptr = ptr->next;
        }
        printf("\n");
    }
}

int count_node(){
    linkedList *ptr;
    ptr = first;
    int count = 0;

    if(ptr == NULL){
        return count;
    }else{
        while(ptr != NULL){
            count+=1;
            ptr = ptr->next;
        }
        return count;
    }

}

void delete_node(linkedList *prev, linkedList *node){
    if(node == first && node == last){
        first = last = NULL;
    }
    else if(node == first)
    {
        first = first->next;
    }
    else if(node == last)
    {
        last = prev;
        last->next = NULL;
    }
    else
    {
        prev->next = node->next;
    }
    free(node);

}


void search_node_delete(double num){
    linkedList *prev,*ptr;
    int AllNode = count_node();
    int nodeDel = 0;
    char confirm,buff;

    ptr = first;
    while(ptr != NULL){
        nodeDel++;
        if(ptr->data == num){
            printf("Delete %g at node[%d] ? : ",num,nodeDel);
            scanf("%c%c",&confirm,&buff);

            if((confirm == 'y' || confirm == 'Y') && buff == '\n'){
                delete_node(prev,ptr);
                rewind(stdin);
            }
        }
        prev = ptr;
        ptr = ptr->next;
    }
}

void peek(int position){
    linkedList *ptr;
    int NodeCount;
    NodeCount = count_node();
    int count = 0;

    ptr = first;

    if(position >= NodeCount){
        printf("max node = %d\n",NodeCount-1);
    }else if(position == -1){
        ptr = last;
        printf("%g",ptr->data);
    }else {
        while(ptr != NULL){
            if(position == count){
                printf("%g",ptr->data);
            }
            count++;
            ptr = ptr->next;
        }
    }
}

void push(double num){
    linkedList *ptr;
    ptr = (linkedList *)malloc(sizeof(linkedList));
    ptr->data = num;

    if(first == NULL && last == NULL){
        first = last = ptr;
        ptr->next = NULL;
    }else{
        ptr->next = first;
        first = ptr;
    }
}

void pop(){
    int nodeCount;
    nodeCount = count_node();
    double pop_data = 0;

    if(nodeCount == 0){
        printf("No data!\n");
    }else{
        linkedList *ptr;
        ptr = first;
        printf("answer> %g\n",ptr->data);
    }
}

int sort(){
    linkedList *ptr;
    ptr = first;
    int nodeCount;
    nodeCount = count_node();
    int i,j;
    double temp;
    double data_backup[100];

    for(i=1;i<=nodeCount;i++){
        data_backup[i] = ptr->data;
        ptr = ptr->next;
    }

    first = last = NULL;

    for(i=1;i<=nodeCount;i++){
        for(j=i;j<=nodeCount;j++){
            if(data_backup[i] > data_backup[j]){
                temp = data_backup[i];
                data_backup[i] = data_backup[j];
                data_backup[j] = temp;
            }
        }
    }

    for(i=1;i<=nodeCount;i++){
        add_data(data_backup[i]);
    }

    return 1;
}

int main()
{
    char str[100],word[50][50];
    char *token = NULL;
    int check;
    int index = 0,i = 0;
    int *check_sort = 0;
    do
    {
        index = 0;
        list_data();

        /*if(check_sort == 1){
            printf("sorted\n");
        }else{
            printf("unsort\n");
        }*/

        printf("command> ");
        gets(str);
        token = strtok(str," ");
        while(token != NULL)
        {
            strcpy(word[index++],token);
            token = strtok(NULL," ");
        }

        strlwr(word);
        check = check_syntax(word, index, &check_sort);

        if(check == 1)
        {
        	printf("OK\n");
            printf("\n");
        }
        else if(check == 0)
        {
            printf("answer> syntax error\n\n");
        }
        else if(check == 2)
        {
            printf("answer> parameter error\n\ns");
        }
    }
    while(check != 3);
    printf("answer> OK\n");
    printf("\nEnd program\nProgram written by \n");
}


int check_syntax(char word[][50], int index, int *check_sort)
{
    int i;

    if((strcmp(word[0],"list")) == 0)
    {
        if(index == 1)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"end")) == 0)
    {
        if(index == 1)
        {
            return 3;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"sort")) == 0)
    {
        if(index == 1)
        {
            *check_sort = sort();
            if(*check_sort == 1){
                return 1;
            }


        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"pop")) == 0)
    {
        if(index == 1)
        {
            char *end;
            double send;
            double pop_func;
            send = strtod(word[1],&end);
            pop(send);
            *check_sort = 0;

            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"delete")) == 0)
    {
        if(index == 2 && isdigit(word[1][0]))
        {
            char *end;
            double send;
            send = strtod(word[1],&end);
            search_node_delete(send);
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"push")) == 0)
    {
        if(index == 2 && isdigit(word[1][0]))
        {
            char *end;
            double send;
            send = strtod(word[1],&end);
            push(send);
            *check_sort = 0;
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"insert")) == 0)
    {
        if(index == 2 && isdigit(word[1][0]))
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"search")) == 0)
    {
        if(index == 2 && isdigit(word[1][0]))
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"peek")) == 0)
    {
        if(index == 2 && isdigit(word[1][0]))
        {
            char *end;
            double send;
            send = strtod(word[1],&end);
            peek(send);
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else if((strcmp(word[0],"add")) == 0)
    {
        if(index == 1)
        {
            return 0;
        }
        else
        {
            int inx,inx2;
            int check=0;
            for(inx=1; inx<index; inx++)
            {

                for(inx2=0; inx2<strlen(word[inx]); inx2++)
                {
                    if(!isdigit(word[inx][inx2]))
                    {
                        check+=1;
                    }
                }

            }
            if(check==0)
            {
                char *end;
                double send[100];
                for(i=1;i<index;i++){
                   send[i] = strtod(word[i],&end);
                   add_data(send[i]);
                }
                 *check_sort = 0;
                return 1;
            }
            else
            {
                return 2;
            }
        }
    }
    else
    {
        return 0;
    }

}
