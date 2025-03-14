/*
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

// ## Challenge

// - Create a new array of names.
// - Write a new function that checks if a name is in your array. This function should take a name as a parameter and return a boolean.
// - Use this function to check if various names are in your array and log the results.

const names: string[] = ["John", "Jane", "Jim", "Jill"];

function isNameInList(name: string): boolean {
  return names.includes(name);
}

let nameToCheck: string = "Jane";
if (isNameInList(nameToCheck)) {
  console.log(`${nameToCheck} is in the list.`);
} else {
  console.log(`${nameToCheck} is not in the list.`);
}

// ## Functions - Optional and Default Parameters

// In TypeScript, a default parameter value is an alternative to an optional parameter. When you provide a default value for a parameter,
// you're essentially making it optional because you're specifying a value that the function will use if no argument is provided for that parameter.

// However, there's a key difference between a parameter with a default value and an optional parameter. If a parameter has a default value,
// and you call the function without providing an argument for that parameter, the function will use the default value. But if a parameter is optional
// (indicated with a ?), and you call the function without providing an argument for that parameter, the value of the parameter inside the function
// will be undefined.

// - a function with optional parameters must work when they are not supplied

function calculatePrice(price: number, discount?: number) {
  return price - (discount || 0);
}

let priceAfterDiscount = calculatePrice(100, 20);
console.log(priceAfterDiscount); // Output: 80

let priceWithoutDiscount = calculatePrice(300);
console.log(priceWithoutDiscount); // Output: 300

function calculateScore(
  initialScore: number,
  penaltyPoints: number = 0
): number {
  return initialScore - penaltyPoints;
}

let scoreAfterPenalty = calculateScore(100, 20);
console.log(scoreAfterPenalty); // Output: 80

let scoreWithoutPenalty = calculateScore(300);
console.log(scoreWithoutPenalty); // Output: 300

// ## Function - Rest Parameter

// In JavaScript, a rest parameter is denoted by three dots (...) before the parameter's name and allows a function to accept any number of arguments.
// These arguments are collected into an array, which can be accessed within the function.

function sum(message: string, ...numbers: number[]): string {
  const doubled = numbers.map((num) => num * 2);
  console.log(doubled);

  let total = numbers.reduce((previous, current) => {
    return previous + current;
  }, 0);
  return `${message} ${total}`;
}

let result = sum("The total is:", 1, 2, 3, 4, 5); // result will be "The total is: 15"

// ## Functions - "void" return type

// In TypeScript, void is a special type that represents the absence of a value. When used as a function return type, void indicates that the function does not return a value.

function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hello, TypeScript!"); // Output: Hello, TypeScript!

// It's important to note that in TypeScript, a function that is declared with a void return type can still return a value, but the value will be ignored.
// For example, the following code is valid TypeScript:

function logMessage(message: string): void {
  console.log(message);
  return "This value is ignored";
}

logMessage("Hello, TypeScript!"); // Output: Hello, TypeScript!

// ## Functions - Using Union Types as Function Parameters

// ### Challenge

// Your task is to create a function named processInput that accepts a parameter of a union type string | number. The function should behave as follows:

// - If the input is of type number, the function should multiply the number by 2 and log the result to the console.
// - If the input is of type string, the function should convert the string to uppercase and log the result to the console.

function processInput(input: string | number) {
  if (typeof input === "number") {
    console.log(input * 2);
  } else {
    console.log(input.toUpperCase());
  }
}

processInput(10); // Output: 20
processInput("Hello"); // Output: HELLO

// In this example, the processInput function takes a parameter input that can be either a string or a number. Inside the function, we use a type guard
// (typeof input === 'number') to check the type of input at runtime. If input is a number, we double it. If input is a string, we convert it to uppercase.

//## Functions - Using Objects as Function Parameters

function createEmployee({ id }: { id: number }): {
  id: number;
  isActive: boolean;
} {
  return { id, isActive: id % 2 === 0 };
}

const first = createEmployee({ id: 1 });
const second = createEmployee({ id: 2 });
console.log(first, second);

// alternative
function createStudent(student: { id: number; name: string }) {
  console.log(`Welcome to the course ${student.name.toUpperCase()}!!!`);
}

const newStudent = {
  id: 5,
  name: "anna",
};

createStudent(newStudent);

// ## Gotcha - Excess Property Checks

function createStudent(student: { id: number; name: string }) {
  console.log(`Welcome to the course ${student.name.toUpperCase()}!!!`);
}

const newStudent = {
  id: 5,
  name: "anna",
  email: "anna@gmail.com",
};

createStudent(newStudent);
createStudent({ id: 1, name: "bob", email: "bob@gmail.com" });

// TypeScript only performs excess property checks on object literals where they're used, not on references to them.

// In TypeScript, when you pass an object literal (like { id: 1, name: 'bob', email: 'bob@gmail.com' }) directly to a function or assign it to a variable with a
// specified type, TypeScript checks that the object only contains known properties. This is done to catch common errors.

// However, when you pass newStudent to createStudent, TypeScript doesn't complain about the email property. This is because newStudent is not an object literal
// at the point where it's passed to createStudent.

## Challenge

Your task is to create a function named processData that accepts two parameters:

- The first parameter, input, should be a union type that can be either a string or a number.
- The second parameter, config, should be an object with a reverse property of type boolean, by default it "reverse" should be false

The function should behave as follows:

- If input is of type number, the function should return the square of the number.
- If input is of type string, the function should return the string in uppercase.
- If the reverse property on the config object is true, and input is a string, the function should return the reversed string in uppercase.

function processData(
  input: string | number,
  config: { reverse: boolean } = { reverse: false }
): string | number {
  if (typeof input === "number") {
    return input * input;
  } else {
    return config.reverse
      ? input.toUpperCase().split("").reverse().join("")
      : input.toUpperCase();
  }
}

console.log(processData(10)); // Output: 100
console.log(processData("Hello")); // Output: HELLO
console.log(processData("Hello", { reverse: true })); // Output: OLLEH

// ## Type Alias

// A type alias in TypeScript is a new name or shorthand for an existing type, making it easier to reuse complex types. However, it's important
// to note that it doesn't create a new unique type - it's just an alias.All the same rules apply to the aliased type, including the ability to
// mark properties as optional or readonly.

const john: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "john",
  isActive: true,
};
const susan: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser(user: { id: number; name: string; isActive: boolean }): {
  id: number;
  name: string;
  isActive: boolean;
} {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}

// Same code, but with type alias implemented:

type User = { id: number; name: string; isActive: boolean };

const john: User = {
  id: 1,
  name: "john",
  isActive: true,
};
const susan: User = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}

// Additional example of type alias

type StringOrNumber = string | number; // Type alias for string | number

let value: StringOrNumber;
value = "hello"; // This is valid
value = 123; // This is also valid

type Theme = "light" | "dark"; // Type alias for theme

let theme: Theme;
theme = "light"; // This is valid
theme = "dark"; // This is also valid

// Function that accepts the Theme type alias
function setTheme(t: Theme) {
  theme = t;
}

setTheme("dark"); // This will set the theme to 'dark'

// ## Challenge

// - Define the Employee type: Create a type Employee with properties id (number), name (string), and department (string).

// - Define the Manager type: Create a type Manager with properties id (number), name (string), and employees (an array of Employee).

// - Create a Union Type: Define a type Staff that is a union of Employee and Manager.

// - Create the printStaffDetails function: This function should accept a parameter of type Staff. Inside the function, use a type guard to
// check if the 'employees' property exists in the passed object. If it does, print a message indicating that the person is a manager and the
// number of employees they manage. If it doesn't, print a message indicating that the person is an employee and the department they belong to.

// - Create Employee and Manager objects: Create two Employee objects. One named alice and second named steve. Also create a Manager object
// named bob who manages alice and steve.

// - Test the function: Call the printStaffDetails function with alice and bob as arguments and verify the output.

type Employee = { id: number; name: string; department: string };
type Manager = { id: number; name: string; employees: Employee[] };

type Staff = Employee | Manager;

function printStaffDetails(staff: Staff) {
  if ("employees" in staff) {
    console.log(
      `${staff.name} is a manager of ${staff.employees.length} employees.`
    );
  } else {
    console.log(
      `${staff.name} is an employee in the ${staff.department} department.`
    );
  }
}

const alice: Employee = { id: 1, name: "Alice", department: "Sales" };
const steve: Employee = { id: 1, name: "Steve", department: "HR" };
const bob: Manager = { id: 2, name: "Bob", employees: [alice, steve] };

printStaffDetails(alice); // Outputs: Alice is an employee in the Sales department.
printStaffDetails(bob);

// ## Intersection Types

// In TypeScript, an intersection type (TypeA & TypeB) is a way of combining multiple types into one. This means that an object of an intersection type will have
// all the properties of TypeA and all the properties of TypeB. It's a way of creating a new type that merges the properties of existing types.

type Book = { id: number; name: string; price: number };
type DiscountedBook = Book & { discount: number };

const book1: Book = {
  id: 2,
  name: "How to Cook a Dragon",
  price: 15,
};

const book2: Book = {
  id: 3,
  name: "The Secret Life of Unicorns",
  price: 18,
};

const discountedBook: DiscountedBook = {
  id: 4,
  name: "Gnomes vs. Goblins: The Ultimate Guide",
  price: 25,
  discount: 0.15,
};

// ## Type Alias - Computed Properties

// Computed properties in JavaScript are a feature that allows you to dynamically create property keys on objects. This is done by wrapping an expression in
// square brackets [] that computes the property name when creating an object.

const propName = "age";

type Animal = {
  [propName]: number;
};

let tiger: Animal = { [propName]: 5 };

// ## Interface - Fundamentals

// - allow to setup shape for objects (only objects)

interface Book {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
}

const deepWork: Book = {
  isbn: 9781455586691,
  title: "Deep Work",
  author: "Cal Newport",
  genre: "Self-help",
};

deepWork.title = "New Title"; // allowed
// deepWork.isbn = 654321; // not allowed

// ## Interface - Methods
interface Book {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
  // method
  printAuthor(): void;
  printTitle(message: string): string;
}

const deepWork: Book = {
  isbn: 9781455586691,
  title: "Deep Work",
  author: "Cal Newport",
  genre: "Self-help",
  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    return `${this.title} ${message}`;
  },
};
deepWork.printAuthor();
const result = deepWork.printTitle("is an awesome book");
console.log(result);

// ## Interface - Methods (more options)

// It's generally a good practice to match the structure of the interface and the implementing object or class as
// closely as possible. This makes the code easier to understand and maintain. So, if printAuthor is defined as a
// method in the Book interface, it would be more consistent to implement it as a method in the deepWork object.
interface Book {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
  // method
  printAuthor(): void;
  printTitle(message: string): string;
  printSomething: (someValue: number) => number;
}

const deepWork: Book = {
  isbn: 9781455586691,
  title: "Deep Work",
  author: "Cal Newport",
  genre: "Self-help",
  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    return `${this.title} ${message}`;
  },
  // first option
  // printSomething: function (someValue) {
  //   return someValue;
  // },
  // second option
  printSomething: (someValue) => {
    // "this" gotcha
    console.log(deepWork.author);
    return someValue;
  },
  // third option
  // printSomething(someValue) {
  //   return someValue;
  // },
  // alternative
  // printAuthor: () => {
  //   console.log(deepWork.author);
  // },
};
console.log(deepWork.printSomething(34));

deepWork.printAuthor();
const result = deepWork.printTitle("is an awesome book");
console.log(result);
*/
// ## Challenge

// - Start by defining an interface Computer using the interface keyword. This will serve as a blueprint for objects that will be of this type.
// - Inside the interface, define the properties that the object should have. In this case, we have id, brand, ram, and storage.
// - Use the readonly keyword before the id property to indicate that it cannot be changed once it's set.
// - Use the ? after the storage property to indicate that this property is optional and may not exist on all objects of this type.
// - Also inside the interface, define any methods that the object should have. In this case, we have upgradeRam, which is a function that takes a 
// number and returns a number.
// - Now that we have our interface, we can create an object that adheres to this interface. This object should have all the properties defined in 
// the interface (except for optional ones, which are... optional), and the methods should be implemented.
// - Finally, we can use our object. We can call its upgradeRam method to increase its RAM.

interface Computer {
  readonly id: number; // cannot be changed once initialized
  brand: string;
  ram: number;
  upgradeRam(increase: number): number;
  storage?: number; // optional property
}

const laptop: Computer = {
  id: 1,
  brand: "random brand",
  ram: 8, // in GB
  upgradeRam(amount: number) {
    this.ram += amount;
    return this.ram;
  },
};

laptop.storage = 256; // assigning value to optional property

console.log(laptop.upgradeRam(4)); // upgrades RAM by 4GB
console.log(laptop);
