const rob = (nums) => {
  if (nums.length === 0) return 0;
  let total = new Array(nums.length).fill(0);
  total[0] = nums[0];
  total[1] = Math.max(nums[0], nums[1]);
  if (nums.length === 1) return total[0];
  if (nums.length === 2) return Math.max(total[0], total[1]);
  for (let i = 2; i < nums.length; i++) {
    total[i] = Math.max(total[i - 1], total[i - 2] + nums[i]);
  }
  return total[nums.length - 1];
};
