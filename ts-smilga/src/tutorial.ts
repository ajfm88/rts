/*
## Interface - Methods (more options)
It's generally a good practice to match the structure of the interface and the implementing 
object or class as closely as possible. This makes the code easier to understand and maintain.
So, if printAuthor is defined as a method in the Book interface, it would be more consistent 
to implement it as a method in the deepWork object.
*/
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

/*
## Challenge
*/

// - Start by defining an interface Computer using the interface keyword.
// This will serve as a blueprint for objects that will be of this type.
interface Computer {
  // - Inside the interface, define the properties that the object should have. In this case, we have id, brand, ram, and storage.

  // - Use the readonly keyword before the id property to indicate that it cannot be changed once it's set.
  readonly id: number; // cannot be changed once initialized
  brand: string;
  ram: number;
  // - Use the ? after the storage property to indicate that this property is optional and may not exist on all objects of this type.
  storage?: number; // optional property
  // - Also inside the interface, define any methods that the object should have.
  // In this case, we have upgradeRam, which is a function that takes a number and returns a number.
  upgradeRam(increase: number): number;
}

// - Now that we have our interface, we can create an object that adheres to this interface.
// This object should have all the properties defined in the interface
// (except for optional ones, which are... optional), and the methods should be implemented.
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

// - Finally, we can use our object. We can call its upgradeRam method to increase its RAM.
console.log(laptop.upgradeRam(4)); // upgrades RAM by 4GB
console.log(laptop);
