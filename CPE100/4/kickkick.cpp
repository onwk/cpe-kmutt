#include <stdio.h>
#include <math.h>
main()
{
	double theta, rad=0;
	double u, ux, uy, v, vx, vy, t, tgoal = 0;
	double d, dleft, dx = 0, h, hgoal = 0;
	int i = 0;
	char ch, enter;
	
	printf("\n Welcome to Soccer Shooting Game.\n");
	printf("\n--------------------Here is the rules.--------------------\n");
	printf("\nThe player must input informations to calculate the result.\n");
	printf("\nIncluding:	The speed of the ball the player has kicked.(Real nember)\n");
	printf("\n           	The angle between the ball and the ground.(between 1 - 90)\n");
	printf("\n		The distance between the player and the goal.(Real number)\n");
	printf("\n***To shot on goal***, the ball need to reach the goal with the height not higher than 2.44 meters\n");
	printf("\n	the goal has width 7.32 meters and the goalkeeper has 0.5 seconds to save the ball.\n");
	printf("\n=======================================================================================================================\n");
	printf("\nWanna take some shot? in 3 2 1.\n");
	
	do{
	printf("\nTake a shot with the speed = ");
	i = scanf("%lf%c",&u,&enter);
	while((i != 2 || enter != '\n' ))
			{
			printf("\nOnly real number please.\n");
			printf("\nTake a shot with the speed = ");
			rewind(stdin);
			i = scanf("%lf%c",&u,&enter);
			}
			
	printf("\nHow many angles you kick the ball? = ");
	i = scanf("%lf%c",&theta,&enter);
	while((i != 2 || enter != '\n' ))
			{
			printf("\nOnly real number please.\n");
			printf("\nHow many angles you kick the ball? = ");
			rewind(stdin);
			i = scanf("%lf%c",&theta,&enter);
			}
			
	printf("\nHow far between you and the goal? = ");
	scanf("%lf%c",&d,&enter);
	while((i != 2 || enter != '\n' ))
			{
			printf("\nOnly real number please.\n");
			printf("\nHow far between you and the goal? = ");
			rewind(stdin);
			i = scanf("%lf%c",&d,&enter);
			}
	
	rad = theta*(M_PI/180); 		// change theta to radian
	ux = u*cos(rad);				// find ux
	uy = u*sin(rad);				// find uy
	t = ((-2)*uy)/ -9.81 ;			// find t overall
	dx = ux*t;						// find distance in the air
	dleft = d-dx;					// find distance between the ground and the goal
	h = -(uy*uy)/(-9.81*2); 		// find h max of the ball
	tgoal = d/ux;					// find t from kick to the goal
	hgoal = uy*tgoal + ((0.5)*(-9.81)*tgoal*tgoal);		// find h of the ball at the goal
	
	printf("\n\nThe Result is...\n\n");
	
	printf("\nThe most height that the ball can reach is %.2lf meters\n",h);
	printf("\nThe most distance that the ball can go without touching the ground is %.2lf meters\n",dx);
	printf("\nThe most duration that the ball can be in the air is %.2lf seconds\n",t);
	printf("\n\n-------------------------------------------------------------------------------------------\n\n");
	if(dx > d){
		printf("\nThe height of the ball at the point in front of the goal is %.2lf meters\n",hgoal);
		printf("\nThe duration of the ball to be in front of the goal is %.2lf seconds\n",tgoal);
	}
	else{
		printf("\nThe ball has fallen before reach the goal. Try again!\n");
		printf("\nThe distance between the ball that has fallen and the goal is %.2lf meters\n",dleft);
	}
	if( dx > d && tgoal <= 0.5 && hgoal < 2.44){
		printf("\n	Congratulation!!!!! Its a goal!!!\n");
	}
	if(dx > d && tgoal <= 0.5 && hgoal >= 2.44){
		printf("\n	It is too high.The ball across the goal.\n");
	}
	if(dx > d && tgoal > 0.5 && hgoal < 2.44){
		printf("\n	It is not a goal!! The Goalkeeper can save the ball.\n");
	}
		printf("\n\n-------------------------------------------------------------------------------------------\n\n");
		printf("\n***Do you want to play again*** (y or n) ");
	do
	{
		scanf("%c",&ch);
	} 
	while(ch != 'Y' && ch != 'y' && ch != 'N' && ch != 'n');	
	} 
	while(ch == 'Y' || ch == 'y');
	
  	printf("\nDont forget to come play agian.\n");
	  	
	return 0;	
}
