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

// ## Interface - Merging, Extend, TypeGuard

interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

// Merging (reopening) an interface in TypeScript is a process where you declare an interface with the same name more than once,
// and TypeScript will merge their members.

// Merging the interface
interface Person {
  age: number;
}

// Usage
const person: Person = {
  name: "John",
  age: 30,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

// Extending an interface in TypeScript is a way to create a new interface that inherits the properties and methods of an
// existing interface. You use the extends keyword to do this. When you extend an interface, the new interface will have
// all the members of the base interface, plus any new members that you add.

// Extending the interface
interface Employee extends Person {
  employeeId: number;
}

const employee: Employee = {
  name: "jane",
  age: 28,
  employeeId: 123,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Employee ID: ${this.employeeId}`;
  },
};

// Interface multiple inheritance
interface Manager extends Person, DogOwner {
  managePeople(): void;
}

const manager: Manager = {
  name: "Bob",
  age: 35,
  dogName: "Rex",
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  getDogDetails() {
    return `Dog Name: ${this.dogName}`;
  },
  managePeople() {
    console.log("Managing people...");
  },
};

// ## Challenge - Part 1

// - Define the Person interface Start by defining a Person interface with a name property of type string.
// - Define the DogOwner interface Next, define a DogOwner interface that extends Person and adds a dogName
// property of type string.
// - Define the Manager interface Then, define a Manager interface that extends Person and adds two methods:
// managePeople and delegateTasks. Both methods should have a return type of void.
// - Define the getEmployee function Now, define a function called getEmployee that returns a Person,
// DogOwner, or Manager. Inside this function, generate a random number and use it to decide which type of
// object to return. If the number is less than 0.33, return a Person. If it's less than 0.66, return a
// DogOwner. Otherwise, return a Manager.
// - Finally, create a variable called employee that can be a Person, DogOwner, or Manager, and assign it the
// return value of getEmployee. Then, log employee to the console.

interface Person {
  name: string;
}

interface DogOwner extends Person {
  dogName: string;
}

interface Manager extends Person {
  managePeople(): void;
  delegateTasks(): void;
}

const employee: Person | DogOwner | Manager = getEmployee();
console.log(employee);

function getEmployee(): Person | DogOwner | Manager {
  const random = Math.random();

  if (random < 0.33) {
    return {
      name: "john",
    };
  } else if (random < 0.66) {
    return {
      name: "sarah",
      dogName: "Rex",
    };
  } else {
    return {
      name: "bob",
      managePeople: () => console.log("Managing people..."),
      delegateTasks: () => console.log("Delegating tasks..."),
    };
  }
}

// ## Challenge - Part 2

// A type predicate in TypeScript is a special kind of return type for a function that not only returns a boolean,
// but also asserts that the argument is of a specific type if the function returns true. It's typically used in
// user-defined type guard functions to narrow down the type of a variable within a certain scope. The syntax is
// arg is Type, where arg is the function argument and Type is the type you're checking for.

// - Define the isManager function Define a function called isManager that takes an object of type Person |
// DogOwner | Manager and returns a boolean. This function should check if the managePeople method exists on the
// object, and return true if it does and false if it doesn't. The return type of this function should be a type
// predicate: obj is Manager.
// - Run your code to see if it works as expected. If employee is a Manager, you should see the output of the
// delegateTasks method in the console. If employee is a Person or DogOwner, there should be no output.

// function isManager(obj: Person | DogOwner | Manager): boolean {
//   return 'managePeople' in obj;
// }

function isManager(obj: Person | DogOwner | Manager): obj is Manager {
  return "managePeople" in obj;
}

if (isManager(employee)) {
  employee.delegateTasks();
}


// ## Interface vs Type Alias

// A type alias is a way to give a name to a type. It can represent primitive types, union types, intersection types,
// tuples, and any other types. Once defined, the alias can be used anywhere in place of the actual type.

type Person = {
  name: string;
  age: number;
};

let john: Person = { name: "John", age: 30 };

// Interface

// An interface is a way to define a contract for a certain structure of an object.

interface Person {
  name: string;
  age: number;
}

let john: Person = { name: "John", age: 30 };

// Key Differences

// - Type aliases can represent primitive types, union types, intersection types, tuples, etc., while interfaces
// are primarily used to represent the shape of an object.

// Type alias for a primitive type
type Score = number;
type NumberOrString = number | string;
// Type alias for literal types
type Direction = "up" | "down" | "left" | "right";

// Using the type aliases
let gameScore: Score = 100;
let move: Direction = "up";

// - Interfaces can be merged using declaration merging. If you define an interface with the same name more than once,
// TypeScript will merge their definitions. Type aliases can't be merged in this way.

// - Interfaces can be implemented by classes, while type aliases cannot.
// - Type aliases can use computed properties, while interfaces cannot.

interface Person {
  name: string;
  greet(): void;
}

class Employee implements Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

let john = new Employee("John");
john.greet(); // Outputs: Hello, my name is John

const propName = "age";

type Animal = {
  [propName]: number;
};

let tiger: Animal = { [propName]: 5 };

// ## Tuples

// In TypeScript, a Tuple is a special type that allows you to create an array where the type of a fixed number of elements is known,
// but need not be the same - in other words it's an array with fixed length and ordered with fixed types. This is useful when you want
// to group different types of values together.

// Tuples are useful when you want to return multiple values from a function.

// By default, tuples in TypeScript are not read-only. This means you can modify the values of the elements in the tuple. However, TypeScript
// does provide a way to make tuples read-only using the readonly keyword.
let person: [string, number] = ["john", 25];
console.log(person[0]); // Outputs: john
console.log(person[1]); // Outputs: 25

let john: [string, number?] = ["john"];

function getPerson(): [string, number] {
  return ["john", 25];
}

let randomPerson = getPerson();
console.log(randomPerson[0]); // Outputs: john
console.log(randomPerson[1]);

// let susan: [string, number] = ['susan', 25];
// susan[0] = 'bob';
// susan.push('some random value');

let susan: readonly [string, number] = ["susan", 25];
// susan[0] = 'bob';
// susan.push('some random value');
console.log(susan);

// ## Enums

// Enums in TypeScript allow us to define a set of named constants. Using enums can make it easier to document intent,
// or create a set of distinct cases.
enum ServerResponseStatus {
  Success = 200,
  Error = "Error",
}

interface ServerResponse {
  result: ServerResponseStatus;
  data: string[];
}

function getServerResponse(): ServerResponse {
  return {
    result: ServerResponseStatus.Success,
    data: ["first item", "second item"],
  };
}

const response: ServerResponse = getServerResponse();
console.log(response);

// ## Enums - Gotcha : Reverse Mapping

// In a numeric enum, TypeScript creates a reverse mapping from the numeric values to the enum member names. This means that if you assign 
// a numeric value to an enum member, you can use that numeric value anywhere the enum type is expected.

// In a string enum, TypeScript does not create a reverse mapping. This means that if you assign a string value to an enum member, you 
// cannot use that string value anywhere the enum type is expected. You must use the enum member itself.

enum ServerResponseStatus {
  Success = "Success",
  Error = "Error",
}

Object.values(ServerResponseStatus).forEach((value) => {
  console.log(value);
});


enum ServerResponseStatus {
  Success = 200,
  Error = 500,
}

Object.values(ServerResponseStatus).forEach((value) => {
  if (typeof value === "number") {
    console.log(value);
  }
});


enum NumericEnum {
  Member = 1,
}

enum StringEnum {
  Member = "Value",
}

let numericEnumValue: NumericEnum = 1; // This is allowed
console.log(numericEnumValue); // 1

let stringEnumValue: StringEnum = "Value"; // This is not allowed


enum ServerResponseStatus {
  Success = "Success",
  Error = "Error",
}

function getServerResponse(): ServerResponse {
  return {
    // result: ServerResponseStatus.Success,
    // this will not fly with string enum but ok with number
    result: "Success",
    data: ["first item", "second item"],
  };
}

// ## Challenge

// - Define an enum named UserRole with members Admin, Manager, and Employee.
// - Define a type alias named User with properties id (number), name (string), role (UserRole), and contact
// (a tuple with two elements: email as string and phone as string).
// - Define a function named createUser that takes a User object as its parameter and returns a User object.
// - Call the createUser function with an object that matches the User type, store the result in a variable, and
// log the variable to the console.

// Define an enum named UserRole
enum UserRole {
  Admin,
  Manager,
  Employee,
}

// Define a type alias named User
type User = {
  id: number;
  name: string;
  role: UserRole;
  contact: [string, string]; // Tuple: [email, phone]
};

// Define a function named createUser
function createUser(user: User): User {
  return user;
}

// Call the createUser function
const user: User = createUser({
  id: 1,
  name: "John Doe",
  role: UserRole.Admin,
  contact: ["john.doe@example.com", "123-456-7890"],
});

console.log(user);

// ## Type Assertion

// Type assertion in TypeScript is a way to tell the compiler what the type of an existing variable is.
// This is especially useful when you know more about the type of a variable than TypeScript does.
let someValue: any = "This is a string";

// Using type assertion to treat 'someValue' as a string
let strLength: number = (someValue as string).length;

type Bird = {
  name: string;
};

// Assume we have a JSON string from an API or local file
let birdString = '{"name": "Eagle"}';
let dogString = '{"breed": "Poodle"}';

//

// Parse the JSON string into an object
let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

// We're sure that the jsonObject is actually a Bird
let bird = birdObject as Bird;
let dog = dogObject as Bird;

console.log(bird.name);
console.log(dog.name);

enum Status {
  Pending = "pending",
  Declined = "declined",
}

type User = {
  name: string;
  status: Status;
};
// save Status.Pending in the DB as a string
// retrieve string from the DB
const statusValue = "pending";

const user: User = { name: "john", status: statusValue as Status };

// ## Type - 'unknown'

// The unknown type in TypeScript is a type-safe counterpart of the any type. It's like saying that a
// variable could be anything, but we need to perform some type-checking before we can use it.

// "error instanceof Error" checks if the error object is an instance of the Error class.
let unknownValue: unknown;

// Assign different types of values to unknownValue
unknownValue = "Hello World"; // OK
unknownValue = [1, 2, 3]; // OK
unknownValue = 42.3344556; // OK

// unknownValue.toFixed( ); // Error: Object is of type 'unknown'

// Now, let's try to use unknownValue
if (typeof unknownValue === "number") {
  // TypeScript knows that unknownValue is a string in this block
  console.log(unknownValue.toFixed(2)); // OK
}

function runSomeCode() {
  const random = Math.random();
  if (random < 0.5) {
    throw new Error("Something went wrong");
  } else {
    throw "some error";
  }
}

try {
  runSomeCode();
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
    console.log("there was an error....");
  }
}

// ## Type - "never"

// In TypeScript, never is a type that represents the type of values that never occur. You can't assign any value to a variable of type never.
// TypeScript will give a compile error if there are any unhandled cases, helping ensure that all cases are handled.

// let someValue: never = 0;

type Theme = "light" | "dark";

function checkTheme(theme: Theme) {
  if (theme === "light") {
    console.log("light theme");
    return;
  }
  if (theme === "dark") {
    console.log("dark theme");
    return;
  }
  theme;
  // theme is of type never, because it can never have a value that is not 'light' or 'dark'.
}

enum Color {
  Red,
  Blue,
  // Green,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return "Red";
    case Color.Blue:
      return "Blue";
    default:
      // at build time
      let unexpectedColor: never = color;
      // at runtime
      throw new Error(`Unexpected color value: ${unexpectedColor}`);
  }
}

console.log(getColorName(Color.Red)); // Red
console.log(getColorName(Color.Blue)); // Blue
// console.log(getColorName(Color.Green)); // Green

// ## Modules - Global Scope "Gotcha"

// If your TypeScript files aren't modules (i.e., they don't have any import or export statements), they're treated as scripts in the global scope.
// In this case, declaring the same variable in two different files would cause a conflict.
// tutorial.ts

```ts
let name = "shakeAdnBake";

const susan = "susan";

export let something = "something";
```// actions.ts

```ts
const susan = "susan";

export const something = "something";
```// tsconfig.json

```json
"moduleDetection": "force",
```// - output

// tsconfig.json

```json
"module": "ESNext",
```;

// ## Modules - Imports/Exports (including types)
import newStudent, { sayHello, person, type Student } from "./actions";

sayHello("TypeScript");
console.log(person);
console.log(newStudent);

const anotherStudent: Student = {
  name: "bob",
  age: 23,
};

console.log(anotherStudent);

// ## Modules - Javascript Files

// When you set "allowJs": true in your tsconfig.json, TypeScript will process JavaScript files and can infer types to a certain extent
// based on the structure and usage of your JavaScript code.

// However, TypeScript's ability to infer types from JavaScript is not as robust as when working with TypeScript files. For example,
// it might not be able to infer complex types or types that depend on runtime behavior.

// - create example.js
// - export someValue, import in tutorial

import newStudent, { sayHello, person, type Student } from "./actions";
import { someValue } from "./example.js";

sayHello("TypeScript");
console.log(person);
console.log(newStudent);

const anotherStudent: Student = {
  name: "bob",
  age: 23,
};

console.log(anotherStudent);

// ## Type Guarding

// Type guarding is a term in TypeScript that refers to the ability to narrow down the type of an object within a certain scope.
// This is usually done using conditional statements that check the type of an object.

// In the context of TypeScript, a type guard is some expression that performs a runtime check that guarantees the type in some scope.

// ## Challenge - "typeof" guard

// - Define the function checkValue that takes one parameter value of type ValueType.
// - Inside the function, use an if statement to check if value is of type string. If it is, log value converted to lowercase and then
// return from the function.
// - If value is not a string, use another if statement to check if value is of type number. If it is, log value formatted to two decimal
// places and then return from the function.
// - If value is neither a string nor a number, it must be a boolean. Log the string "boolean: " followed by the boolean value.
// - Finally, call the checkValue function with value as the argument.

type ValueType = string | number | boolean;

let value: ValueType;
const random = Math.random();
value = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;

function checkValue(value: ValueType) {
  if (typeof value === "string") {
    console.log(value.toLowerCase());
    return;
  }
  if (typeof value === "number") {
    console.log(value.toFixed(2));
    return;
  }
  console.log(`boolean: ${value}`);
}

checkValue(value);

// ## Challenge - Equality Narrowing

// In TypeScript, equality narrowing is a form of type narrowing that occurs when you use equality checks like === or !== in your code

// - Define a function named makeSound that takes one parameter animal of type Animal.
// - Inside the function, use an if statement to check if animal.type is 'dog'.
// - If animal.type is 'dog', TypeScript knows that animal is a Dog in this block. In this case, call the bark method of animal.
// - If animal.type is not 'dog', TypeScript knows that animal is a Cat in the else block. In this case, call the meow method of animal.
// - Now you can call the makeSound function with an Animal as the argument. The function will call the appropriate method (bark or meow)
// depending on the type of the animal.

type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal) {
  if (animal.type === "dog") {
    // TypeScript knows that `animal` is a Dog in this block
    animal.bark();
  } else {
    // TypeScript knows that `animal` is a Cat in this block
    animal.meow();
  }
}

// ## Challenge - check for property

// The "in" operator in TypeScript is used to narrow down the type of a variable when used in a conditional statement.
// It checks if a property or method exists on an object. If it exists, TypeScript will narrow the type to the one that has this property.

// - Define a function named makeSound that takes one parameter animal of type Animal.
// - Inside the function, use an if statement with the in operator to check if the bark method exists on the animal object.
// - If the bark method exists on animal, TypeScript knows that animal is a Dog in this block. In this case, call the bark method of animal.
// - If the bark method does not exist on animal, TypeScript knows that animal is a Cat in the else block. In this case, call the meow method of animal.
// - Now you can call the makeSound function with an Animal as the argument. The function will call the appropriate method (bark or meow) depending on the type of the animal.

type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal) {
  if ("bark" in animal) {
    // TypeScript knows that `animal` is a Dog in this block
    animal.bark();
  } else {
    // TypeScript knows that `animal` is a Cat in this block
    animal.meow();
  }
}

// ## Challenge - "Truthy"/"Falsy" guard

// In TypeScript, "Truthy"/"Falsy" guard is a simple check for a truthy or falsy value

// - Define a function named printLength that takes one parameter str which can be of type string, null, or undefined.
// - Inside the function, use an if statement to check if str is truthy. In JavaScript and TypeScript, a truthy value is a value that is
// considered true when encountered in a Boolean context. All values are truthy unless they are defined as falsy
// (i.e., except for false, 0, -0, 0n, "", null, undefined, and NaN).
// - If str is truthy, it means it's a string (since null and undefined are falsy). In this case, log the length of str using the length
// property of the string.
// - If str is not truthy (i.e., it's either null or undefined), log the string 'No string provided'.

// - Now you can call the printLength function with a string, null, or undefined as the argument. The function will print the length of the
// string if a string is provided, or 'No string provided' otherwise.
function printLength(str: string | null | undefined) {
  if (str) {
    // In this block, TypeScript knows that `str` is a string
    // because `null` and `undefined` are falsy values.
    console.log(str.length);
  } else {
    console.log("No string provided");
  }
}

printLength("Hello"); // Outputs: 5
printLength(null); // Outputs: No string provided
printLength(undefined); // Outputs: No string provided

// ## Challenge - "instanceof" type guard

// The instanceof type guard is a way in TypeScript to check the specific class or constructor function of an object at runtime. It returns true
// if the object is an instance of the class or created by the constructor function, and false otherwise.

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
// - Define the function's parameter. The function takes one parameter, input, which can be of type Date or string. This is denoted by input: Date | string.
// - Inside the function, use an if statement to check if the input is an instance of Date. This is done using the instanceof operator.
// - If the input is an instance of Date, return the year part of the date as a string. This is done by calling the getFullYear method on
// the input and then converting it to a string using the toString method.
// - If the input is not an instance of Date (which means it must be a string), return the input as it is.
// - After defining the function, you can use it by calling it with either a Date or a string as the argument. The function will return
// the year part of the date if a Date is passed, or the original string if a string is passed.
// - You can store the return value of the function in a variable and then log it to the console to see the result.

function checkInput(input: Date | string): string {
  if (input instanceof Date) {
    return input.getFullYear().toString();
  }
  return input;
}

const year = checkInput(new Date());
const random = checkInput("2020-05-05");
console.log(year);
console.log(random);

// ## Challenge - Type Predicate

// A type predicate is a function whose return type is a special kind of type that can be used to narrow down types within conditional blocks.

// - Define the Person and Student types. Student should have a study method and Person should have a login method.
// - Create a function named isStudent that takes a parameter person of type Person.
// - In the function signature, specify a return type that is a type predicate: person is Student.
// - In the function body, use a type assertion to treat person as a Student, and check if the study - method is not undefined.
// This will return true if person is a Student, and false otherwise.
// - Use the isStudent function in an if statement with person as the argument.
// - In the if block (where isStudent(person) is true), call the study method on person. TypeScript knows that person is a Student
// in this block, so this is safe.
// - In the else block (where isStudent(person) is false), call the login method on person. This is safe because if person is not a
// Student, it must be a Person, and all Person objects have a login method.

type Student = {
  name: string;
  study: () => void;
};

type User = {
  name: string;
  login: () => void;
};

type Person = Student | User;

const randomPerson = (): Person => {
  return Math.random() > 0.5
    ? { name: "john", study: () => console.log("Studying") }
    : { name: "mary", login: () => console.log("Logging in") };
};

const person = randomPerson();
function isStudent(person: Person): person is Student {
  // return 'study' in person;
  return (person as Student).study !== undefined;
}

// Usage

if (isStudent(person)) {
  person.study(); // This is safe because TypeScript knows that 'person' is a Student.
} else {
  person.login();
}

// ## Optional - type "never" gotcha
type Student = {
  name: string;
  study: () => void;
};

type User = {
  name: string;
  login: () => void;
};

type Person = Student | User;

const person: Person = {
  name: "anna",
  study: () => console.log("Studying"),
  // login: () => console.log('Logging in'),
};
// person;
function isStudent(person: Person): person is Student {
  // return 'study' in person;
  return (person as Student).study !== undefined;
}

// Usage

if (isStudent(person)) {
  person.study(); // This is safe because TypeScript knows that 'person' is a Student.
} else {
  // in this case person is type "never"
  console.log(person);
}
*/
// ## Challenge - Discriminated Unions and exhaustive check using the never type

// A discriminated union in TypeScript is a type that can be one of several different types, each identified by a
// unique literal property (the discriminator), allowing for type-safe handling of each possible variant.

// - Write a reducer function that takes the current state and an action, and returns the new state. The reducer function
// should use a switch statement or if-else chain on the type property of the action to handle each action type differently.

// - In the default case of the switch statement or the final else clause, perform an exhaustive check by assigning the
// action to a variable of type never. If there are any action types that haven't been handled, TypeScript will give a compile error.

// - Implement the logic for each action type in the reducer function. This typically involves returning a new state based
// on the current state and the properties of the action.

// - Use the reducer function in your application to handle actions and update the state.

type IncrementAction = {
  type: "increment";
  amount: number;
  timestamp: number;
  user: string;
};

type DecrementAction = {
  type: "decrement";
  amount: number;
  timestamp: number;
  user: string;
};

type Action = IncrementAction | DecrementAction;

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;

    default:
      const unexpectedAction: never = action;
      throw new Error(`Unexpected action: ${unexpectedAction}`);
  }
}

const newState = reducer(15, {
  user: "john",
  type: "increment",
  amount: 5,
  timestamp: 123456,
});
