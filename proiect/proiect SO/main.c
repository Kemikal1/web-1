#include <time.h>
#include<stdio.h>
#include<string.h>
#include<pthread.h>
#include<stdlib.h>
#include<unistd.h>
#include <semaphore.h>
#define maxcons 10
#define nrpac 7
int lim_cons=maxcons;
int nr_doc=2;
int nr_pac=7;
int nrd_li=2;
pthread_mutex_t lock;

void *generare()
{
	int ast=0;
	srand(time(NULL));
    int gen=rand()%1000;
	sleep(gen);
	while(nrd_li<nr_doc) ast++;
	consultare(ast);

}

void consultare(int ast)
{

	int id;
	id=id%1000;
	int cons;
	srand(time(NULL);
	cons=rand()%maxcons;
    printf("id doctor %d",id);
	nrd_li-=1;
	pthread_mutex_lock(&lock);
	sleep(cons*100);
	printf(" timpul de consultare :%d \n timpul de de asteptare :%d \n",cons*100,ast);
    nrd_li+=1;
	pthread_mutex_unlock(&lock);


}



int main()
{
  pthread_t t[nr_pac];
  while(nr_pac)
  {
	  int ast=0;
	  nr_pac-=1;



	  pthread_create(&t[nr_pac],NULL,generare,NULL);




  }


while (nr_pac<nrpac)
{
	pthread_join(t[nr_pac],NULL);
    nr_pac+=1;

}
 return 0;
}
