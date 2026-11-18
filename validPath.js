const validPath = (n, edges, source, destination) => {
  let graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (let [u, v] of edges) {
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  let visited = new Set();
  let stack = [source];

  while (stack.length > 0) {
    let node = stack.pop();
    if (node === destination) return true;
    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph.get(node)) {
        stack.push(neighbor);
      }
    }
  }
  return false;
};
