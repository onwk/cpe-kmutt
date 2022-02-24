package ass8;

import java.util.ArrayList;

public class Bnode implements Comparable<Bnode> {
	
	String word;
	ArrayList<String> mean = new ArrayList<String>();
	
	public Bnode(String buff) {
		word = buff.trim().replaceAll("\\s+", " ");
		String[] str = buff.toLowerCase().trim().split(",");
		//check input
		if(str.length <= 1) { //if input is only word
			//remove space
			word = buff.trim().replaceAll("\\s+", " ");
		}else{//if there are word and mean
			//remove space
			word = str[0].trim();
			//separate type and mean but combine in same string
			mean.add(str[1].trim() + "(" + str[2].trim() + ")");
		}
	}

	//compare ignore case, trim and remove space
	@Override
	public int compareTo(Bnode x) {
		return (int) word.trim().replaceAll("\\s+", " ").compareToIgnoreCase(x.word.trim().replaceAll("\\s+", " "));
	}
	
	//add mean to meaning list in Bnode
	public void add(ArrayList<String> list) {
		for(String _mean : list) {
		add(_mean);
		}
	}
	
	//add new mean
	public void add(String _mean) {
		//add only new meaning
		if(!mean.contains(_mean))
			mean.add(_mean);
	}
	
	//for print node
	public void Print() {
		for(int i =0; i < mean.size(); i++) {
			if(i == 0) //show only one word at first index
				System.out.format("%-20s %-2s" + ")" + " %-20s\n", word, i + 1, mean.get(i));
			else
				System.out.format("%-20s %-2s" + ")" + " %-20s\n", "", i + 1,mean.get(i));
		}
	}

}
