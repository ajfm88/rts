/*
## Generics - Promise Example
*/
// A Promise in JavaScript (and thus TypeScript) is an object representing
// the eventual completion or failure of an asynchronous operation.

async function someFunc(): Promise<string> {
  return "Hello World";
}

const result = someFunc();

/*
## Generics - Generate Array
*/

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

/*
## Generics - Multiple types
*/
function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

// Usage
let result2 = pair<number, string>(123, "Hello");
console.log(result); // Output: [123, "Hello"]
