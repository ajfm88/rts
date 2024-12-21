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

// ## Practical Application of Type Annotation

const books = ["1984", "Brave New World", "Fahrenheit 451"];

let foundBook: string | undefined;

for (let book of books) {
  if (book === "1984") {
    foundBook = book;
    foundBook = foundBook.toUpperCase();
    break;
  }
}

console.log(foundBook?.length);

// The reason to explicitly type foundBook as string | undefined is to make it clear to anyone reading the code
// (including your future self) that foundBook might be undefined at runtime. This is a good practice in TypeScript
// because it helps prevent bugs related to undefined values.

// ## Challenge

// - Create a variable orderStatus of type 'processing' | 'shipped' | 'delivered' and assign it the value 'processing'.
// Then, try to assign it the values 'shipped' and 'delivered'.
// - Create a variable discount of type number | string and assign it the value 20. Then, try to assign it the value '20%'.

// 1. Order Status
let orderStatus: "processing" | "shipped" | "delivered" = "processing";
orderStatus = "shipped";
orderStatus = "delivered";
// orderStatus = 'cancelled'; // This will result in a TypeScript error

// 2. Discount
let discount: number | string = 20;
discount = "20%";
// discount = true; // This will result in a TypeScript error

// ## Arrays - Fundamentals

// In TypeScript, arrays are used to store multiple values in a single variable.
// You can define the type of elements that an array can hold using type annotations.

let prices: number[] = [100, 75, 42];

let fruit: string[] = ["apple", "orange"];
// fruit.push(1);
// let people: string[] = ['bobo', 'peter', 1];
//
// be careful "[]" means literally empty array
// let randomValues: [] = [1];

// be careful with inferred array types
// let names = ['peter', 'susan'];
// let names = ['peter', 'susan', 1];
let array: (string | boolean)[] = ["apple", true, "orange", false];

// ## Challenge

// - Create an array temperatures of type number[] and assign it some values. Then, try to add a string value to it.
// - Create an array colors of type string[] and assign it some values. Then, try to add a boolean value to it.
// - Create an array mixedArray of type (number | string)[] and assign it some values. Then, try to add a boolean value to it.

// 1. Temperatures
let temperatures: number[] = [20, 25, 30];
// temperatures.push('hot'); // This will result in a TypeScript error

// 2. Colors
let colors: string[] = ["red", "green", "blue"];
// colors.push(true); // This will result in a TypeScript error

// 3. Mixed Array
let mixedArray: (number | string)[] = [1, "two", 3];
// mixedArray.push(true); // This will result in a TypeScript error

// ## Objects - Fundamentals

// In TypeScript, an object is a collection of key-value pairs with specified types for each key,
// providing static type checking for properties.

let car: { brand: string; year: number } = { brand: "toyota", year: 2020 };
car.brand = "ford";
// car.color = 'blue';

let car1: { brand: string; year: number } = { brand: "audi", year: 2021 };
// let car2: { brand: string; year: number } = { brand: 'audi' };

let book = { title: "book", cost: 20 };
let pen = { title: "pen", cost: 5 };
let notebook = { title: "notebook" };

let items: { readonly title: string; cost?: number }[] = [book, pen, notebook];

items[0].title = "new book"; // Error: Cannot assign to 'title' because it is a read-only property

// ## Challenge

// - Create an object bike of type { brand: string, year: number } and assign it some values. Then, try to assign a string to the year property.
// - Create an object laptop of type { brand: string, year: number } and try to assign an object with missing year property to it.
// - Create an array products of type { title: string, price?: number }[] and assign it some values. Then, try to add an object with a price property of type string to it.

// 1. Bike
let bike: { brand: string; year: number } = { brand: "Yamaha", year: 2010 };
// bike.year = 'old'; // This will result in a TypeScript error

// 2. Laptop
let laptop: { brand: string; year: number } = { brand: "Dell", year: 2020 };
// let laptop2: { brand: string, year: number } = { brand: 'HP' }; // This will result in a TypeScript error

// 3. Products
let product1 = { title: "Shirt", price: 20 };
let product2 = { title: "Pants" };
let products: { title: string; price?: number }[] = [product1, product2];
// products.push({ title: 'Shoes', price: 'expensive' }); // This will result in a TypeScript error

// ## Functions - Fundamentals

// In TypeScript, functions can have typed parameters and return values, which provides static type checking and autocompletion support.

function sayHi(name: string) {
  console.log(`Hello there ${name.toUpperCase()}!!!`);
}

sayHi("john");
// sayHi(3)
// sayHi('peter', 'random');

function calculateDiscount(price: number): number {
  // price.toUpperCase();
  const hasDiscount = true;
  if (hasDiscount) {
    return price;
    // return 'Discount Applied';
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
