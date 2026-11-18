const numIslands = (grid) => {
  let countIslands = 0;
  let rows = grid.length;
  let columns = grid[0].length;
  let visited = new Set();

  // Visita tutta l'isola che contiene (startI, startJ).
  // Usa una pila esplicita invece della ricorsione: con una griglia 300x300
  // tutta di terra la ricorsione arriverebbe a 90.000 chiamate annidate
  // e andrebbe in "Maximum call stack size exceeded".
  const explore = (startI, startJ) => {
    const stack = [[startI, startJ]];

    while (stack.length > 0) {
      const [i, j] = stack.pop();

      // Casi in cui fermarsi: fuori griglia, acqua, già visitata.
      if (i < 0 || i >= rows || j < 0 || j >= columns) continue;
      if (grid[i][j] === "0") continue;
      if (visited.has(`${i},${j}`)) continue;

      visited.add(`${i},${j}`);

      // Ogni vicino verrà esplorato a sua volta, e così i vicini dei vicini.
      stack.push([i, j - 1]);
      stack.push([i, j + 1]);
      stack.push([i - 1, j]);
      stack.push([i + 1, j]);
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === "1" && !visited.has(`${i},${j}`)) {
        countIslands++;
        explore(i, j);
      }
    }
  }

  return countIslands;
};
