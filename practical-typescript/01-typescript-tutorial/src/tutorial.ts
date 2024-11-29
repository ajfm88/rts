// Type Annotations
// TypeScript Type Annotations allow developers to specify the types of variables, function parameters, return types, and object properties.

let awesomeName: string = "shakeAndBake";
awesomeName = "something";
awesomeName = awesomeName.toUpperCase();
// awesomeName = 20;

// console.log(awesomeName);

let amount: number = 12;
amount = 12 - 1;
// amount = 'pants';

let isAwesome: boolean = true;
isAwesome = false;
// isAwesome = 'shakeAndBake';

// Type Inference
// The typescript compiler can infer the type of the variable based on the literal value that is assigned when it is defined.
// Just make sure you are working in the typescript file 😄

// Challenge

//- Create a variable of type string and try to invoke a string method on it.
//- Create a variable of type number and try to perform a mathematical operation on it.
//- Create a variable of type boolean and try to perform a logical operation on it.
//- Try to assign a value of a different type to each of these variables and observe the TypeScript compiler's response.
//- You can use type annotation or inference

// 1. String
let greeting: string = "Hello, TypeScript!";
greeting = greeting.toUpperCase();

// 2. Number
let age: number = 25;
age = age + 5;

// 3. Boolean
let isAdult: boolean = age >= 18;
isAdult = !isAdult;

// 4. Assigning different types
// Uncommenting any of these will result in a TypeScript error
// greeting = 10; // Error: Type 'number' is not assignable to type 'string'
// age = "thirty"; // Error: Type 'string' is not assignable to type 'number'
// isAdult = "yes"; // Error: Type 'string' is not assignable to type 'boolean'

// ## Setup Info

// - even with error you can run the project but you won't be able to build it "npm run build"

// ## Union Type

// In TypeScript, a Union Type allows a variable to hold a value of multiple, distinct types, specified using
// the | operator. It can also be used to specify that a variable can hold one of several specific values. More examples are coming up.

let tax: number | string = 10;
tax = 100;
tax = "$10";

// fancy name - literal value type
let requestStatus: "pending" | "success" | "error" = "pending";
requestStatus = "success";
requestStatus = "error";
// requestStatus = 'random';

// ## Type - "any"

// In TypeScript, the "any" type is a powerful way to work with existing JavaScript, allowing you to opt-out of type-checking and
// let the values pass through compile-time checks. It means a variable declared with the any type can hold a value of any type.
// Later will also cover - "unknown" and "never"

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let random;
