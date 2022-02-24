package ass6;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

public class ass6 {
	
	static Dictionary dictionary;
	
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
				dictionary.Add(new Dnode(sc.nextLine().trim().replace("\uFEFF", " ").replaceAll("\\s+"," ")));
			}
			sc.close();
		}
	}
	
	public static void main(String[] args) {
		
		dictionary = new Dictionary();
		
		//read file
		readLexitronFile("utf8lexitron.csv");
		
		//sort data
		dictionary.Sort();
		System.out.println("Total: " + dictionary.list.size());
		
		//remove duplicate word
		dictionary.RemoveDuplicate();
		System.out.println("Duplicate: " + dictionary.duplicateCount);
		System.out.println("Remaining: " + dictionary.list.size());
		
		//find maximum word
		dictionary.FindMaxWord();
		System.out.println("Maximum meaning word " + dictionary.Get(dictionary.indexMaxWord).word + " have " + dictionary.maxWordCount + " meanings.");
		dictionary.PrintMaxWordList();
		
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
				//set start and end to null
				int start[] = {-1};
				int end[] = {-1};
				
				//search
				dictionary.SearchWord(input, start, end);
				if(start[0] >= 0) { //if found word
					System.out.println("Found " + dictionary.list.get(start[0]).word + " " + (end[0] - start[0] + 1) + " word at " + start[0] + " - " + end[0]);
					dictionary.Print(start[0], end[0]);
				}else {
					//if word is not found
					System.out.println(input + " is not found.");
				}
			}
		}while(endProgram == false);
		sc.close();
		System.out.println("EndProgram");
		System.out.println("Program written by ONWIPA KUJAROENPAISAN 62070501064");
	}

}

