const doubleTheNumber = number => number * 2;

// console.log([1,2,3,4].map(doubleTheNumber))

const doubleTwice = number => doubleTheNumber(doubleTheNumber(number))
// we're now iterating through a collection once but with a composed transform.
// console.log([1,2,3,4].map(doubleTwice));

// Let's see how far we can take this and return only evens
const evenOnly = number => number % 2 === 0;

// This isn't going to work. Because evenOnly is going to produce the value true or false and doubleTheNumber is going to try and double that. So we have a mismatch in our signatures. The built in filter takes a predicate and the built in map takes a transform.
const doublesAndEven = number => doubleTheNumber(evenOnly(number));

// console.log([1,2,3,4].map(doublesAndEven));

// console.log(true * 2)

// We need a way for map and filter to have some kind of shared commonality. Like an internal hook where we can be involved in how this value gets added to the array. Enter reduce
// Let's derive map from reduce
const map = (xf, array) => {
  return array.reduce((acc, value) => {
    // We need to make sure that we add a value after it's been transformed.
    acc.push(xf(value));
    return acc;
  }, [])
};

console.log(map(doubleTheNumber, [1,2,3,4]));

const filter = (predicate, array) => {
  return array.reduce((acc, value) => {
    // we need to only return values that match the predicatee
    if (predicate(value)) acc.push(value);
    return acc;
  }, [])
}

// console.log(filter(evenOnly, [1, 2, 3, 4]))
