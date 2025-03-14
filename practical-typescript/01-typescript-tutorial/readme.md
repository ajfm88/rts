## Interface - Merging, Extend, TypeGuard

```ts
interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

// Merging (reopening) an interface in TypeScript is a process where you declare an interface with the same name more than once, and TypeScript will merge their members.

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

// Extending an interface in TypeScript is a way to create a new interface that inherits the properties and methods of an existing interface. You use the extends keyword to do this. When you extend an interface, the new interface will have all the members of the base interface, plus any new members that you add.

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
```

## Challenge - Part 1

- Define the Person interface Start by defining a Person interface with a name property of type string.
- Define the DogOwner interface Next, define a DogOwner interface that extends Person and adds a dogName property of type string.
- Define the Manager interface Then, define a Manager interface that extends Person and adds two methods: managePeople and delegateTasks. Both methods should have a return type of void.
- Define the getEmployee function Now, define a function called getEmployee that returns a Person, DogOwner, or Manager. Inside this function, generate a random number and use it to decide which type of object to return. If the number is less than 0.33, return a Person. If it's less than 0.66, return a DogOwner. Otherwise, return a Manager.
- Finally, create a variable called employee that can be a Person, DogOwner, or Manager, and assign it the return value of getEmployee. Then, log employee to the console.

```ts
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
```

## Challenge - Part 2

A type predicate in TypeScript is a special kind of return type for a function that not only returns a boolean, but also asserts that the argument is of a specific type if the function returns true. It's typically used in user-defined type guard functions to narrow down the type of a variable within a certain scope. The syntax is arg is Type, where arg is the function argument and Type is the type you're checking for.

- Define the isManager function Define a function called isManager that takes an object of type Person | DogOwner | Manager and returns a boolean. This function should check if the managePeople method exists on the object, and return true if it does and false if it doesn't. The return type of this function should be a type predicate: obj is Manager.
- Run your code to see if it works as expected. If employee is a Manager, you should see the output of the delegateTasks method in the console. If employee is a Person or DogOwner, there should be no output.

```ts
// function isManager(obj: Person | DogOwner | Manager): boolean {
//   return 'managePeople' in obj;
// }

function isManager(obj: Person | DogOwner | Manager): obj is Manager {
  return "managePeople" in obj;
}

if (isManager(employee)) {
  employee.delegateTasks();
}
```

## Interface vs Type Alias

A type alias is a way to give a name to a type. It can represent primitive types, union types, intersection types, tuples, and any other types. Once defined, the alias can be used anywhere in place of the actual type.

```ts
type Person = {
  name: string;
  age: number;
};

let john: Person = { name: "John", age: 30 };
```

Interface

An interface is a way to define a contract for a certain structure of an object.

```ts
interface Person {
  name: string;
  age: number;
}

let john: Person = { name: "John", age: 30 };
```

Key Differences

- Type aliases can represent primitive types, union types, intersection types, tuples, etc., while interfaces are primarily used to represent the shape of an object.

```ts
// Type alias for a primitive type
type Score = number;
type NumberOrString = number | string;
// Type alias for literal types
type Direction = "up" | "down" | "left" | "right";

// Using the type aliases
let gameScore: Score = 100;
let move: Direction = "up";
```

- Interfaces can be merged using declaration merging. If you define an interface with the same name more than once, TypeScript will merge their definitions. Type aliases can't be merged in this way.

- Interfaces can be implemented by classes, while type aliases cannot.
- Type aliases can use computed properties, while interfaces cannot.

```ts
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
```

```ts
const propName = "age";

type Animal = {
  [propName]: number;
};

let tiger: Animal = { [propName]: 5 };
```

## Tuples

In TypeScript, a Tuple is a special type that allows you to create an array where the type of a fixed number of elements is known, but need not be the same - in other words it's an array with fixed length and ordered with fixed types. This is useful when you want to group different types of values together.

Tuples are useful when you want to return multiple values from a function.

By default, tuples in TypeScript are not read-only. This means you can modify the values of the elements in the tuple.However, TypeScript does provide a way to make tuples read-only using the readonly keyword.

