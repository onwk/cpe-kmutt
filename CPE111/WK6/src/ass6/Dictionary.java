package ass6;

import java.util.ArrayList;
import java.util.Collections;

public class Dictionary {

	public ArrayList<Dnode> list = new ArrayList<Dnode>();
	
	public int duplicateCount = 0; //to count duplicate word that was removed
	
	//to count maximum word
	public int indexMaxWord;
	public int maxWordCount = 0;
	
	public Dictionary maxWordList; //to be list of maximum duplicate word
	
	//to sort data in list
	public void Sort() {
		Collections.sort(list);
	}
	
	//to get word by using index
	public Dnode Get(int index) {
		return list.get(index);
	}
	
	//to add word to dictionary
	public void Add(Dnode node) {
		list.add(node);
	}
	
	//copy to this dictionary
	public void Copy(Dictionary source) {
		list.clear();
		for(int i = 0; i < source.list.size(); i++) {
			list.add(source.list.get(i));
		}
	}
	
	public void Print(int start,int end) {
		Print(start,end,false);
	}
	
	//print from start index to end index
	public void Print(int start,int end,boolean realIndex) {
		for(int i = start; i <= end && i < list.size(); i++) {
			Dnode dict = list.get(i);
			if(realIndex) //print real index
				dict.Print(i);
			else dict.Print((end - start + 1) - (end - i)); //print ordered index
		}
	}
	
	public void RemoveDuplicate() {
		maxWordCount = 0; // reset max duplicate count
		maxWordList = new Dictionary(); //reset list
		
		//loop in list of data
		for(int i = list.size() - 1; i >= 0; i--) {
			Dnode word = list.get(i);
			//check word, mean, type if it's match then remove
			for(int j = i - 1; j >= 0 && word.compareAll(list.get(j)) == true; j--) {
				list.remove(j); //remove duplicate word
				duplicateCount++; //count the deletion
			}
		}
	}
	
	public int FindMaxWord() {
		maxWordCount = 0; //reset count
		
		int wordCount = 0, index = 0;
		String lastWord = "";
		Dictionary wordList = new Dictionary(); //for save duplicate words
		
		//loop in dictionary
		for(int i = 0; i < list.size(); i++) {
			Dnode dict = list.get(i);
			//compare to previous word
			if(dict.compareTo(new Dnode(lastWord)) == 0) { //same as previous word but increase count
				wordCount++;
			}else { // found other word
				//if previous word is more than this word
				//set it to maximum word
				if(wordCount > maxWordCount) {
					indexMaxWord = index;
					maxWordCount = wordCount;
					maxWordList.Copy(wordList);
				}
				
				//count new word
				index = i;
				wordCount = 1;
				wordList.list.clear();
			}
			wordList.Add(dict); // save word to list
			lastWord = dict.word; //set the last word
		}
		return indexMaxWord;
	}
	
	//print duplicate words
	public void PrintMaxWordList() {
		if(maxWordList.list.size() <= 0) return ;
		//loop for print list of max duplicate word
		for(int i = 0; i < maxWordList.list.size(); i++) {
			maxWordList.list.get(i).Print(i+1);
		}
	}
	
	//print all data
	public void Print() {
		for(int i = 0; i < list.size(); i++) {
			Dnode dict = list.get(i);
			dict.Print(i);
		}
	}
	
	//for searching word and return index from starting to ending
	public void SearchWord(String word, int[] start, int[] end) {
		Dnode key = new Dnode(word);
		//search
		int index = Collections.binarySearch(list, key);
		int endIndex = -1;
		//check word that was found
		if(index >= 0) {
			//check previous word
			for(int i = index - 1; i >= 0; i--) {
				if(list.get(i).compareTo(key) == 0)
					index = i;
			}
			//find end index
			endIndex = index; //set end index
			for(int i = index + 1; i < list.size(); i++) {
				if(list.get(i).compareTo(key) == 0)
					endIndex++; //move end index
			}
			//return data
			start[0] = index; //start index
			end[0] = endIndex; //end index
		}else { //if word was not found
			//set to -1 to tell it's not found
			start[0] = -1;
			end[0] = -1;
		}
	}
}
