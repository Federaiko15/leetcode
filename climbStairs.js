const climbStairs = (n, costs) => {
  let arrayCosti = [0];
  arrayCosti.push(0);
  for (let j = 0; j < costs.length; j++) {
    for (let k = 1; k <= 3; k++) {
      let i = j - k;
      if (i >= 0) {
        arrayCosti[j] = Math.min(arrayCosti[j], arrayCosti[i - 1] + k * k);
      }
    }
  }
  return arrayCosti[n];
};
