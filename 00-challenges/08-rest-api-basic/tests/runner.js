"use strict";

const fs = require("fs");
const path = require("path");
const { startMockServer } = require("../mock/server");

const ROOT = path.join(__dirname, "..");
const INVENTORY = path.join(ROOT, "mock", "inventory.json");
const CASES = path.join(__dirname, "cases.json");
const SOLUTION = path.join(ROOT, "index.js");

// Reference implementation: derive the expected answer straight from the data,
// so the cases never drift from mock/inventory.json.
function expectedFor(barcode, records) {
  const match = records.filter((r) => String(r.barcode) === String(barcode));
  if (match.length === 0) return -1;
  const { price, discount } = match[0];
  return Math.round(price - (discount / 100) * price);
}

async function runTests() {
  const records = JSON.parse(fs.readFileSync(INVENTORY, "utf8"));
  const { barcodes } = JSON.parse(fs.readFileSync(CASES, "utf8"));

  // Stand up the mock API and point the solution at it.
  const { server, port } = await startMockServer(0);
  process.env.API_URL = `http://localhost:${port}`;

  // Load the candidate solution fresh (so repeated runs pick up edits).
  delete require.cache[require.resolve(SOLUTION)];
  let getDiscountedPrice;
  try {
    ({ getDiscountedPrice } = require(SOLUTION));
  } catch (e) {
    server.close();
    return {
      ok: false,
      error: `Could not load solution: ${e.message}`,
      cases: [],
      table: [],
    };
  }

  if (typeof getDiscountedPrice !== "function") {
    server.close();
    return {
      ok: false,
      error: "index.js must export a getDiscountedPrice function.",
      cases: [],
      table: [],
    };
  }

  const cases = [];
  const table = [];
  for (const barcode of barcodes) {
    const expected = expectedFor(barcode, records);
    let actual;
    let passed;
    let detail;
    try {
      actual = await getDiscountedPrice(Number(barcode));
      passed = Math.round(actual) === expected;
      detail = `expected ${expected}, got ${actual}`;
    } catch (e) {
      actual = `error: ${e.message}`;
      passed = false;
      detail = `threw: ${e.message} (expected ${expected})`;
    }
    cases.push({ name: `barcode ${barcode}`, passed, detail });
    table.push({ barcode, expected, actual, passed });
  }

  server.close();

  return { ok: cases.every((c) => c.passed), error: null, cases, table };
}

module.exports = { runTests };

// CLI mode: `npm test`
if (require.main === module) {
  runTests()
    .then((result) => {
      console.log("\nREST API: Discounted Price — test results\n");
      if (result.error) console.log(`  ${result.error}\n`);
      result.cases.forEach((c) => {
        console.log(`  ${c.passed ? "PASS" : "FAIL"}  ${c.name}`);
        if (c.detail) console.log(`        ${c.detail}`);
      });
      const passed = result.cases.filter((c) => c.passed).length;
      console.log(`\n  ${passed}/${result.cases.length} test cases passed.\n`);
      process.exitCode = result.ok ? 0 : 1;
    })
    .catch((err) => {
      console.error("Runner crashed:", err);
      process.exitCode = 1;
    });
}
