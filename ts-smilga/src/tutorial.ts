/*
## Type Guarding

Type guarding is a term in TypeScript that refers to the ability to narrow down the type of an 
object within a certain scope. This is usually done using conditional statements that check the 
type of an object.

In the context of TypeScript, a type guard is some expression that performs a runtime check that 
guarantees the type in some scope.
*/

// ## Challenge - "typeof" guard
type ValueType = string | number | boolean;

let value: ValueType;
const random = Math.random();
value = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;

// - Define the function checkValue that takes one parameter value of type ValueType.
function checkValue(value: ValueType) {
  // - Inside the function, use an if statement to check if value is of type string.
  if (typeof value === "string") {
    // If it is, log value converted to lowercase and then return from the function.
    console.log(value.toLowerCase());
    return;
  }
  // - If value is not a string, use another if statement to check if value is of type number.
  if (typeof value === "number") {
    // If it is, log value formatted to two decimal places and then return from the function.
    console.log(value.toFixed(2));
    return;
  }
  // - If value is neither a string nor a number, it must be a boolean.
  // Log the string "boolean: " followed by the boolean value.
  console.log(`boolean ${value}`);
}
// - Finally, call the checkValue function with value as the argument.
checkValue(value);

/*
## Challenge - Equality Narrowing

In TypeScript, equality narrowing is a form of type narrowing that occurs when 
you use equality checks like === or !== in your code
*/
type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;

// - Define a function named makeSound that takes one parameter animal of type Animal.
function makeSound(animal: Animal) {
  // - Inside the function, use an if statement to check if animal.type is 'dog'.
  if (animal.type === "dog") {
    // - If animal.type is 'dog', TypeScript knows that animal is a Dog in this block.
    // In this case, call the bark method of animal.
    animal.bark();
  } else {
    // - If animal.type is not 'dog', TypeScript knows that animal is a Cat in the else block.
    // In this case, call the meow method of animal.
    animal.meow();
  }
}

// - Now you can call the makeSound function with an Animal as the argument.
// The function will call the appropriate method (bark or meow) depending on the type of the animal.
makeSound(animal);

/*
## Challenge - check for property

The "in" operator in TypeScript is used to narrow down the type of a variable when used in a 
conditional statement.It checks if a property or method exists on an object. If it exists, 
TypeScript will narrow the type to the one that has this property.
*/

// - Define a function named makeSound that takes one parameter animal of type Animal.
function makeSound(animal: Animal) {
  // - Inside the function, use an if statement with the in operator to check if the bark method exists on the animal object.
  if ("bark" in animal) {
    // - If the bark method exists on animal, TypeScript knows that animal is a Dog in this block.
    // In this case, call the bark method of animal.
    animal.bark();
  } else {
    // - If the bark method does not exist on animal, TypeScript knows that animal is a Cat in the else block.
    //  In this case, call the meow method of animal.
    animal.meow();
  }
}

// - Now you can call the makeSound function with an Animal as the argument.
// The function will call the appropriate method (bark or meow) depending on the type of the animal.
makeSound(animal);
