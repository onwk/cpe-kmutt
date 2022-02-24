import java.util.*;

class Main {

    private static HashMap<String, Boolean> mem = new HashMap<>();

    private static int operating (String operations) {
        if (operations.equals("02")) return 0;
        else if (operations.equals("00") || operations.equals("10") || operations.equals("21")) return 2;
        else return 1;
    }

    private static boolean checkResult (String operations, int result) {
        if (mem.containsKey(operations + " " + result)) {
            return mem.get(operations + " " + result);
        }
        if (operations.length() == 1) return Integer.valueOf(operations) == result;
        if (operations.length() == 2) return operating(operations) == result;
        else {
            for (int i = 1; i < operations.length(); i++) {
                String left = operations.substring(0, i);
                String right = operations.substring(i);
                if (result == 0) {
                    if (operations.charAt(0) != '0') {
                        mem.put(operations + " " + "0", false);
                        return false;
                    }
                    boolean leftIs0 = checkResult(left, 0);
                    boolean rightIs2 = checkResult(right, 2);
                    if (leftIs0 && rightIs2) {
                        mem.put(operations + " " + "0", true);
                        return true;
                    }
                }
                else if (result == 1) {
                    boolean leftIs0 = checkResult(left, 0);
                    boolean rightIs1 = checkResult(right, 1);
                    if (leftIs0 && rightIs1) {
                        mem.put(operations + " " + "1", true);
                        return true;
                    }
                    boolean leftIs1 = checkResult(left, 1);
                    if (leftIs1 && rightIs1) {
                        mem.put(operations + " " + "1", true);
                        return true;
                    }
                    boolean rightIs2 = checkResult(right, 2);
                    if (leftIs1 && rightIs2) {
                        mem.put(operations + " " + "1", true);
                        return true;
                    }
                    boolean rightIs0 = checkResult(right, 0);
                    boolean leftIs2 = checkResult(left, 2);
                    if (leftIs2 && rightIs0) {
                        mem.put(operations + " " + "1", true);
                        return true;
                    }
                    if (leftIs2 && rightIs2) {
                        mem.put(operations + " " + "1", true);
                        return true;
                    }
                }
                else {
                    boolean leftIs0 = checkResult(left, 0);
                    boolean rightIs0 = checkResult(right, 0);
                    if (leftIs0 && rightIs0) {
                        mem.put(operations + " " + "2", true);
                        return true;
                    }
                    boolean leftIs1 = checkResult(left, 1);
                    if (leftIs1 && rightIs0) {
                        mem.put(operations + " " + "2", true);
                        return true;
                    }
                    boolean leftIs2 = checkResult(left, 2);
                    boolean rightIs1 = checkResult(right, 1);
                    if (leftIs2 && rightIs1) {
                        mem.put(operations + " " + "2", true);
                        return true;
                    }
                }
            }
            mem.put(operations + " " + result, false);
            return false;
        }
    }

    public static void main (String[] args) {
        ArrayList<String> ans = new ArrayList<>();
        int count = 0;
        Scanner in = new Scanner(System.in);
        while (count < 10) {
            in.nextInt();
            String operands = in.nextLine().trim();
            if (checkResult(operands, 0)) ans.add("yes");
            else ans.add("no");
            count++;
        }
        for (String s : ans) System.out.println(s);
        in.close();
    }
}