const cloneGraph = (node) => {
  if (!node) return null;

  // originale -> copia. Se un nodo è nella Map, la sua copia esiste
  // ed è già stato messo in pila (una volta sola).
  let checkedMap = new Map();
  checkedMap.set(node, new _Node(node.val));

  let stack = [node];

  while (stack.length > 0) {
    let currentNode = stack.pop(); // originale
    let currentCopy = checkedMap.get(currentNode); // la sua copia, già creata

    currentCopy.neighbors = currentNode.neighbors.map((neighbor) => {
      if (!checkedMap.has(neighbor)) {
        // Prima volta che incontro questo vicino: creo la copia e lo metto in pila.
        checkedMap.set(neighbor, new _Node(neighbor.val));
        stack.push(neighbor);
      }
      return checkedMap.get(neighbor);
    });
  }

  return checkedMap.get(node);
};
