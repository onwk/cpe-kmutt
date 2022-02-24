package ass6;

	public class Dnode implements Comparable <Dnode> {
		
		//declare value
		String word;
		String mean;
		String type;
		
		//compare word with trim, remove space
		public int compareTo(Dnode x) {
			return(int) this.word.trim().replaceAll("\\s+", " ").compareToIgnoreCase(x.word.trim().replaceAll("\\s+", " "));
		}
		
		public Dnode(String buff) {
			String[] str = buff.trim().split(",");
			if(str.length <= 1) { //if buff is only word
				word = buff.trim();
				word = word.replaceAll("\\s+"," ");
			}else { //if buff contain word, mean, type
				word = str[0].trim();
				mean = str[1].trim();
				type = str[2].trim();
			}
		}
		
		//compare word, mean, type with trim and remove space
		public boolean compareAll(Dnode x) {
			
			word = word.trim().replaceAll("\\s+", " ");
			mean = mean.trim().replaceAll("\\s+", " ");
			type = type.trim().replaceAll("\\s+", " ");
			
			if( word.equalsIgnoreCase(x.word) && mean.equalsIgnoreCase(x.mean)
					&& type.equalsIgnoreCase(x.type)) {
				return true;
				}
			else return false;
		}
		
		//for print word
		public void Print() {
			System.out.println( word + "  " + mean + "(" + type + ")");
		}
		
		//for print word with index
		public void Print(int index) {
			System.out.format("%2d) %-20s %-20s\n", index, word, mean + "(" + type + ")");
		}
	}