```ts
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
```

## Enums

Enums in TypeScript allow us to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases.

```ts
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
```

## Enums - Gotcha : Reverse Mapping

In a numeric enum, TypeScript creates a reverse mapping from the numeric values to the enum member names. This means that if you assign a numeric value to an enum member, you can use that numeric value anywhere the enum type is expected.

In a string enum, TypeScript does not create a reverse mapping. This means that if you assign a string value to an enum member, you cannot use that string value anywhere the enum type is expected. You must use the enum member itself.

```ts
enum ServerResponseStatus {
  Success = "Success",
  Error = "Error",
}

Object.values(ServerResponseStatus).forEach((value) => {
  console.log(value);
});
```

```ts
enum ServerResponseStatus {
  Success = 200,
  Error = 500,
}

Object.values(ServerResponseStatus).forEach((value) => {
  if (typeof value === "number") {
    console.log(value);
  }
});
```

```ts
enum NumericEnum {
  Member = 1,
}

enum StringEnum {
  Member = "Value",
}

let numericEnumValue: NumericEnum = 1; // This is allowed
console.log(numericEnumValue); // 1

let stringEnumValue: StringEnum = "Value"; // This is not allowed
```

```ts
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
```

## Challenge

- Define an enum named UserRole with members Admin, Manager, and Employee.
- Define a type alias named User with properties id (number), name (string), role (UserRole), and contact (a tuple with two elements: email as string and phone as string).
- Define a function named createUser that takes a User object as its parameter and returns a User object.
- Call the createUser function with an object that matches the User type, store the result in a variable, and log the variable to the console.

```ts
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
```

## Type Assertion

Type assertion in TypeScript is a way to tell the compiler what the type of an existing variable is. This is especially useful when you know more about the type of a variable than TypeScript does.

```ts
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
```

## Type - 'unknown'

The unknown type in TypeScript is a type-safe counterpart of the any type. It's like saying that a variable could be anything, but we need to perform some type-checking before we can use it.

"error instanceof Error" checks if the error object is an instance of the Error class.

```ts
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
```

## Type - "never"

In TypeScript, never is a type that represents the type of values that never occur.you can't assign any value to a variable of type never.
TypeScript will give a compile error if there are any unhandled cases, helping ensure that all cases are handled.

```ts
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
```

```ts
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
```

## Modules - Global Scope "Gotcha"

If your TypeScript files aren't modules (i.e., they don't have any import or export statements), they're treated as scripts in the global scope. In this case, declaring the same variable in two different files would cause a conflict.

tutorial.ts

```ts
let name = "shakeAdnBake";

const susan = "susan";

export let something = "something";
```

actions.ts

```ts
const susan = "susan";

export const something = "something";
```

tsconfig.json

```json
"moduleDetection": "force",
```

- output

tsconfig.json

```json
"module": "ESNext",
```

## Modules - Imports/Exports (including types)

```ts
export function sayHello(name: string): void {
  console.log(`Hello ${name}!`);
}

export let person = "susan";

export type Student = {
  name: string;
  age: number;
};

const newStudent: Student = {
  name: "peter",
  age: 24,
};

export default newStudent;
```

```ts
import newStudent, { sayHello, person, type Student } from "./actions";

sayHello("TypeScript");
console.log(person);
console.log(newStudent);

const anotherStudent: Student = {
  name: "bob",
  age: 23,
};

console.log(anotherStudent);
```

## Modules - Javascript Files

When you set "allowJs": true in your tsconfig.json, TypeScript will process JavaScript files and can infer types to a certain extent based on the structure and usage of your JavaScript code.

However, TypeScript's ability to infer types from JavaScript is not as robust as when working with TypeScript files. For example, it might not be able to infer complex types or types that depend on runtime behavior.

- create example.js
- export someValue, import in tutorial

```ts
  "allowJs": true,
```

## Type Guarding

Type guarding is a term in TypeScript that refers to the ability to narrow down the type of an object within a certain scope. This is usually done using conditional statements that check the type of an object.

