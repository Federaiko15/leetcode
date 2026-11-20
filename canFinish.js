// 207. Course Schedule
// Si possono completare tutti i corsi <=> il grafo orientato dei prerequisiti
// NON contiene cicli. Cerco un ciclo con una DFS a tre colori.

const canFinish = (numCourses, prerequisites) => {
  // Grafo orientato come lista di adiacenza: freccia prereq -> course.
  // graphArray[i] = corsi che si sbloccano (anche) grazie al corso i.
  let graphArray = new Array(numCourses).fill(0).map(() => []);
  for (let [course, prereq] of prerequisites) {
    graphArray[prereq].push(course);
  }

  // Stato di ogni corso (indice = numero del corso):
  //   0 = bianco -> mai visto
  //   1 = grigio -> sta sul cammino che sto esplorando ADESSO
  //   2 = nero   -> esplorato fino in fondo: da lui non parte nessun ciclo
  let visited = new Array(numCourses).fill(0);

  // Restituisce true se, partendo da `course`, trova un ciclo.
  const hasCycle = (course) => {
    // Entro nel corso: da ora è sul cammino attuale.
    visited[course] = 1;

    for (let next of graphArray[course]) {
      // Il successore è sul cammino attuale: sono tornato indietro
      // lungo le frecce, quindi c'è un ciclo.
      if (visited[next] === 1) return true;

      // Mai visto: lo esploro. Se lì sotto c'è un ciclo, lo propago in su.
      if (visited[next] === 0 && hasCycle(next)) return true;

      // visited[next] === 2: già esplorato completamente da un'altra strada
      // (es. il 3 nel rombo). Sotto di lui non ci sono cicli, lo salto.
    }

    // Tutti i successori sono stati esplorati fino in fondo senza cicli:
    // esco dal cammino e lo segno come completato.
    visited[course] = 2;
    return false;
  };

  // Lancio la DFS da ogni corso ancora bianco, così copro anche le parti
  // del grafo non raggiungibili dagli altri corsi (es. "due parti separate").
  // Non serve controllare il grigio qui: quando hasCycle(i) torna senza
  // ciclo, tutti i nodi che ha toccato sono diventati neri.
  for (let i = 0; i < numCourses; i++) {
    if (visited[i] === 0 && hasCycle(i)) return false; // basta un ciclo
  }

  // Nessun ciclo in tutto il grafo: c'è un ordine valido per fare tutti i corsi.
  return true;
};

const findOrder = (numCourses, prerequisites) => {
  // Grafo orientato come lista di adiacenza: freccia prereq -> course.
  // graphArray[i] = corsi che si sbloccano (anche) grazie al corso i.
  let graphArray = new Array(numCourses).fill(0).map(() => []);
  for (let [course, prereq] of prerequisites) {
    graphArray[prereq].push(course);
  }

  // Stato di ogni corso (indice = numero del corso):
  //   0 = bianco -> mai visto
  //   1 = grigio -> sta sul cammino che sto esplorando ADESSO
  //   2 = nero   -> esplorato fino in fondo: da lui non parte nessun ciclo
  let visited = new Array(numCourses).fill(0);
  let finalResult = []; // ordine dei corsi da fare, in ordine inverso
  // Restituisce true se, partendo da `course`, trova un ciclo.
  const hasCycle = (course) => {
    // Entro nel corso: da ora è sul cammino attuale.
    visited[course] = 1;

    for (let next of graphArray[course]) {
      // Il successore è sul cammino attuale: sono tornato indietro
      // lungo le frecce, quindi c'è un ciclo.
      if (visited[next] === 1) return true;

      // Mai visto: lo esploro. Se lì sotto c'è un ciclo, lo propago in su.
      if (visited[next] === 0 && hasCycle(next)) return true;

      // visited[next] === 2: già esplorato completamente da un'altra strada
      // (es. il 3 nel rombo). Sotto di lui non ci sono cicli, lo salto.
    }

    // Tutti i successori sono stati esplorati fino in fondo senza cicli:
    // esco dal cammino e lo segno come completato.
    visited[course] = 2;
    finalResult.push(course);
    return false;
  };

  // Lancio la DFS da ogni corso ancora bianco, così copro anche le parti
  // del grafo non raggiungibili dagli altri corsi (es. "due parti separate").
  // Non serve controllare il grigio qui: quando hasCycle(i) torna senza
  // ciclo, tutti i nodi che ha toccato sono diventati neri.
  for (let i = 0; i < numCourses; i++) {
    if (visited[i] === 0 && hasCycle(i)) return []; // basta un ciclo
  }

  // Nessun ciclo in tutto il grafo: c'è un ordine valido per fare tutti i corsi.
  return finalResult.reverse();
};
