import { rob } from "./houseRobber.js";

const deleteAndEarn = (nums) => {
  let table = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!table.has(nums[i])) {
      table.set(nums[i], 1);
    } else {
      let value = table.get(nums[i]);
      table.set(nums[i], value + 1);
    }
  }

  let maxKey = Math.max(...table.keys());
  let soldi = new Array(maxKey + 1).fill(0);
  for (const key of table.keys()) {
    soldi[key] = table.get(key) * key;
  }

  return rob(soldi);
};
