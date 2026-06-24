const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]",
);
const restartButton = document.getElementById("restartButton");
let circleTurn;

const boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  boardState.forEach((row, r) =>
    row.forEach((_, c) => (boardState[r][c] = "")),
  );
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
  setBoardHoverClass();
}

function handleClick(e) {
  // place mark
  const cell = e.target;
  console.log(cell);
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  // check for win   ← YOUR CODE HERE
  if (checkWinner(boardState)) {
    declareWin();
    // check for draw  ← YOUR CODE HERE
  } else if (isDraw()) {
    declareDraw();
    // switch turns
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function checkWinner(board) {
  // TODO: check rows
  // horizontal win
  for (let r = 0; r < 3; r++) {
    if (
      board[r][0] &&
      board[r][0] === board[r][1] &&
      board[r][1] === board[r][2]
    ) {
      return board[r][0];
    }
  }
  // TODO: check columns
  // vertical win
  for (let c = 0; c < 3; c++) {
    if (
      board[0][c] &&
      board[0][c] === board[1][c] &&
      board[1][c] === board[2][c]
    ) {
      return board[0][c];
    }
  }
  // TODO: check diagonals
  // left to right diagonal
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }
  // right to left diagonal
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }
  // return "X", "O", or null
  return null;
}

function isDraw() {
  return [...cellElements].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS),
  );
}

function declareWin() {
  winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  winningMessageElement.classList.add("show");
}

function declareDraw() {
  winningMessageTextElement.innerText = "Draw!";
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  boardState[row][col] = circleTurn ? "O" : "X";
  console.log(boardState);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

if (typeof module !== "undefined") module.exports = { checkWinner };
