package ass7;

//import java.util.ArrayList;
//import java.util.Collections;
import java.util.TreeSet;

public class Dictionary {
		
	public TreeSet<Bnode> list = new TreeSet<Bnode>();
	
	public int duplicateCount = 0;//to count duplicate word that was removed
	public int word, meaning;//to count word and meaning
	//to count maximum word
	public int indexMaxWord;
	public int maxWordCount = 0;
	
	//for keep list of max duplicate word
	public TreeSet<Bnode> duplicate = new TreeSet<Bnode>();
	
	//to add word to dictionary
	public void Add(String input) {
		Bnode node = new Bnode(input);
		//check if word is exists in dictionary
		if(list.contains(node)) {
			//pick node from dictionary
			TreeSet<Bnode> data = (TreeSet<Bnode>) list.subSet(node, true, node, true);
			//add new mean to node
			if(!data.first().mean.contains(node.mean.get(0))) {
				data.first().mean.addAll(node.mean);
				meaning++;
			}
		}else { //if dictionary do not have this word
			//add word to dictionary
			list.add(node);
			word++;
			meaning++;
		}
	}
	
	//for search and print word
	public void SearchAndPrint(String word) {
		Bnode key = new Bnode(word);
		 //check if key is HashMap
		if(list.contains(key)) { //if word is in dictionary
			TreeSet<Bnode> node = (TreeSet<Bnode>)list.subSet(key, true, key, true);
			System.out.println("found " + word);
			Print(node); //print node
		}else {// if word is not found
			System.out.println(word + " is not found");
		}
	}
	
	//find max duplicate word
	public Bnode FindMaxWord() {
		//set as first word is maximum word
		Bnode node = list.first();
		for(Bnode item : list) {
			//check if mean count of next node is more than mean count of current node
			if(item.mean.size() > node.mean.size())
				node = item; //replace max word with new word
		}
		return node;
	}
	
	//print from start - end index
	public void Print() {
		for(Bnode item : list) {
			item.Print();
		}
	}
	
	//print from list
	public void Print(TreeSet<Bnode> list) {
		for(Bnode item : list) {
			item.Print();
		}
	}
}
