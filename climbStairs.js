const climbStairs = (n, costs) => {
  let arrayCosti = new Array(n + 1).fill(Infinity);
  arrayCosti[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k <= 3; k++) {
      let i = j - k;
      if (i >= 0) {
        arrayCosti[j] = Math.min(
          arrayCosti[j],
          arrayCosti[i] + costs[j - 1] + k * k,
        );
      }
    }
  }
  return arrayCosti[n];
};

const climbStairsBase = (n) => {
  // ways[i] = numero di modi diversi per arrivare allo step i
  const ways = new Array(n + 1).fill(0);
  ways[0] = 1; // caso base: un solo modo per "stare" allo step 0 (non muoversi)

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= 2; j++) { // salto da 1 o da 2
      const from = i - j; // step di provenienza
      if (from >= 0) {
        // ogni cammino che arriva a `from` diventa un cammino verso i
        ways[i] += ways[from];
      }
    }
  }
  return ways[n];
};
