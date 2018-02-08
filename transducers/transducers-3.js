// A transformer is a function that is given a value and then returns a new representation of that value

const myString = 'hello';

console.log(myString.toUpperCase());
const toUpper = str => str.toUpperCase();
console.log('toUpper: ', toUpper(myString));
console.log('myString: ', myString);
const shout = str => `${str}!!`;
console.log('shout: ', shout(myString));
// toUpper is being passed the function shout being passed the string. These functions are easily composable so long as the input and output types remain the same.
// It doesn't matter if the argument is a string or a function that produces a string or a function that produces a function that produces a string. So long as the ultimate outcome is a string.
const scream = str => toUpper(shout(str));
console.log('scream: ', scream(myString));
