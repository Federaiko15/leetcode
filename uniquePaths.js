const uniquePaths = (m, n) => {
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(1)); // inizializza la griglia con 1
  dp[0][0] = 1; // punto di partenza
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]; // somma i percorsi dall'alto e da sinistra
    }
  }
  return dp[m - 1][n - 1]; // ritorna il numero di percorsi unici
};
