/**To understand why transducers are useful, we first have to understand the problem of chaining operations when iterating through arrays */
// Some performance tests:

// This just generates arrays up to a length
const arrayOfRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) =>
    Math.floor(Math.random() * randomCeil));

// This tells us how long a certain function might take
const timeIt = (label, fn) => {
  console.time(label);
  fn();
  console.timeEnd(label);
};

const arrOfThousand = arrayOfRandoms(100)(1000);
const arrOfMillion = arrayOfRandoms(100)(1e6);
// 1e6 is a scientific literal and it multiplies a number by ten and raises it to a given power
// 1e6 === 1 * 10 ** 6 ie how many zeros do I want to have

// Let's say that a business requirement is to triple our values and then only include those that are even
const resultFrom1000 = arrOfThousand
  .map(val => val * 3) // we'll be using these a few times so let's extract them into their own functions
  .filter(val => val % 2 === 0);

const tripleIt = val => val * 3;
const isEven = val => val % 2 === 0;

timeIt('thousand - map', () => {
  arrOfThousand
    .map(tripleIt)
});

timeIt('thousand - map & filter', () => {
  arrOfThousand
    .map(tripleIt)
    .filter(isEven)
});


timeIt('million - map', () => {
  arrOfMillion
    .map(tripleIt)
});

timeIt('million - map & filter', () => {
  arrOfMillion
    .map(tripleIt)
    .filter(isEven)
});

/**as the array grows the difference becomes far greater. This is because map is going through each item in the array and filter restarts from the beginning, going through it twice. How can we gain the benefits of this operation and only go through the array once in order to increase our performance? Here we might bring in our good old fashoined imperative problem solving skills */

timeIt('million - imperative', () => {
  const result = []
  arrOfMillion
    .forEach(val => {
      const tripled = tripleIt(val);
      if (isEven(tripled)) result.push(tripled);
    });
});

// we see that the result is better performance, but our code quality suffers a little. Wouldn't it be great if we could keep all of our operations happenning seperately but still only iterate over the array once? This is where transducers are going to save us from our misery.
