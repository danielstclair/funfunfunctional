// a reducer is a function that takes an accumulation and a value and then couple it into another accumulation

const reducer = (accumulation, value) => accumulation + value;

console.log(reducer(10, 15));
console.log(reducer('hello', ' daniel'));

// // Reducers are not necessarily coupled with iteration though they do together happen often.
console.log([1, 2, 3, 4, 5].reduce(reducer));

const objReducer = (acc, obj) => ({
  ...acc,
  ...obj,
})

const user = {
  name: 'Daniel',
  email: 'daniel@test.test',
};

console.log(objReducer(user, { favoriteColor: 'green' }));

const setReducer = (acc, val) => acc.add(val);

const mySet = new Set([1,2,3,4]);

console.log(setReducer(mySet, 4));

// The .reduce function only needs the function as it's argument. All it really does is handle the iteration for us.
// Our reducers are just simple functions that take in an accumulation and a value and return a new accumulation.
// The return type of the new accumulation needs to match the type of the accumulation initially passed in.
// With that in mind, it's really the function bodies of our reducers that couple us to the types of collections and values we can work with.
