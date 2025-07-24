import java.util.*;

public class Main {
    public static void solution(int N, String P) {
        int[] prefixS = new int[N + 1]; // Count of 'S' before index i
        int[] suffixW = new int[N + 1]; // Count of 'W' after index i

        // Compute prefix count of 'S'
        for (int i = 1; i <= N; i++) {
            prefixS[i] = prefixS[i - 1] + (P.charAt(i - 1) == 'S' ? 1 : 0);
        }

        // Compute suffix count of 'W'
        for (int i = N - 1; i >= 0; i--) {
            suffixW[i] = suffixW[i + 1] + (P.charAt(i) == 'W' ? 1 : 0);
        }

        // Find the minimum transformations required
        int minFlips = Integer.MAX_VALUE;
        for (int i = 0; i <= N; i++) {
            minFlips = Math.min(minFlips, prefixS[i] + suffixW[i]);
        }

        System.out.println(minFlips);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();  // Read integer N
        String P = sc.next();  // Read the string P
        sc.close();
        solution(N, P);
    }
}


