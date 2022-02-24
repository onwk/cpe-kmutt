package lab1;

import java.util.Scanner;

class Ref {
	public double mantissa;
	public int exponent;
}

class FloatToBinary {

	static int[] keepExpo = new int[11];

	public static void main(String[] args) {

		String decimal;
		char[] c = new char[64];
		int LoopCount;
		String sign;
		String expo;
		String mantis;
		String binary;

		while (true) {
				System.out.print("");
				Scanner sc = new Scanner(System.in);
				decimal = sc.next();
				double dec = Double.parseDouble(decimal);
				Ref ref = new Ref();

				if (dec > 0)
					sign = "0";
				else {
					dec = -dec;
					sign = "1";
				}

				if (dec > 1) {
					morethanzero(dec, ref);
				} else {
					lessthanzero(dec, ref);
				}

				ref.exponent += 1023;
				ref.mantissa -= 1;

				expoToBinary(ref);
				LoopCount = 11;
				expo = expoToString(c, keepExpo, LoopCount);
				expo = expo.trim().replaceAll("\\s+", " ");
				mantis = convertToBinary(ref);
				binary = sign + " " + expo + " " + mantis;
				System.out.println(binary);
			break;
		}
	}

	public static void morethanzero(double dec, Ref ref) {
		int i = 0;
		while (true) {
			if (Math.pow(2, i) <= dec && Math.pow(2, i + 1) > dec) {
				ref.exponent = i;
				ref.mantissa = (double) (dec / Math.pow(2, i));
				break;
			} else {
				i++;
			}
		}
	}

	public static void lessthanzero(double dec, Ref ref) {
		int i = 0;
		while (true) {
			if (Math.pow(2, i) <= dec && Math.pow(2, i + 1) > dec) {
				ref.exponent = i;
				ref.mantissa = (double) (dec / Math.pow(2, i));
				break;
			} else {
				i--;
			}
		}
	}

	public static void expoToBinary(Ref ref) {
		int count = 0;
		int i = 10;
		while (ref.exponent != 0) {
			keepExpo[i] = ref.exponent % 2;
			ref.exponent = ref.exponent / 2;
			i--;
			count++;
		}
		int add = 11 - count;
		for (i = 0; i < add; i++) {
			keepExpo[i] = 0;
		}
	}

	public static String expoToString(char c[], int num[], int count) {
		int j = 0;
		for (int i = 0; i < count; i++) {
			c[j] = (char) ('0' + num[i]);
			j++;
		}
		String str = String.valueOf(c);
		return str;
	}

	public static String convertToBinary(Ref ref) {
		int i = 0;
		String result = "";

		while (i < 52) {
			ref.mantissa = ref.mantissa * 2;
			if (ref.mantissa >= 1) {
				result += "1";
				ref.mantissa = ref.mantissa - 1;
				i++;
			} else if (ref.mantissa < 1) {
				result += "0";
				i++;
			}
		}
		return result;
	}
}
