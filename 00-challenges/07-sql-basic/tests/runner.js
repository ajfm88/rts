"use strict";

const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const ROOT = path.join(__dirname, "..");
const SCHEMA = path.join(ROOT, "db", "schema.sql");
const SEED = path.join(ROOT, "db", "seed.sql");
const REFERENCE = path.join(__dirname, "reference.sql");
const SOLUTION = path.join(ROOT, "solution.sql");

// Strip SQL comments and a trailing semicolon so a single statement can be run.
function cleanSql(sql) {
  return sql
    .replace(/\/\*[\s\S]*?\*\//g, "") // /* block comments */
    .replace(/--[^\n]*/g, "") // -- line comments
    .trim()
    .replace(/;\s*$/, "")
    .trim();
}

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

// Run a single SELECT and return rows as [{ iban, amount }, ...].
// `amount` is rounded to 2 decimals for stable comparison.
function runQuery(db, sql) {
  const cleaned = cleanSql(sql);
  if (!cleaned) {
    throw new Error("Query is empty. Write your SELECT statement in solution.sql.");
  }
  const result = db.exec(cleaned);
  if (result.length === 0) {
    return { columns: [], rows: [] };
  }
  const { columns, values } = result[0];
  const rows = values.map((row) => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
  return { columns, rows };
}

// Normalise to a comparable shape: [{ iban, amount(2dp) }]
function normalise(rows) {
  return rows.map((r) => ({
    iban: r.iban,
    amount: r.amount === null || r.amount === undefined ? r.amount : round2(r.amount),
  }));
}

function rowsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((row, i) => row.iban === b[i].iban && row.amount === b[i].amount);
}

async function runTests() {
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(ROOT, "node_modules", "sql.js", "dist", file),
  });

  const db = new SQL.Database();
  db.run(fs.readFileSync(SCHEMA, "utf8"));
  db.run(fs.readFileSync(SEED, "utf8"));

  // Expected result, derived from the reference query.
  const expected = normalise(runQuery(db, fs.readFileSync(REFERENCE, "utf8")).rows);

  // Candidate's query.
  const solutionSql = fs.readFileSync(SOLUTION, "utf8");
  let actualResult;
  let error = null;
  try {
    actualResult = runQuery(db, solutionSql);
  } catch (e) {
    error = e.message;
  } finally {
    db.close();
  }

  if (error) {
    return {
      ok: false,
      error,
      expected,
      actual: [],
      cases: [{ name: "Query runs without error", passed: false, detail: error }],
    };
  }

  const columns = actualResult.columns;
  const actual = normalise(actualResult.rows);

  const hasColumns =
    columns.length === 2 && columns.includes("iban") && columns.includes("amount");
  const noNonPositive = actual.every((r) => r.amount > 0);
  const roundedTo2 = actualResult.rows.every((r) => round2(r.amount) === r.amount);
  const sortedDesc = actual.every((r, i) => i === 0 || actual[i - 1].amount >= r.amount);
  const matchesExpected = rowsEqual(actual, expected);

  const cases = [
    {
      name: "Query runs without error",
      passed: true,
      detail: `Returned ${actual.length} row(s).`,
    },
    {
      name: "Returns exactly the columns: iban, amount",
      passed: hasColumns,
      detail: `Got columns: [${columns.join(", ")}]`,
    },
    {
      name: "Excludes non-positive balances (amount > 0)",
      passed: noNonPositive,
      detail: noNonPositive ? "No zero or negative balances returned." : "Found amount <= 0.",
    },
    {
      name: "Amounts are formatted to 2 decimal places",
      passed: roundedTo2,
      detail: roundedTo2 ? "All amounts rounded to 2 dp." : "Some amounts are not 2 dp.",
    },
    {
      name: "Sorted by amount in descending order",
      passed: sortedDesc,
      detail: sortedDesc ? "Order is correct." : "Rows are not in descending order.",
    },
    {
      name: "Result set matches the expected output",
      passed: matchesExpected,
      detail: matchesExpected
        ? "Exact match."
        : `Expected ${expected.length} row(s), got ${actual.length}.`,
    },
  ];

  return {
    ok: cases.every((c) => c.passed),
    error: null,
    expected,
    actual,
    cases,
  };
}

module.exports = { runTests };

// CLI mode: `npm test`
if (require.main === module) {
  runTests()
    .then((result) => {
      console.log("\nSQL: Billing Software Report — test results\n");
      result.cases.forEach((c) => {
        console.log(`  ${c.passed ? "PASS" : "FAIL"}  ${c.name}`);
        if (c.detail) console.log(`        ${c.detail}`);
      });
      if (result.error) {
        console.log(`\n  SQL error: ${result.error}`);
      }
      const passed = result.cases.filter((c) => c.passed).length;
      console.log(`\n  ${passed}/${result.cases.length} checks passed.\n`);
      // Use exitCode (not process.exit) so the sql.js WASM runtime tears down
      // cleanly on Windows instead of tripping a libuv assertion.
      process.exitCode = result.ok ? 0 : 1;
    })
    .catch((err) => {
      console.error("Runner crashed:", err);
      process.exitCode = 1;
    });
}
