const maxLength = (nums) => {
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    let curProd = nums[i];
    let curGdc = nums[i];
    let curLcm = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      let newValue = nums[j];
      curProd *= newValue;
      if (curProd > 25200) {
        break;
      }
      curGdc = gcd(curGdc, newValue);
      curLcm = lcm(curLcm, newValue);
      if (curProd == curGdc * curLcm) {
        let length = j - i + 1;
        result = length > result ? length : result;
      }
    }
  }

  return result;
};

const gcd = (a, b) => {
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
};

const lcm = (a, b) => {
  if (a === 0 || b === 0) return 0;

  return Math.abs((a / gcd(a, b)) * b);
};
