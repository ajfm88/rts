"use strict";

// Minimal DOM stub so script.js can be loaded in Node without a browser
global.document = {
  querySelectorAll: () => [],
  getElementById: () => ({
    classList: { remove() {}, add() {}, contains() { return false; } },
    addEventListener() {},
  }),
  querySelector: () => ({ innerText: "" }),
};

const { checkWinner } = require("../script.js");

const E = "";
const tests = [
  {
    name: "row win — top row X",
    board: [["X", "X", "X"], [E, E, E], [E, E, E]],
    expected: "X",
  },
  {
    name: "row win — middle row O",
    board: [[E, E, E], ["O", "O", "O"], [E, E, E]],
    expected: "O",
  },
  {
    name: "column win — left column X",
    board: [["X", E, E], ["X", E, E], ["X", E, E]],
    expected: "X",
  },
  {
    name: "column win — right column O",
    board: [[E, E, "O"], [E, E, "O"], [E, E, "O"]],
    expected: "O",
  },
  {
    name: "main diagonal win (top-left → bottom-right)",
    board: [["X", E, E], [E, "X", E], [E, E, "X"]],
    expected: "X",
  },
  {
    name: "anti-diagonal win (top-right → bottom-left)",
    board: [[E, E, "O"], [E, "O", E], ["O", E, E]],
    expected: "O",
  },
  {
    name: "empty-cell guard — no false win on empty rows",
    board: [[E, E, E], ["X", "X", "X"], [E, E, E]],
    expected: "X",
  },
  {
    name: "no winner — returns null",
    board: [["X", "O", "X"], ["X", "O", "O"], ["O", "X", E]],
    expected: null,
  },
];

let passed = 0;
for (const { name, board, expected } of tests) {
  const got = checkWinner(board);
  const ok = got === expected;
  console.log(`${ok ? "PASS" : "FAIL"} — ${name}`);
  if (!ok) console.log(`       expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}`);
  if (ok) passed++;
}

console.log(`\n${passed}/${tests.length} passed`);
process.exitCode = passed === tests.length ? 0 : 1;
