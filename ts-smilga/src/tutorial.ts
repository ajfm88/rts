/*
## Arrays - Fundamentals

In TypeScript, arrays are used to store multiple values in a single variable. 
You can define the type of elements that an array can hold using type annotations.
*/
let prices: number[] = [100, 75, 42];
// prices.push('hello')

let fruit: string[] = ["apple", "orange"];

// let randomValues: [] = ["hello"];
let emptyValues: number[] = [];

let names = ["peter", "susan", 1];
let array: (string | boolean)[] = ["apple", true, "orange", false];

/*
## Challenge

- Create an array temperatures of type number[] and assign it some values. Then, try to add a string value to it.
- Create an array colors of type string[] and assign it some values. Then, try to add a boolean value to it.
- Create an array mixedArray of type (number | string)[] and assign it some values. Then, try to add a boolean value to it.
*/

// 1. Temperatures
let temperatures: number[] = [45, 65, 75, 21];
// temperatures.push("hot");

// 2. Colors
let colors: string[] = ["red", "blue", "purple"];
// colors.push(true)

// 3. Mixed Array
let mixedArray: (number | string)[] = [42, "Alejandro"];
