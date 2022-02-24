package ass;

import java.util.*;

public class Ass1 {
	
	static int factorial(int n, int begin) {
		int ans;
		if(n == 0) {
			System.out.printf("0! is base case return answer of 0! = 1");
			ans = 1;
		}
		else
		{
			System.out.printf("%d! is recursive case. Answer = %d * recursion of %d!\n", n, n, (n-1));
			System.out.printf("     Recursion to calculate %d!\n", (n-1));
			ans = (n*factorial(n-1, begin));
		}
		
		if(n != begin) {
			System.out.printf("\nCalculate %d! complete.",n);
			System.out.printf("\n     Return answer from %d! = %d to calculate %d = [%d * %d!] = %d * %d = %d", n, ans, n+1, n+1, n, n+1, ans, (n+1)*ans);
		}
		else {
			//System.out.printf("\nCalculate %d! complete.",n);
			System.out.printf("\nComplete calculation of %d! answer = %d\n",begin ,ans);
		}
			return ans;
	}
	
	static int getint(int min, int max) {
		
		int n, a = 0;
		boolean success = false;
		Scanner in = new Scanner(System.in);
		while(!success) {
			try {
				a = in.nextInt();
				if(a >= min && a <= max) {
					success = true;
				}else {
					System.out.printf("Input error, please enter between %d - %d", min, max);
					System.out.printf("\nEnter number: ");
				}
			} catch(Exception e) {
					System.out.printf("Input error, please enter between %d - %d", min, max);
					in.nextLine();
					System.out.printf("\nEnter number: ");
			}
		}
		return a;
	}
	

		public static void main(String[] args) {
			int n;
			Scanner in = new Scanner(System.in);
			char ch;
			int ans;
			System.out.printf("My Recursion Programs.");
			System.out.printf("\nProgram calculate n! by recursion (n<=15)");
			System.out.printf("\n--------------------------------------------------");
			do{
				System.out.printf("\nEnter number: ");
				n = getint(0,15);
				ans = factorial(n,n);

				System.out.printf("\npress [y] to continue, others to exit.");
				ch = in.next().charAt(0);
			}while (ch == 'y' || ch == 'Y');
				System.out.printf("\n***************************************************************************");
				System.out.printf("\nEnd Program");
				System.out.printf("\nProgram writen by 62070501064 Onwipa Kujaroenpaisan");
				System.out.printf("\n***************************************************************************");
		}
	}

