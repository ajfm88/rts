/*
## Challenge - Type Predicate

A type predicate is a function whose return type is a special kind of type that 
can be used to narrow down types within conditional blocks.
*/

// - Define the Person and Student types. Student should have a study method.
type Student = {
  name: string;
  study: () => void;
};
// Person should have a login method.
type User = {
  name: string;
  login: () => void;
};

type Person = Student | User;

const randomPerson = (): Person => {
  return Math.random() > 0.5
    ? { name: "mark", study: () => console.log("Studying") }
    : { name: "mary", login: () => console.log("Logging in") };
};

const person = randomPerson();

// - Create a function named isStudent that takes a parameter person of type Person.
// - In the function signature, specify a return type that is a type predicate: person is Student.
function isStudent(person: Person): person is Student {
  // - In the function body, use a type assertion to treat person as a Student,
  // and check if the study - method is not undefined. This will return true if
  // person is a Student, and false otherwise.
  return (person as Student).study !== undefined;
}

// - Use the isStudent function in an if statement with person as the argument.
if (isStudent(person)) {
  // - In the if block (where isStudent(person) is true), call the study method on person.
  // TypeScript knows that person is a Student in this block, so this is safe.
  person.study(); // This is safe because TypeScript knows that 'person' is a Student.
} else {
  // - In the else block (where isStudent(person) is false), call the login method on person.
  // This is safe because if person is not a Student, it must be a Person, and all Person objects have a login method.
  person.login();
}

/*
 ## Optional - type "never" gotcha
*/

const person2: Person = {
  name: "anna",
  study: () => console.log("Studying"),
  // login: () => console.log('Logging in'),
};
// person2;
function isStudent2(person2: Person): person2 is Student {
  // return 'study' in person2;
  return (person2 as Student).study !== undefined;
}

// Usage

if (isStudent2(person2)) {
  person2.study(); // This is safe because TypeScript knows that 'person2' is a Student.
} else {
  // in this case person2 is type "never"
  console.log(person2);
}
