/*
## Type - "any"

In TypeScript, the "any" type is a powerful way to work with existing JavaScript, allowing you to opt-out of type-checking and let 
the values pass through compile-time checks. It means a variable declared with the any type can hold a value of any type. 
Later will also cover - "unknown" and "never"
*/
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

let random;

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

console.log(foundBook);

/*
The reason to explicitly type foundBook as string | undefined is to make it clear to anyone reading 
the code (including your future self) that foundBook might be undefined at runtime. 
This is a good practice in TypeScript because it helps prevent bugs related to undefined values.
*/

/*
## Challenge

- Create a variable orderStatus of type 'processing' | 'shipped' | 'delivered' and assign it the value 'processing'.
Then, try to assign it the values 'shipped' and 'delivered'.
- Create a variable discount of type number | string and assign it the value 20. Then, try to assign it the value '20%'.
*/

// 1. Order Status
let orderStatus: "processing" | "shipped" | "delivered" = "processing";
orderStatus = "shipped";
orderStatus = "delivered";
// orderStatus = 'cancelled'; // This will result in a TypeScript error

// 2. Discount
let discount: number | string = 20;
discount = "20%";
// discount = true; // This will result in a TypeScript error
