# Tic-Tac-Toe — Technical Interview Practice

## How to Run

**Play the game:** open `index.html` with Live Server in VS Code.

**Run the tests:** from the `10-js-tic-tac-toe` folder:

```
node tests/runner.js
```

---

## The Challenge

You are given a **fully working** Tic-Tac-Toe game. The board renders, players can click cells, and turns swap correctly.

Your only job is to **implement the `checkWinner` function** and **wire it into `handleClick`**.

---

## The Board

The game tracks state in a 3×3 nested array called `boardState`:

```js
const boardState = [
  ["", "", ""], // row 0
  ["", "", ""], // row 1
  ["", "", ""], // row 2
];
```

Each cell is `"X"`, `"O"`, or `""` (empty).  
Rows are the outer index, columns are the inner index — so `boardState[row][col]`.

---

## Win Conditions

There are **8** ways to win:

**3 rows**

```
["X", "X", "X"]
["", "", ""]
["", "", ""]
```

**3 columns**

```
["X", "", ""]
["X", "", ""]
["X", "", ""]
```

**2 diagonals**

```
["X", "", ""]
["", "X", ""]
["", "", "X"]

["", "", "X"]
["", "X", ""]
["X", "", ""]
```

---

## Your Task

Inside `script.js`, two things are missing:

### 1. Write `checkWinner(board)`

```js
function checkWinner(board) {
  // TODO: check rows
  // TODO: check columns
  // TODO: check diagonals
  // return "X", "O", or null
}
```

The function receives the `boardState` 2D array and returns `"X"`, `"O"`, or `null` (no winner yet).

### 2. Wire it into `handleClick`

```js
function handleClick(e) {
  // place mark  ← already done
  // check for win   ← YOUR CODE HERE
  // check for draw  ← YOUR CODE HERE
  // switch turns    ← already done
}
```

---

# Tic-Tac-Toe — Technical Interview Practice

## How to Run

**Play the game:** open `index.html` with Live Server in VS Code.

**Run the tests:** from the `05-js-tic-tac-toe` folder:

```
node tests/runner.js
```

---

## The Challenge

You are given a **fully working** Tic-Tac-Toe game. The board renders, players can click cells, and turns swap correctly.

Your only job is to **implement the `checkWinner` function** and **wire it into `handleClick`**.

---

## The Board

The game tracks state in a 3×3 nested array called `boardState`:

```js
const boardState = [
  ["", "", ""], // row 0
  ["", "", ""], // row 1
  ["", "", ""], // row 2
];
```

Each cell is `"X"`, `"O"`, or `""` (empty).  
Rows are the outer index, columns are the inner index — so `boardState[row][col]`.

---

## Win Conditions

There are **8** ways to win:

**3 rows**

```
["X", "X", "X"]
["", "", ""]
["", "", ""]
```

**3 columns**

```
["X", "", ""]
["X", "", ""]
["X", "", ""]
```

**2 diagonals**

```
["X", "", ""]
["", "X", ""]
["", "", "X"]

["", "", "X"]
["", "X", ""]
["X", "", ""]
```

---

## Your Task

Inside `script.js`, two things are missing:

### 1. Write `checkWinner(board)`

```js
function checkWinner(board) {
  // TODO: check rows
  // TODO: check columns
  // TODO: check diagonals
  // return "X", "O", or null
}
```

The function receives the `boardState` 2D array and returns `"X"`, `"O"`, or `null` (no winner yet).

### 2. Wire it into `handleClick`

```js
function handleClick(e) {
  // place mark  ← already done
  // check for win   ← YOUR CODE HERE
  // check for draw  ← YOUR CODE HERE
  // switch turns    ← already done
}
```

---

## Key Concepts to Remember

| Concept       | Detail                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Falsy guard   | Check `board[r][0] &&` before comparing so empty cells don't fake a win |
| Row loop      | Outer index `r` is fixed, inner index `0/1/2` varies                    |
| Column loop   | Inner index `c` is fixed, outer index `0/1/2` varies                    |
| Main diagonal | `[0][0]`, `[1][1]`, `[2][2]` — row and col are equal                    |
| Anti diagonal | `[0][2]`, `[1][1]`, `[2][0]` — row + col = 2                            |
| Return value  | Return the winning symbol (`"X"` or `"O"`), not `true`/`false`          |
