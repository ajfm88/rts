/*
## Functions - Fundamentals

In TypeScript, functions can have typed parameters and return values, which provides static type checking and autocompletion support.
*/
function sayHi(name: string) {
  console.log(`Hello there ${name.toUpperCase()}`);
}

sayHi("Alex");
// sayHi(3);

function calculateDiscount(price: number): number {
  const hasDiscount = true;

  if (hasDiscount) {
    return price;
    // return "Discount Applied";
  }

  return price * 0.9;
}

const finalPrice = calculateDiscount(200);
console.log(finalPrice);

// "any" example
function addThree(number: any) {
  let anotherNumber: number = 3;
  return number + anotherNumber;
}
const result = addThree(2);
const someValue = result;

// run time error
someValue.myMethod();

// ## Challenge

// Create a new array of names.
const names: string[] = ["Mark", "Jane", "Jim", "Jill"];

// Write a new function that checks if a name is in your array. This function should take a name as a parameter and return a boolean.
function isNameInList(name: string): boolean {
  return names.includes(name);
}

// Use this function to check if various names are in your array and log the results.
let nameToCheck: string = "Jane";
if (isNameInList(nameToCheck)) {
  console.log(`${nameToCheck} is in the list.`);
} else {
  console.log(`${nameToCheck} is not in the list.`);
}
