// Ottiene la media di tutti i numeri nell'array.
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;


// Ottiene una copia dell'array con .slice() senza argomenti e ordina in modo crescente.
// Ottiene il numero nel mezzo dell'array, se lunghezza è pari chiama la funzione getMean
//  con argomenti i due numeri che stanno nel mezzo ottendo la media di quei due numeri.
//  Altrimenti ottiene l'indice del numero medi arrotondando la lunghezza dell'array diviso 2,
//  e accede all'elemento nel mezzo.
const getMedian = (array) => {
    const sorted = array.slice().sort((a, b) => a - b);
    const median =
      array.length % 2 === 0
        ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
        : sorted[Math.floor(array.length / 2)];
    return median;
}


// Crea un oggetto vuoto per memorizzare le occorrenze.
// Loop attraverso ogni numero dell'array, associa la value 0 alla key se l'elemento non è presente nell'oggetto
//  count, altrimenti aggiunge 1 alla value della key già presente.
// Se il nuvo set, creato con le values di count ha solo una coppia key-value al suo interno, restituisce null.
// Memorizza nella variabile highest la key (il numero dell'array) con più occorrenze, riordinando l'array
//  e prendendo il primo elemento.
// Memorizza nella variabile mode la key per ottenere tutte le chiavi che hanno la stessa frequenza dell'elemento più frequente.
// restituisce mode in stringa dove ogni elemento è diviso da una virgola.
const getMode = (array) => {
    const counts = {};
    array.forEach((el) => {
      counts[el] = (counts[el] || 0) + 1;
    })
    if (new Set(Object.values(counts)).size === 1) {
      return null;
    }
    const highest = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a]
    )[0];
    console.log(highest)
    const mode = Object.keys(counts).filter(
      (el) => counts[el] === counts[highest]
    );
    return mode.join(", ");
}

//Trova la differenza tra il numero maggiore e quello minore nell'array usando lo spread operator.  
const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
}

// Calcola la media dell'array.
// Viene utilizzato il metodo reduce per iterare attraverso l'array e calcolare la somma 
//  delle differenze quadrate tra ciascun elemento e la media.
// La somma delle differenze quadrate viene divisa per la lunghezza dell'array per ottenere la varianza.
//
const getVariance = (array) => {
    const mean = getMean(array);
    const variance = array.reduce((acc, el) => {
        const difference = el - mean;
        const squared = difference ** 2;
        return acc + squared;
    }, 0) / array.length;
    return variance;
}


// Ottiene la varianza dell'array.
// Calcola la deviazione standard utilizzando la radice quadrata della varianza
// Restituisce la deviazione standard calcolata.
const getStandardDeviation = (array) => {
    const variance = getVariance(array);
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}


// Seleziona il valore del primo elemento con id #numbers.
// Divide la value trovata in un array di elementi stringa.
// Tramuta in numeri ogni stringa dell'array tenendo solo ciò che è numero.
// Ottiene tutti i risultati di ogni funzione precedente.
// Aggiorna tutti i testi con i risultati.
const calculate = () => {
    const value = document.querySelector("#numbers").value;
    const array = value.split(/,\s*/g);
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);

    document.querySelector("#mean").textContent = mean;
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;
}

const applyFunction = str => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = args => args.split(",").map(parseFloat);
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase() ? apply(fn, args) : match));
}

