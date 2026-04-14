/*
## Interface - Merging, Extend, TypeGuard
*/
interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

// Merging (reopening) an interface in TypeScript is a process where you declare an
// interface with the same name more than once, and TypeScript will merge their members.

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

// Extending an interface in TypeScript is a way to create a new interface that inherits
// the properties and methods of an existing interface. You use the extends keyword to
// do this. When you extend an interface, the new interface will have all the members
// of the base interface, plus any new members that you add.

// Extending the interface
interface Employee extends Person {
  employeeId: number;
}

const employee2: Employee = {
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

const manager2: Manager = {
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

/*
## Challenge - Part 1
*/

//Define the Person interface: Start by defining a Person interface with a name property of type string.
interface Person {
  name: string;
}

//Define the DogOwner interface: Next, define a DogOwner interface that extends Person and adds a
//dogName property of type string.
interface DogOwner extends Person {
  dogName: string;
}

//Define the Manager interface: Then, define a Manager interface that extends Person and adds two methods:
// managePeople and delegateTasks. Both methods should have a return type of void.
interface Manager extends Person {
  managePeople(): void;
  delegateTasks(): void;
}

//Define the getEmployee function: Now, define a function called getEmployee that returns a Person, DogOwner, or Manager.
// Inside this function, generate a random number and use it to decide which type of object to return.
// If the number is less than 0.33, return a Person. If it's less than 0.66, return a DogOwner.
// Otherwise, return a Manager.
function getEmployee(): Person | DogOwner | Manager {
  const random = Math.random();

  if (random < 0.33) {
    return {
      name: "mark",
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

//Finally, create a variable called employee that can be a Person, DogOwner, or Manager, and assign it the return value of getEmployee.
// Then, log employee to the console.
const employee: Person | DogOwner | Manager = getEmployee();
console.log(employee);
