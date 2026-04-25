/*
## Challenge - "Truthy"/"Falsy" guard
In TypeScript, "Truthy"/"Falsy" guard is a simple check for a truthy or falsy value
*/

// - Define a function named printLength that takes one parameter str which can be of
// type string, null, or undefined.
function printLength(str: string | null | undefined) {
  // - Inside the function, use an if statement to check if str is truthy. In JavaScript
  // and TypeScript, a truthy value is a value that is considered true when encountered
  // in a Boolean context. All values are truthy unless they are defined as falsy
  // (i.e., except for false, 0, -0, 0n, "", null, undefined, and NaN).
  if (str) {
    // - If str is truthy, it means it's a string (since null and undefined are falsy).
    // In this case, log the length of str using the length property of the string.
    console.log(str.length);
  } else {
    // - If str is not truthy (i.e., it's either null or undefined), log the string 'No string provided'.
    console.log("No string provided");
  }
}
// - Now you can call the printLength function with a string, null, or undefined as the argument.
// The function will print the length of the string if a string is provided, or 'No string provided' otherwise.
printLength("Hello"); // Outputs: 5
printLength(null); // Outputs: No string provided
printLength(undefined); // Outputs: No string provided

/*
## Challenge - "instanceof" type guard
The instanceof type guard is a way in TypeScript to check the specific class or constructor function of an 
object at runtime. It returns true if the object is an instance of the class or created by the constructor 
function, and false otherwise.
*/
try {
  // Some code that may throw an error
  throw new Error("This is an error");
} catch (error) {
  if (error instanceof Error) {
    console.log("Caught an Error object: " + error.message);
  } else {
    console.log("Caught an unknown error");
  }
}

// - Start by defining the function using the function keyword followed by the function name, in this case checkInput.
// - Define the function's parameter. The function takes one parameter, input, which can be of type Date or string.
// This is denoted by input: Date | string.
function checkInput(input: Date | string): string {
  // - Inside the function, use an if statement to check if the input is an instance of Date. This is done using the instanceof operator.
  if (input instanceof Date) {
    // - If the input is an instance of Date, return the year part of the date as a string.
    // This is done by calling the getFullYear method on the input and then converting it to a string using the toString method.
    return input.getFullYear().toString();
  } else {
    // - If the input is not an instance of Date (which means it must be a string), return the input as it is.
    return input;
  }
}
// - After defining the function, you can use it by calling it with either a Date or a string as the argument.
// The function will return the year part of the date if a Date is passed, or the original string if a string is passed.
// - You can store the return value of the function in a variable and then log it to the console to see the result.
const year = checkInput(new Date());
const random = checkInput("2020-05-05");
console.log(year);
console.log(random);