In the context of TypeScript, a type guard is some expression that performs a runtime check that guarantees the type in some scope.

## Challenge - "typeof" guard

- starter code

```ts
type ValueType = string | number | boolean;

let value: ValueType;
const random = Math.random();
value = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;
```

- Define the function checkValue that takes one parameter value of type ValueType.
- Inside the function, use an if statement to check if value is of type string. If it is, log value converted to lowercase and then return from the function.
- If value is not a string, use another if statement to check if value is of type number. If it is, log value formatted to two decimal places and then return from the function.
- If value is neither a string nor a number, it must be a boolean. Log the string "boolean: " followed by the boolean value.
- Finally, call the checkValue function with value as the argument.

```ts
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
```

## Challenge - Equality Narrowing

In TypeScript, equality narrowing is a form of type narrowing that occurs when you use equality checks like === or !== in your code

- starter code

```ts
type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;
```

- Define a function named makeSound that takes one parameter animal of type Animal.
- Inside the function, use an if statement to check if animal.type is 'dog'.
- If animal.type is 'dog', TypeScript knows that animal is a Dog in this block. In this case, call the bark method of animal.
- If animal.type is not 'dog', TypeScript knows that animal is a Cat in the else block. In this case, call the meow method of animal.
- Now you can call the makeSound function with an Animal as the argument. The function will call the appropriate method (bark or meow) depending on the type of the animal.

```ts
function makeSound(animal: Animal) {
  if (animal.type === "dog") {
    // TypeScript knows that `animal` is a Dog in this block
    animal.bark();
  } else {
    // TypeScript knows that `animal` is a Cat in this block
    animal.meow();
  }
}
```

## Challenge - check for property

The "in" operator in TypeScript is used to narrow down the type of a variable when used in a conditional statement.It checks if a property or method exists on an object. If it exists, TypeScript will narrow the type to the one that has this property.

- starter code

```ts
type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;
```

- Define a function named makeSound that takes one parameter animal of type Animal.
- Inside the function, use an if statement with the in operator to check if the bark method exists on the animal object.
- If the bark method exists on animal, TypeScript knows that animal is a Dog in this block. In this case, call the bark method of animal.
- If the bark method does not exist on animal, TypeScript knows that animal is a Cat in the else block. In this case, call the meow method of animal.
- Now you can call the makeSound function with an Animal as the argument. The function will call the appropriate method (bark or meow) depending on the type of the animal.

```ts
function makeSound(animal: Animal) {
  if ("bark" in animal) {
    // TypeScript knows that `animal` is a Dog in this block
    animal.bark();
  } else {
    // TypeScript knows that `animal` is a Cat in this block
    animal.meow();
  }
}
```

## Challenge - "Truthy"/"Falsy" guard

In TypeScript, "Truthy"/"Falsy" guard is a simple check for a truthy or falsy value

