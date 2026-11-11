export const rob = (nums) => {
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

// questo problema  è lo stesso di house robber 1 ma aggiunge la clausola che la prima e l'ultima casa
// sono adiacenti tra di loro, perchè fomrano un cerchio.
// La soluzione è quindi quella di dividere il problema in due sottoproblemi: quello in cui non contiamo la prima casa, e quindi arriviamo alla fine
// e quello in cui non contiamo l'ultima casa, e quindi partiamo dalla prima. Questi due problemi infatti possono essere risolti con
// la funzione definita nel problema iniziale di house robber 1. Alla fine si prende il massimo tra i due risultati.
const rob2 = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let firstMax = rob(nums.slice(0, nums.length - 1));
  let secondMax = rob(nums.slice(1, nums.length));

  return Math.max(firstMax, secondMax);
};
