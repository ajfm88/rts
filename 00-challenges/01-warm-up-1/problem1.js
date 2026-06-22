const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    isActive: true,
    isVerified: true,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    isActive: false,
    isVerified: true,
  },
  {
    id: 3,
    name: "Carol",
    email: "carol@example.com",
    isActive: true,
    isVerified: false,
  },
  {
    id: 4,
    name: "Dave",
    email: "dave@example.com",
    isActive: true,
    isVerified: true,
  },
  {
    id: 5,
    name: "Eve",
    email: "eve@example.com",
    isActive: false,
    isVerified: false,
  },
];

// Return an array of email addresses for users who are both active AND have verified their email.
const result = users;
// your code here

const expected = ["alice@example.com", "dave@example.com"];
const pass = JSON.stringify(result) === JSON.stringify(expected);
console.log(
  pass
    ? "PASS"
    : `FAIL\n  Expected: ${JSON.stringify(expected)}\n  Got:      ${JSON.stringify(result)}`,
);
