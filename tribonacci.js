const tribonacci = (n) => {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  let finalArray = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    newValue = finalArray[i - 1] + finalArray[i - 2] + finalArray[i - 3];
    finalArray.push(newValue);
  }
  return finalArray[n];
};
