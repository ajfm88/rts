/*
## Functions - Optional and Default Parameters

In TypeScript, a default parameter value is an alternative to an optional parameter. 
When you provide a default value for a parameter, you're essentially making it optional 
because you're specifying a value that the function will use if no argument is provided 
for that parameter.

However, there's a key difference between a parameter with a default value and an optional 
parameter. If a parameter has a default value, and you call the function without providing 
an argument for that parameter, the function will use the default value. But if a parameter 
is optional (indicated with a ?), and you call the function without providing an argument 
for that parameter, the value of the parameter inside the function will be undefined.

- a function with optional parameters must work when they are not supplied
*/
function calculatePrice(price: number, discount?: number) {
  return price - (discount || 0);
}

let priceAfterDiscount = calculatePrice(100, 20);
console.log(priceAfterDiscount); // Output: 80

let priceWithoutDiscount = calculatePrice(300);
console.log(priceWithoutDiscount); // Output: 300

function calculateScore(initialScore: number, penaltyPoints: number = 0) {
  return initialScore - penaltyPoints;
}

let scoreAfterPenalty = calculateScore(100, 20);
console.log(scoreAfterPenalty); // Output: 80

let scoreWithoutPenalty = calculateScore(300);
console.log(scoreWithoutPenalty); // Output: 300

/*
## Function - rest parameter

In JavaScript, a rest parameter is denoted by three dots (...) before the parameter's name 
and allows a function to accept any number of arguments. These arguments are collected into 
an array, which can be accessed within the function.
*/
function sum(message: string, ...numbers: number[]): string {
  const doubled = numbers.map((num) => num * 2);
  console.log(doubled);

  let total = numbers.reduce((previous, current) => {
    return previous + current;
  }, 0);
  return `${message} ${total}`;
}

let result = sum("The total is:", 1, 2, 3, 4, 5); // result will be "The total is: 15"

/*
## Functions - "void" return type

In TypeScript, void is a special type that represents the absence of a value. When used as a 
function return type, void indicates that the function does not return a value.
*/
function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hello, TypeScript!"); // Output: Hello, TypeScript!

/*
It's important to note that in TypeScript, a function that is declared with a void return 
type can still return a value, but the value will be ignored.For example, the following 
code is valid TypeScript:
*/
function logMessage2(message: string): void {
  console.log(message);
  return "This value is ignored";
}

logMessage2("Hello, TypeScript!"); // Output: Hello, TypeScript!
