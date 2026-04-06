/*
## Objects - Fundamentals

In TypeScript, an object is a collection of key-value pairs with specified types for each key, 
providing static type checking for properties.
*/
let car: { brand: string; year: number } = { brand: "toyota", year: 2020 };

car.brand = "ford";
// car.color = 'blue'

let car1: { brand: string; year: number } = { brand: "audi", year: 2022 };

let book = { title: "book", cost: 20 };
let pen = { title: "pen", cost: 10 };
let notebook = { title: "notebook" };

let items: { readonly title: string; cost?: number }[] = [book, pen, notebook];
// items[0].title = "new book"; // Error: Cannot assign to 'title' because it is a read-only property

/*
## Challenge
- Create an object bike of type { brand: string, year: number } and assign it some values. 
Then, try to assign a string to the year property.
- Create an object laptop of type { brand: string, year: number } and try to assign an object 
with missing year property to it.
- Create an array products of type { title: string, price?: number }[] and assign it some values. 
Then, try to add an object with a price property of type string to it.
*/

// 1. Bike
let bike: { brand: string; year: number } = { brand: "Yamaha", year: 2010 };
// bike.year = 'a string' // This will result in a TypeScript error

// 2. Laptop
let laptop: { brand: string; year: number } = { brand: "Dell", year: 2020 };
// let laptop2: { brand: string; year: number } = { brand: "HP" }; // This will result in a TypeScript error

// 3. Products
let product1 = { title: "Shirt", price: 20 };
let product2 = { title: "Pants" };
let products: { title: string; price?: number }[] = [product1, product2];
// products.push({ title: "socks", price: "expensive" }); // This will result in a TypeScript error
