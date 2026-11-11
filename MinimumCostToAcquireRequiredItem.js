const minimumCost = (cost1, cost2, costBoth, need1, need2) => {
  let totalCost = 0;
  if (costBoth < cost1 + cost2) {
    let minNeeded = Math.min(need1, need2);
    totalCost += minNeeded * costBoth;
    need1 -= minNeeded;
    need2 -= minNeeded;
  }
  totalCost += need1 * Math.min(cost1, costBoth);
  totalCost += need2 * Math.min(cost2, costBoth);
  return totalCost;
};
