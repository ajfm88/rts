/*
## Classes - Private and Public Modifiers
*/
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

/*
## Classes - Shorthand Syntax

In TypeScript, if you want to use the shorthand for creating and initializing class properties in the constructor, 
you need to use public, private, or protected access modifiers.
*/
class Book2 {
  private checkedOut: boolean = false;
  constructor(
    public readonly title: string,
    public author: string,
  ) {}
}

/*
## Classes - Getters and Setters

Getters and setters are special methods in a class that allow you to control how a property 
is accessed and modified.They are used like properties, not methods, so you don't use parentheses 
to call them.
*/
class Book3 {
  private checkedOut: boolean = false;
  constructor(
    public readonly title: string,
    public author: string,
  ) {}
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

const deepWork2 = new Book3("deep work", "cal newport");
console.log(deepWork2.info);
// deepWork2.checkOut = true;
console.log(deepWork2.someInfo);
console.log(deepWork2.checkOut);

/*
## Classes - Implement Interface

In TypeScript, an interface is a way to define a contract for a certain 
structure of an object. This contract can then be used by a class to ensure 
it adheres to the structure defined by the interface.

When a class implements an interface, it is essentially promising that 
it will provide all the properties and methods defined in the interface. 
If it does not, TypeScript will throw an error at compile time.
*/
interface IPerson {
  name: string;
  age: number;
  greet(): void;
}

class Person implements IPerson {
  constructor(
    public name: string,
    public age: number,
  ) {}

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const hipster = new Person("shakeAndBake", 100);
hipster.greet();
