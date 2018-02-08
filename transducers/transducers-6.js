const doubleTheNumber = number => number * 2;

const doubleTwice = number => doubleTheNumber(doubleTheNumber(number))

const evenOnly = number => number % 2 === 0;

const log = (label, a) => console.log(label, a);

const filter = predicate => reducer => {
  return (acc, value) => {
    // we need to only return values that match the predicate
    if (predicate(value)) return reducer(acc, value);
    return acc;
  };
};

const isEvenFilter = filter(evenOnly);
const isNotTwoFilter = filter(val => val !== 2);

const map = xf => reducer => {
  return (acc, value) => {
    reducer(acc, xf(value));
    return acc;
  };
};

const pushReducer = (acc, value) => {
  acc.push(value);
  return acc;
}

const doubleMap = map(doubleTheNumber);

log('everything together', [1,2 ,3 ,4].reduce(isNotTwoFilter(isEvenFilter(doubleMap(pushReducer))), []));

/**
 * compose(f, g)(x) === f(g(x))
 * compose(isNotFilter, isEvenFilter, doubleMap)(pushReducer) === isNotFilter(isEvenFilter(doubleMap(pushReducer)))
 * In this example you might be wondering why we're not just passing the pushreducer as another argument in the composefunction. That's because we want our compose function to be a combinator. A combinator is a function which creates a new function with some relationships between the functions that were passed in. So, this compose function will have some baked in behavior of how these functions should interact. in our case calling each other from right to left and then calling again is when they are all actually called based on that relationship. In functional circles you might also hear this be called the b combinator or "bluebird"
 */


const compose = (...functions) =>
  functions.reduce((accumulation, fn) =>
    (...args) => accumulation(fn(...args), x => x))

// When we call it once we get an array of functions. Then we step through each of those functions with our reduce call. What we do inside there is we're folding in each function into another function which is our accumulation. So the first time we go through this our accumulation is our identity function x => x. And the first accumulation we'll be calling in ourselves which will be calling our accumulation which will be the identity function which our first function that we passed the args to. The the second time we go through will be our isEvenFilter which will be passed to our accumulation which at that stage is the identity function calling the isNotTwoFilter

console.log([1,2,3,4].reduce(compose(isNotTwoFilter, isEvenFilter, doubleMap)(pushReducer), []));

const compose = (...functions) =>
   functions.reduce((accumulation, fn) =>
     (...args) => accumulation(fn(...args), x => x));

const cleanNumbersXF = compose(isNotTwoFilter, isEvenFilter, doubleMap);
const cleanNumbersXF = compose(isNotTwoFilter, isEvenFilter, doubleMap);
[1, 2, 3, 4].reduceRight(
  cleanNumbersXF(pushReducer),
  [],
);