- Define a function named printLength that takes one parameter str which can be of type string, null, or undefined.
- Inside the function, use an if statement to check if str is truthy. In JavaScript and TypeScript, a truthy value is a value that is considered true when encountered in a Boolean context. All values are truthy unless they are defined as falsy (i.e., except for false, 0, -0, 0n, "", null, undefined, and NaN).
- If str is truthy, it means it's a string (since null and undefined are falsy). In this case, log the length of str using the length property of the string.
- If str is not truthy (i.e., it's either null or undefined), log the string 'No string provided'.

- Now you can call the printLength function with a string, null, or undefined as the argument. The function will print the length of the string if a string is provided, or 'No string provided' otherwise.

```ts
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
```

## Challenge - "instanceof" type guard

The instanceof type guard is a way in TypeScript to check the specific class or constructor function of an object at runtime. It returns true if the object is an instance of the class or created by the constructor function, and false otherwise.

```ts
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
```

- Start by defining the function using the function keyword followed by the function name, in this case checkInput.
- Define the function's parameter. The function takes one parameter, input, which can be of type Date or string. This is denoted by input: Date | string.
- Inside the function, use an if statement to check if the input is an instance of Date. This is done using the instanceof operator.
- If the input is an instance of Date, return the year part of the date as a string. This is done by calling the getFullYear method on the input and then converting it to a string using the toString method.
- If the input is not an instance of Date (which means it must be a string), return the input as it is.
- After defining the function, you can use it by calling it with either a Date or a string as the argument. The function will return the year part of the date if a Date is passed, or the original string if a string is passed.
- You can store the return value of the function in a variable and then log it to the console to see the result.

```ts
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
```

## Challenge - Type Predicate

A type predicate is a function whose return type is a special kind of type that can be used to narrow down types within conditional blocks.

- starter code

```ts
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
```

- Define the Person and Student types. Student should have a study method and Person should have a login method.
- Create a function named isStudent that takes a parameter person of type Person.
- In the function signature, specify a return type that is a type predicate: person is Student.
- In the function body, use a type assertion to treat person as a Student, and check if the study - method is not undefined. This will return true if person is a Student, and false otherwise.
- Use the isStudent function in an if statement with person as the argument.
- In the if block (where isStudent(person) is true), call the study method on person. TypeScript knows that person is a Student in this block, so this is safe.
- In the else block (where isStudent(person) is false), call the login method on person. This is safe because if person is not a Student, it must be a Person, and all Person objects have a login method.

```ts
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
```

## Optional - type "never" gotcha

```ts
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
```

## Challenge - Discriminated Unions and exhaustive check using the never type

A discriminated union in TypeScript is a type that can be one of several different types, each identified by a unique literal property (the discriminator), allowing for type-safe handling of each possible variant.

- starter code

```ts
type IncrementAction = {
  amount: number;
  timestamp: number;
  user: string;
};

type DecrementAction = {
  amount: number;
  timestamp: number;
  user: string;
};

type Action = IncrementAction | DecrementAction;
```

- Write a reducer function that takes the current state and an action, and returns the new state. The reducer function should use a switch statement or if-else chain on the type property of the action to handle each action type differently.

- In the default case of the switch statement or the final else clause, perform an exhaustive check by assigning the action to a variable of type never. If there are any action types that haven't been handled, TypeScript will give a compile error.

- Implement the logic for each action type in the reducer function. This typically involves returning a new state based on the current state and the properties of the action.

- Use the reducer function in your application to handle actions and update the state.

```ts
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
```

## Generics - Fundamentals

Generics in TypeScript are a way to create reusable code components that work with a variety of types as opposed to a single one.

In other words, generics allow you to write a function or a class that can work with any data type. You can think of generics as a kind of variable for types.

```ts
// In TypeScript, you can declare an array using two syntaxes:

// let array1: string[] = ['Apple', 'Banana', 'Mango'];
// let array2: number[] = [1, 2, 3];
// let array3: boolean[] = [true, false, true];

let array1: Array<string> = ["Apple", "Banana", "Mango"];
let array2: Array<number> = [1, 2, 3];
let array3: Array<boolean> = [true, false, true];
```

## Generics - Create Generic Function and Interface

```ts
//
function createString(arg: string): string {
  return arg;
}
function createNumber(arg: number): number {
  return arg;
}

// Define a generic function
function genericFunction<T>(arg: T): T {
  return arg;
}

const someStringValue = genericFunction<string>("Hello World");
const someNumberValue = genericFunction<number>(2);

// Define a generic interface
interface GenericInterface<T> {
  value: T;
  getValue: () => T;
}

const genericString: GenericInterface<string> = {
  value: "Hello World",
  getValue() {
    return this.value;
  },
};
```

## Generics - Promise Example

```ts
// A Promise in JavaScript (and thus TypeScript) is an object representing the eventual completion or failure of an asynchronous operation.

async function someFunc(): Promise<string> {
  return "Hello World";
}

const result = someFunc();
```

## Generics - Generate Array

```ts
// generate an array of strings
function generateStringArray(length: number, value: string): string[] {
  let result: string[] = [];
  result = Array(length).fill(value);
  return result;
}

console.log(generateStringArray(3, "hello"));

function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  result = Array(length).fill(value);
  return result;
}

let arrayStrings = createArray<string>(3, "hello"); // ["hello", "hello", "hello"]
let arrayNumbers = createArray<number>(4, 100); // [100, 100, 100, 100]

console.log(arrayStrings);
console.log(arrayNumbers);
```

## Generics - Part 5

```ts
function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

// Usage
let result = pair<number, string>(123, "Hello");
console.log(result); // Output: [123, "Hello"]
```

## Generics - Inferred Type and Type Constraints

```ts
function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

// Usage
let result = pair(123, "Hello");

//  const [name,setName] = useState('')
//  const [products,setProducts] = useState<Product[]>([])

// type constraint on the generic type T, generic type can be either a number or a string.

function processValue<T extends number | string>(value: T): T {
  console.log(value);
}

processValue("hello");
processValue(12);
processValue(true);
```

## Generics - Type Constraints 2

```ts
type Car = {
  brand: string;
  model: string;
};

const car: Car = {
  brand: "ford",
  model: "mustang",
};

type Product = {
  name: string;
  price: number;
};

const product: Product = {
  name: "shoes",
  price: 1.99,
};

type Student = {
  name: string;
  age: number;
};

const student: Student = {
  name: "peter",
  age: 20,
};

// T extends Student is a type constraint on the generic type T. It means that the type T can be any type, but it must be a subtype of Student or Student itself. In other words, T must have at least the same properties and methods that Student has.

// function printName<T extends Student>(input: T): void {
//   console.log(input.name);
// }

// printName(student);

// function printName<T extends Student | Product>(input: T): void {
//   console.log(input.name);
// }

// printName(product);

// The extends { name: string } part is a type constraint on T. It means that T can be any type, but it must be an object that has at least a name property of type string.
// In other words, T must have at least the same properties and methods that { name: string } has.
function printName<T extends { name: string }>(input: T): void {
  console.log(input.name);
}

printName(student);
printName(product);
```

## Generics - Default Value

```ts
interface StoreData<T = any> {
  data: T[];
}

const storeNumbers: StoreData<number> = {
  data: [1, 2, 3, 4],
};

const randomStuff: StoreData = {
  data: ["random", 1],
};
```

```ts
// data is located in the data property

const { data } = axios.get(someUrl);

axios.get<{ name: string }[]>(someUrl);

export class Axios {
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
}

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
```

## Fetch Data

- typically axios and React Query (or both 🚀🚀🚀)
- we won't set any state values

```ts
const url = "https://www.course-api.com/react-tours-project";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "there was an error...";
    console.error(errMsg);
    // throw error;
    return [];
  }
}

const tours = await fetchData(url);
tours.map((tour: any) => {
  console.log(tour.name);
});

// return empty array
// throw error in catch block
// we are not setting state values in this function
```

## Challenge - Fetch Data

- setup type and provide correct return type

```ts
const url = "https://www.scourse-api.com/react-tours-project";

// Define a type for the data you're fetching.
type Tour = {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
  // Add more fields as necessary.
};

async function fetchData(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Tour[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "there was an error...";
    console.error(errMsg);

    // throw error;
    return [];
  }
}

const tours = await fetchData(url);
tours.map((tour) => {
  console.log(tour.name);
});
```

## ZOD Library

- Tour Data "Gotcha"

```sh
npm install zod
```

- [Zod](https://zod.dev/)
- [Error Handling in Zod](https://zod.dev/ERROR_HANDLING)

```ts
import { z } from "zod";
const url = "https://www.course-api.com/react-tours-project";

const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  info: z.string(),
  image: z.string(),
  price: z.string(),
  somethign: z.string(),
});

// extract the inferred type
type Tour = z.infer<typeof tourSchema>;

async function fetchData(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData: Tour[] = await response.json();
    const result = tourSchema.array().safeParse(rawData);
    if (!result.success) {
      throw new Error(`Invalid data: ${result.error}`);
    }
    return result.data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "there was an error...";
    console.log(errMsg);

    // throw error;
    return [];
  }
}

const tours = await fetchData(url);
tours.map((tour) => {
  console.log(tour.name);
});
```

## Typescript Declaration File

In TypeScript, .d.ts files, also known as declaration files,consist of type definitions, and are used to provide types for JavaScript code. They allow TypeScript to understand the shape and types of objects, functions, classes, etc., in JavaScript libraries, enabling type checking and autocompletion in TypeScript code that uses these libraries.

- create types.ts
- export RandomType

tsconfig.json

- `lib`: Set to `["ES2020", "DOM", "DOM.Iterable"]`. This specifies the library files to be included in the compilation.
  Specify a set of bundled library declaration files that describe the target runtime environment.

- libraries

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

- password hashing library

```sh
npm i bcryptjs
```

```sh
npm install --save-dev @types/bcryptjs
```

# tsconfig.json Configuration

[tsconfig](https://www.typescriptlang.org/tsconfig)

This project's TypeScript configuration is defined in the `tsconfig.json` file. Here's a breakdown of the configuration options:

- `include`: Set to `["src"]`. This tells TypeScript to only convert files in the `src` directory.

- `target`: Set to `ES2020`. This is the JavaScript version that the TypeScript code will be compiled to.

- `useDefineForClassFields`: Set to `true`. This enables the use of the `define` semantics for initializing class fields.

- `module`: Set to `ESNext`. This is the module system for the compiled code.

- `lib`: Set to `["ES2020", "DOM", "DOM.Iterable"]`. This specifies the library files to be included in the compilation.

- `skipLibCheck`: Set to `true`. This makes TypeScript skip type checking of declaration files (`*.d.ts`).

- `moduleResolution`: Set to `bundler`. This sets the strategy TypeScript uses to resolve modules.

- `allowImportingTsExtensions`: Set to `true`. This allows importing of TypeScript files from JavaScript files.

- `resolveJsonModule`: Set to `true`. This allows importing of `.json` modules from TypeScript files.

- `isolatedModules`: Set to `true`. This ensures that each file can be safely transpiled without relying on other import/export files.

- `noEmit`: Set to `true`. This tells TypeScript to not emit any output files (`*.js` and `*.d.ts` files) after compilation.

- `strict`: Set to `true`. This enables all strict type-checking options.

- `noUnusedLocals`: Set to `true`. This reports an error when local variables are declared but never used.

- `noUnusedParameters`: Set to `true`. This reports an error when function parameters are declared but never used.

- `noFallthroughCasesInSwitch`: Set to `true`. This reports an error for fall through cases in switch statements.

## Classes - Intro

Classes in JavaScript are a blueprint for creating objects. They encapsulate data with code to manipulate that data. Classes in JavaScript support inheritance and can be used to create more complex data structures.

A constructor in a class is a special method that gets called when you create a new instance of the class. It's often used to set the initial state of the object.

```ts
class Book {
  title: string;
  author: string;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWork = new Book("deep work ", "cal newport");
```

## Classes - Instance Property / Default Property

The checkedOut property in Book class is an instance property (or member variable). It's not specifically set in the constructor, so it could also be referred to as a default property or a property with a default value.

```ts
class Book {
  title: string;
  author: string;
  checkedOut: boolean = false;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWork = new Book("deep work ", "cal newport");
deepWork.checkedOut = true;
// deepWork.checkedOut = 'something else';
```

## Classes - ReadOnly Modifier

- readonly modifier

```ts
class Book {
  readonly title: string;
  author: string;
  checkedOut: boolean = false;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWork = new Book("deep work ", "cal newport");

deepWork.title = "something else";
```

## Classes - Private and Public Modifiers

- private and public modifiers

```ts
class Book {
  public readonly title: string;
  public author: string;
  private checkedOut: boolean = false;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
  public checkOut() {
    this.checkedOut = this.toggleCheckedOutStatus();
  }
  public isCheckedOut() {
    return this.checkedOut;
  }
  private toggleCheckedOutStatus() {
    return !this.checkedOut;
  }
}

const deepWork = new Book("Deep Work", "Cal Newport");
deepWork.checkOut();
console.log(deepWork.isCheckedOut()); // true
// deepWork.toggleCheckedOutStatus(); // Error: Property 'toggleCheckedOutStatus' is private and only accessible within class 'Book'.
```

## Classes - Shorthand Syntax

In TypeScript, if you want to use the shorthand for creating and initializing class properties in the constructor, you need to use public, private, or protected access modifiers.

```ts
class Book {
  private checkedOut: boolean = false;
  constructor(public readonly title: string, public author: string) {}
}
```

## Classes - Getters and Setters

Getters and setters are special methods in a class that allow you to control how a property is accessed and modified.They are used like properties, not methods, so you don't use parentheses to call them.

```ts
class Book {
  private checkedOut: boolean = false;
  constructor(public readonly title: string, public author: string) {}
  get info() {
    return `${this.title} by ${this.author}`;
  }

  private set checkOut(checkedOut: boolean) {
    this.checkedOut = checkedOut;
  }
  get checkOut() {
    return this.checkedOut;
  }
  public get someInfo() {
    this.checkOut = true;
    return `${this.title} by ${this.author}`;
  }
}

const deepWork = new Book("deep work", "cal newport");
console.log(deepWork.info);
// deepWork.checkOut = true;
console.log(deepWork.someInfo);
console.log(deepWork.checkOut);
```

## Classes - Implement Interface

In TypeScript, an interface is a way to define a contract for a certain structure of an object. This contract can then be used by a class to ensure it adheres to the structure defined by the interface.

When a class implements an interface, it is essentially promising that it will provide all the properties and methods defined in the interface. If it does not, TypeScript will throw an error at compile time.

```ts
interface IPerson {
  name: string;
  age: number;
  greet(): void;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const hipster = new Person("shakeAndBake", 100);
hipster.greet();
```

## Tasks - Setup

- create tasks.html (root) and src/tasks.ts
- optional : change href in main.ts
- optional css
  - create tasks.css (copy from final or end of the README)
  - setup link in tasks.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tasks</title>
    <link rel="stylesheet" href="src/tasks.css" />
  </head>
  <body>
    <main>
      <h2>Tasks</h2>
      <form class="form">
        <input type="text" class="form-input" />
        <button type="submit" class="btn">add task</button>
      </form>
      <ul class="list"></ul>
      <button class="test-btn">click me</button>
    </main>
    <script type="module" src="src/tasks.ts"></script>
  </body>
</html>
```

## Tasks - Part 2

```ts
const btn = document.querySelector(".btn");

btn?.addEventListener("click", () => {
  console.log("something");
});

if (btn) {
  // do something
}
```

The ! operator in TypeScript is officially known as the Non-null assertion operator. It is used to assert that its preceding expression is not null or undefined.

```ts
const btn = document.querySelector(".btn")!;

btn.addEventListener("click", () => {
  console.log("something");
});
```

Element is the most general base class from which all element objects (i.e. objects that represent elements) in a Document inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from Element.

```ts
const btn = document.querySelector<HTMLButtonElement>(".selector")!;

btn.disabled = true;

const btn = document.querySelector(".selector")! as HTMLButtonElement;

btn.disabled = true;
```

## Tasks - Part 3

```ts
const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

// task type
type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = [];
```

## Tasks - Part 4

```ts
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    // add task to list
    // render tasks
    // update local storage

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
});
```

- event gotcha

```ts
function createTask(event: SubmitEvent) {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    // add task to list
    // render tasks
    // update local storage

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
}

taskForm?.addEventListener("submit", createTask);
```

## Tasks - Part 5

```ts
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    // add task to list
    addTask(task);
    // render tasks

    // update local storage

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
});

