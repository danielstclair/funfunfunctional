const doubleTheNumber = number => number * 2;

const doubleTwice = number => doubleTheNumber(doubleTheNumber(number))

const evenOnly = number => number % 2 === 0;

const log = (label, a) => console.log(label, a);

// The first abstraction we'll want to do is a decomposition where we want to remove the dependency of the array. We want this whole map function to be a reducer we can pass to reduce so instead of returning the result of this reduct we just want to return the actual reducer.
const decoratedMap = xf => (acc, value) => {
    // we need to make sure that we add a value after it's been transformed.
    acc.push(xf(value));
    return acc;
  };

// So now our functions have become decorators for a reducer.

const decoratedFilter = predicate => (acc, value) => {
    // we need to only return values that match the predicate
    if (predicate(value)) acc.push(value);
    return acc;
  };

// Now we're still getting our expected result but iterating over the array twice.
log([1,2,3,4]
  .reduce(decoratedFilter(evenOnly), [])
  .reduce(decoratedMap(doubleTheNumber), []));

// So let's hard code the filter operation to call our map operation
const filterThatDoubles = (predicate) => {
  return (acc, value) => {
    // we need to only return values that match the predicate
    if (predicate(value)) decoratedMap(doubleTheNumber)(acc, value);
    return acc;
  };
}

log('filterThatDoubles', [1,2,3,4].reduce(filterThatDoubles(evenOnly), [])); // this works but we don't want to be passing in map everytime.In order to avoid that we'll just paramaterize it.

const filter = predicate => reducer => {
  return (acc, value) => {
    // we need to only return values that match the predicate
    if (predicate(value)) reducer(acc, value);
    return acc;
  };
}

// So our filter function now takes a predicate which determines the logic for how we want to filter. Then it takes the inner reducer which determines how the logic should be build up. So once we call this function twice, we're left with the inner reducer that we've customized with the filtering logic and what we would like to do with the result. In writing this function that takes a reducer as it's argument and returning a reducer is our first transducer. It's a function that encapsulates some reducing behavior, in our case a filter, and lets the function consumer decide how the result should be built up by supplying it's inner reducer.
log('ultimate filter', [1,2,3,4].reduce(filter(evenOnly)(decoratedMap(doubleTheNumber)), []));

// Now let's see how well this all composes.
// Since we curried our function we get the opportunity to give our filter functions some meaningful names.

const isEvenFilter = filter(evenOnly);
const isNotTwoFilter = filter(val => val !== 2);

log('ultimate filter with composition', [1,2,3,4].reduce(filter(evenOnly)(decoratedMap(doubleTheNumber)), []));

const map = xf => reducer => {
  return (acc, value) => {
    // we need to make sure that we add a value after it's been transformed.
    reducer(acc, xf(value)); // the problem now is that this function expects an innermost reducer.
    return acc;
  };
};

// Our innermost reducer is going to push our values to the accumulation.
const pushReducer = (acc, value) => {
  acc.push(value);
  return acc;
}

const doubleMap = map(doubleTheNumber);

log('everything together', [1,2 ,3 ,4].reduce(isNotTwoFilter(isEvenFilter(doubleMap)), [])); // our composition is producing the values we expect
log('everything together', [1,2 ,3 ,4].reduce(isNotTwoFilter(isEvenFilter(doubleMap(pushReducer))), [])); // our composition is producing the values we expect

// Finally we can filter and map functions together while only iterating through our collections once. This works without a problem just because of how our reducer composition works. It works because our compositions take a reducer and then return another reducer. As we learned before a function that returns the same kind of output as it took in the input will compose naturally. 
// Retracing back our steps:
// pushReducer is passed in to doubleMap, but the call to double map returns a reducer - which in itself becomes the inner reducer to isEvenFilter which returns a reducer which becomes the inner reducer to isNot2Filter. (reducers all the way down) So our transducers are nothing more than functions that decorate our reducers in different ways.
