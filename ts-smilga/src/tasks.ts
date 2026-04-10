/*
## Type Alias

A type alias in TypeScript is a new name or shorthand for an existing type, making it easier to reuse complex types. 
However, it's important to note that it doesn't create a new unique type - it's just an alias.All the same rules apply 
to the aliased type, including the ability to mark properties as optional or readonly.
*/
/*
With no Type Alias
*/
const jack: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "jack",
  isActive: true,
};
const sally: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "sally",
  isActive: false,
};

function createUserNoTypeAlias(user: { id: number; name: string; isActive: boolean }): {
  id: number;
  name: string;
  isActive: boolean;
} {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);

  return user;
}
/*
With Type Alias
*/
type User = { id: number; name: string; isActive: boolean };

const john: User = {
  id: 1,
  name: "john",
  isActive: true,
};
const susan: User = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}
/*
Type Alias - Additional info
*/
type StringOrNumber = string | number; // Type alias for string | number

let value: StringOrNumber;
value = "hello"; // This is valid
value = 123; // This is also valid

type Theme = "light" | "dark"; // Type alias for theme

let theme: Theme;
theme = "light"; // This is valid
theme = "dark"; // This is also valid

// Function that accepts the Theme type alias
function setTheme(t: Theme) {
  theme = t;
}

setTheme("dark"); // This will set the theme to 'dark'
/*
Type Alias Challenge
*/
// - Define the Employee type: Create a type Employee with properties id (number), name (string), and department (string).
type Employee = { id: number; name: string; department: string };
// - Define the Manager type: Create a type Manager with properties id (number), name (string), and employees (an array of Employee).
type Manager = { id: number; name: string; employees: Employee[] };
// - Create a Union Type: Define a type Staff that is a union of Employee and Manager.
type Staff = Employee | Manager;
// - Create the printStaffDetails function: This function should accept a parameter of type Staff.
function printStaffDetails(staff: Staff) {
  //  Inside the function, use a type guard to check if the 'employees' property exists in the passed object.
  if ("employees" in staff) {
    //  If it does, print a message indicating that the person is a manager and the number of employees they manage.
    console.log(`${staff.name} is a manager of ${staff.employees.length} employees.`);
  } else {
    //  If it doesn't, print a message indicating that the person is an employee and the department they belong to.
    console.log(`${staff.name} is an employee in the ${staff.department} department.`);
  }
}

// - Create Employee and Manager objects: Create two Employee objects. One named alice and second named steve.
const alice: Employee = { id: 1, name: "Alice", department: "Sales" };
const steve: Employee = { id: 1, name: "Steve", department: "HR" };
//  Also create a Manager object named bob who manages alice and steve.
const bob: Manager = { id: 2, name: "Bob", employees: [alice, steve] };
// - Test the function: Call the printStaffDetails function with alice and bob as arguments and verify the output.
printStaffDetails(alice); // Outputs: Alice is an employee in the Sales department.
printStaffDetails(bob);
