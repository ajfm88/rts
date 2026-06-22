# Warm-up 1: Active & Verified Users

**Difficulty:** Easy

---

## Problem

You are given an array of user objects. Each user has the following shape:

```js
{
  id: number,
  name: string,
  email: string,
  isActive: boolean,
  isVerified: boolean,
}
```

Return an array of **email addresses** for users who are **both** active (`isActive: true`) **and** have verified their email (`isVerified: true`).

---

## Example

```js
const users = [
  { id: 1, name: "Alice", email: "alice@example.com", isActive: true,  isVerified: true  },
  { id: 2, name: "Bob",   email: "bob@example.com",   isActive: false, isVerified: true  },
  { id: 3, name: "Carol", email: "carol@example.com", isActive: true,  isVerified: false },
  { id: 4, name: "Dave",  email: "dave@example.com",  isActive: true,  isVerified: true  },
  { id: 5, name: "Eve",   email: "eve@example.com",   isActive: false, isVerified: false },
];

// Expected output:
["alice@example.com", "dave@example.com"]
```

Bob is excluded (not active). Carol is excluded (not verified). Eve is excluded (neither).

---

## Constraints

- The order of the returned emails must match the order they appear in the input array.
- Use `.filter()` and `.map()` on the `users` array.

---

## How to Run

```bash
node problem1.js
```

Tests will print `PASS` or `FAIL` with expected vs received values.

---

## Hints

<details>
<summary>Hint 1</summary>
Chain <code>.filter()</code> to keep only users where both <code>isActive</code> and <code>isVerified</code> are <code>true</code>.
</details>

<details>
<summary>Hint 2</summary>
Chain <code>.map()</code> after the filter to extract just the <code>email</code> property from each remaining user.
</details>
