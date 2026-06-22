// Problem 2: Word Frequency Counter
//
// Write a function that takes a string and returns an object mapping each
// unique word to the number of times it appears in the string.
//
// Constraints:
// - Case-insensitive: "Hello" and "hello" count as the same word
// - Ignore punctuation such as commas, periods, and exclamation marks
//
// Example:
// wordCount("Hello, hello! How are you? You are great.")
// => { hello: 2, how: 1, are: 2, you: 2, great: 1 }

function wordCount(str) {
  // your code here
}

// --- Tests ---

function assert(description, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? "PASS" : "FAIL"}: ${description}`);
  if (!pass) {
    console.log("  Expected:", expected);
    console.log("  Got:     ", actual);
  }
}

assert(
  "counts words and handles punctuation",
  wordCount("Hello, hello! How are you? You are great."),
  { hello: 2, how: 1, are: 2, you: 2, great: 1 },
);

assert("is case-insensitive", wordCount("Cat cat CAT"), { cat: 3 });

assert("handles a single word", wordCount("JavaScript"), { javascript: 1 });

assert("returns empty object for empty string", wordCount(""), {});
