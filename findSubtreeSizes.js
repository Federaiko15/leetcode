const findSubtreeSizes = (parent, s) => {
  let children = new Array(parent.length).fill(0).map(() => []);
  for (let i = 0; i < parent.length; i++) {
    if (parent[i] !== -1) {
      children[parent[i]].push(i);
    }
  }

  let letters = new Array(26).fill(0).map(() => []);
  const dfs = (node) => {
    const c = s.charCodeAt(node) - 97;
    if (letters[c].length !== 0) {
      parent[node] = letters[c][letters[c].length - 1];
    }
    letters[c].push(node);
    for (const child of children[node]) {
      dfs(child);
    }

    letters[c].pop();
  };

  dfs(0);

  // Ricostruisco children sul NUOVO albero: liste nuove e vuote,
  // altrimenti i figli dell'albero vecchio resterebbero dentro.
  children = new Array(parent.length).fill(0).map(() => []);
  for (let i = 0; i < parent.length; i++) {
    if (parent[i] !== -1) {
      children[parent[i]].push(i);
    }
  }

  const answer = new Array(parent.length).fill(0);

  // size(node) = 1 (il nodo stesso) + somma delle dimensioni dei figli.
  // Su una foglia il ciclo non gira e restituisce 1: nessun if necessario.
  const size = (node) => {
    let total = 1;
    for (const child of children[node]) {
      total += size(child); // post-order: prima calcolo i figli, poi li uso
    }
    answer[node] = total;
    return total;
  };

  size(0);
  return answer;
};
