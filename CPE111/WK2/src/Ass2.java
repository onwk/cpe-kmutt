//import java.util.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

class struct{
	public long field1 = 0;
	public String field2;
	public String field3;
}

public class Ass2 {
	
//	long field1 = 0;
//	String field2;
//	String field3;
//	int count;
	
	struct data = new struct();
	struct sortingData = new struct();
	int count;
	
	public static void readfile() {
		try {
			BufferedReader br = new BufferedReader(new FileReader("test.csv"));
			String line = "";
			while((line = br.readLine()) != null) {
				String[] arr = line.split(",");
				
				System.out.println(line);
				//System.out.print
			}
			br.close();
		}	catch (FileNotFoundException e) {
			e.printStackTrace();
		}	catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void split() {
		
	}

	public static void main(String[] args) {
		readfile();
		

	}

}
