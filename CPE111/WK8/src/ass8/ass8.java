package ass8;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

public class ass8 {

	static Dictionary dictionary;
	static int readCount = 0;
	
	public static void readLexitronFile(String filePath) {
		FileInputStream in = null;
		try {
			in = new FileInputStream(filePath);
		}catch(Exception e) {
	
		}
		InputStreamReader fr = null;
		try {
			fr = new InputStreamReader(in,"UTF-8");
		}catch(Exception e) {
			
		}
		if(in != null && fr!= null) {
			Scanner sc = new Scanner(fr);
			//Read each line
			while(sc.hasNext()) {
				//Trim and remove uFEFF then remove space each line before add to dictionary
				dictionary.Add(sc.nextLine().trim().replace("\uFEFF", " ").replaceAll("\\s+"," "));
				readCount++;
			}
			sc.close();
		}
	}
	
	public static void main(String[] args) {
		
		dictionary = new Dictionary();
		
		//read file
		readLexitronFile("utf8lexitron.csv");
		
		System.out.println("Total: " + readCount);
		System.out.println("Total word size: " + dictionary.list.size());
		System.out.println("Total meaning size: " + dictionary.meaning );
		
		//find maximum word
		Bnode maxMean = dictionary.FindMaxWord();
		System.out.println("Maximum meaning word " + maxMean.word + " have " + maxMean.mean.size() + " meanings.");
		maxMean.Print();
		
		Scanner sc = new Scanner(System.in);
		
		String input;
		boolean endProgram = false;
		boolean command;
		do {
			command = false;
			
			System.out.print("Enter word: ");
			input = sc.nextLine();  //recieve input
			//check if input is not end
			endProgram = (input.trim().compareToIgnoreCase("end") == 0)? true : false;
			if(!endProgram || ! command) {
				//search and print word
				dictionary.SandP(input); //search
				}
			}while(endProgram == false);
		sc.close();
		System.out.println("EndProgram");
		System.out.println("Program written by ONWIPA KUJAROENPAISAN 62070501064");
	}

}