function addTask(task: Task): void {
  tasks.push(task);
  // console.log(tasks);
}
```

## Tasks - Part 6

```ts
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  taskListElement?.appendChild(taskElement);
}
```

```ts
// add task to list
addTask(task);
// render task
renderTask(task);
```

## Tasks - Part 7

```ts
// Retrieve tasks from localStorage
const tasks: Task[] = loadTasks();

// Load tasks from localStorage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// tasks.forEach((task) => renderTask(task));
tasks.forEach(renderTask);

// Update tasks in localStorage
function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

```ts
// add task to list
addTask(task);
// render task
renderTask(task);
// update local storage
updateStorage();
```

## Tasks - Part 8

```ts
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  // checkbox
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}
```

## Tasks - Part 9

```ts
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  // checkbox
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;
  // toggle checkbox
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}
```

## Tasks - CSS

tasks.css

```css
/* ============= GLOBAL CSS =============== */

*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 100%;
} /*16px*/

:root {
  /* colors */
  --primary-100: #e2e0ff;
  --primary-200: #c1beff;
  --primary-300: #a29dff;
  --primary-400: #837dff;
  --primary-500: #645cff;
  --primary-600: #504acc;
  --primary-700: #3c3799;
  --primary-800: #282566;
  --primary-900: #141233;

  /* grey */
  --grey-50: #f8fafc;
  --grey-100: #f1f5f9;
  --grey-200: #e2e8f0;
  --grey-300: #cbd5e1;
  --grey-400: #94a3b8;
  --grey-500: #64748b;
  --grey-600: #475569;
  --grey-700: #334155;
  --grey-800: #1e293b;
  --grey-900: #0f172a;
  /* rest of the colors */
  --black: #222;
  --white: #fff;
  --red-light: #f8d7da;
  --red-dark: #842029;
  --green-light: #d1e7dd;
  --green-dark: #0f5132;

  --small-text: 0.875rem;
  --extra-small-text: 0.7em;
  /* rest of the vars */

  --border-radius: 0.25rem;
  --letter-spacing: 1px;
  --transition: 0.3s ease-in-out all;
  --max-width: 1120px;
  --fixed-width: 600px;
  --view-width: 90vw;
  /* box shadow*/
  --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  /* DARK MODE */
  --background-color: var(--grey-50);
  --text-color: var(--grey-900);
}

body {
  background: var(--background-color);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  line-height: 1;
  color: var(--text-color);
}
p {
  margin: 0;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 400;
  line-height: 1;
  text-transform: capitalize;
  letter-spacing: var(--letter-spacing);
}

h1 {
  font-size: clamp(2rem, 5vw, 5rem); /* Large heading */
}

h2 {
  font-size: clamp(1.5rem, 3vw, 3rem); /* Medium heading */
}

h3 {
  font-size: clamp(1.25rem, 2.5vw, 2.5rem); /* Small heading */
}

h4 {
  font-size: clamp(1rem, 2vw, 2rem); /* Extra small heading */
}

h5 {
  font-size: clamp(0.875rem, 1.5vw, 1.5rem); /* Tiny heading */
}

small,
.text-small {
  font-size: var(--small-text);
}

a {
  text-decoration: none;
}
ul {
  list-style-type: none;
  padding: 0;
}

.img {
  width: 100%;
  display: block;
  object-fit: cover;
}
/* buttons */

.btn {
  cursor: pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  letter-spacing: var(--letter-spacing);
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
}
.btn:hover {
  background: var(--primary-700);
  box-shadow: var(--shadow-3);
}
.btn-hipster {
  color: var(--primary-500);
  background: var(--primary-200);
}
.btn-hipster:hover {
  color: var(--primary-200);
  background: var(--primary-700);
}
.btn-block {
  width: 100%;
}

/* alerts */
.alert {
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
  border-color: transparent;
  border-radius: var(--border-radius);
}

.alert-danger {
  color: var(--red-dark);
  background: var(--red-light);
}
.alert-success {
  color: var(--green-dark);
  background: var(--green-light);
}
/* form */

.form {
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
}

.form-input {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  background: var(--background-color);
  border: 1px solid var(--grey-200);
}

main {
  padding: 5rem 0;
  min-height: 100vh;
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
}

/* title */
main h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.form {
  display: grid;
  grid-template-columns: 1fr 100px;
}

.form button {
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0.5rem;
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);
}
```
