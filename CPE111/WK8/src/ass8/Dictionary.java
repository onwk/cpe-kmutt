package ass8;

import java.util.HashMap;

public class Dictionary {
	
	public HashMap<String, Bnode> list = new HashMap<String, Bnode>();
	
	public int duplicateCount = 0; //count removed duplicate word
	public int word, meaning;//to count word and meaning
	
	//maximum word
	public int indexMax;
	public int maxWordCount = 0;
	
	//list of max duplicate word
	public HashMap<String, Bnode> duplicate = new HashMap<String, Bnode>();
	
	//Add word to dictionary
	public void Add(String input) {
		Bnode node = new Bnode(input);
		//Check if it's exist word
		if(list.containsKey(node.word.toLowerCase())) {
			//HashMap contain key
			//add meaning
			Bnode existWord = list.get(node.word);
			if(!existWord.mean.contains(node.mean.get(0))) {
			existWord.mean.addAll(node.mean);
			list.put(node.word, existWord);
			meaning++;
			}
		}else {
			//if HashMap don't contain key
			//use word as the key and add node to HashMap
			list.put(node.word, node);
			word++;
			meaning++;
		}
	}
	
	//Search and Print
	public void SandP(String _word ) {
		Bnode key = new Bnode(_word.toLowerCase());
		
		//use word as key
		if(list.containsKey(key.word)) {
			//found word in dictionary
			//grab the word node and print
			System.out.println("found " + _word);
			Print(list.get(key.word));
		}else {
			//if word is not found
			System.out.println(_word + " is not found");
		}
	}
	
	//find maximum duplicate word
	public Bnode FindMaxWord() {
		//declare empty node to be max node
		Bnode node = new Bnode("");
		for(String key : list.keySet()) {
			Bnode item = list.get(key);
			
			//if max node is empty
			//set node to be max node
			if(node.word == "") node = item;
			
			//replace previous maximum word with new one
			if(item.mean.size() > node.mean.size())
				node = item;
		}
		return node;
	}
	
	//Print node
	public void Print(Bnode node) {
		node.Print();
	}

}
