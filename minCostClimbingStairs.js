const minCostClimbingStairs = (cost) => {
  let finalArray = new Array(cost.length).fill(Infinity);
  finalArray[0] = cost[0];
  finalArray[1] = cost[1];

  for (let i = 2; i < cost.length; i++) {
    for (let k = 1; k <= 2; k++) {
      let j = i - k;
      if (j >= 0) {
        finalArray[i] = Math.min(finalArray[i], finalArray[j] + cost[i]);
      }
    }
  }
  return Math.min(finalArray[cost.length - 1], finalArray[cost.length - 2]);
};
