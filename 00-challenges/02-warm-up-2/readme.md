# Warm-up 2: Word Frequency Counter

**Difficulty:** Easy

---

## Problem

Write a function `wordCount(str)` that takes a string and returns an object mapping each unique word to the number of times it appears in the string.

---

## Examples

**Example 1**
```
Input:  "Hello, hello! How are you? You are great."
Output: { hello: 2, how: 1, are: 2, you: 2, great: 1 }
```

**Example 2**
```
Input:  "Cat cat CAT"
Output: { cat: 3 }
```

**Example 3**
```
Input:  "JavaScript"
Output: { javascript: 1 }
```

**Example 4**
```
Input:  ""
Output: {}
```

---

## Constraints

- **Case-insensitive:** `"Hello"` and `"hello"` count as the same word.
- **Ignore punctuation** such as commas, periods, exclamation marks, and question marks.
- Words are separated by spaces.

---

## How to Run

```bash
node problem2.js
```

Tests will print `PASS` or `FAIL` with expected vs received values.

---

## Hints

<details>
<summary>Hint 1</summary>
Use <code>.toLowerCase()</code> to normalize case, then <code>.replace()</code> with a regex to strip punctuation before splitting.
</details>

<details>
<summary>Hint 2</summary>
Split on spaces with <code>.split(" ")</code> and filter out empty strings, then build the frequency object with <code>.reduce()</code>.
</details>

<details>
<summary>Hint 3</summary>
For each word, check if it already exists in the accumulator object. If it does, increment the count; if not, initialize it to <code>1</code>.
</details>
