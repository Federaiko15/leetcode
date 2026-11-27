const maximumSaleItems = (items, budget) => {
  const n = items.length;

  // 1. Valore della prima copia di ogni item.
  //    Parto da 1 (la copia comprata) e aggiungo 1 per ogni j != i
  //    tale che factor_i DIVIDE factor_j, cioè factor_j % factor_i === 0.
  //    (Due item con lo stesso factor si regalano a vicenda.)
  const value = new Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j !== i && items[j][0] % items[i][0] === 0) {
        value[i]++;
      }
    }
  }

  // 2. Zaino 0/1.
  //    dp[w] = massimo numero di copie (prime copie + regali) spendendo
  //    ESATTAMENTE w. Serve l'indice budget, quindi lunghezza budget + 1.
  //    Caso base: spendere 0 senza comprare nulla -> 0 copie.
  //    Gli altri importi all'inizio sono irraggiungibili -> -Infinity.
  const dp = new Array(budget + 1).fill(-Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    const price = items[i][1];

    // w DECRESCENTE: dp[w - price] è ancora il valore "senza l'item i",
    // quindi ogni prima copia viene presa al massimo una volta.
    // Mi fermo a w = price: sotto non posso permettermi l'item i
    // (w - price sarebbe negativo).
    for (let w = budget; w >= price; w--) {
      dp[w] = Math.max(
        dp[w], //                     non prendo i
        dp[w - price] + value[i], //   prendo i: prima avevo speso w - price
      );
    }
  }

  // 3. Risposta: per ogni spesa esatta w, i soldi avanzati (budget - w)
  //    li uso in copie extra dell'item più economico.
  //    Questo si fa DOPO lo zaino: dentro il ciclo non sai ancora quanto avanza.
  //    Se dp[w] è -Infinity la somma resta -Infinity e viene scartata da sola.
  let minPrice = Infinity;
  for (const [, price] of items) minPrice = Math.min(minPrice, price);

  let best = 0;
  for (let w = 0; w <= budget; w++) {
    best = Math.max(best, dp[w] + Math.floor((budget - w) / minPrice));
  }
  return best;
};
