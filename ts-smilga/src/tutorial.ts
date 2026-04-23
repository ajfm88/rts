/*
## Modules - Javascript Files

When you set "allowJs": true in your tsconfig.json, TypeScript will process JavaScript files 
and can infer types to a certain extent based on the structure and usage of your JavaScript code.

However, TypeScript's ability to infer types from JavaScript is not as robust as when working 
with TypeScript files. For example, it might not be able to infer complex types or types that 
depend on runtime behavior.
*/

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
