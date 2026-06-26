"use strict";

const path = require("path");
const axios = require("axios");

const ROOT = path.join(__dirname, "..");
const SOLUTION = path.join(ROOT, "index.js");
const BASE = "https://dummyjson.com";

const METRICS = [
  { key: "uniqueCartCount", label: "Top 3 by cart count" },
  { key: "sumQuantity", label: "Top 3 by total quantity" },
  { key: "sumExtendedTotal", label: "Top 3 by total extended price" },
];

// Reference implementation: log in, fetch the same live cart data the candidate
// sees, and derive the expected answer straight from it — so the expected values
// never drift from whatever dummyjson currently returns.
async function referenceAnswer() {
  const { data: login } = await axios.post(`${BASE}/auth/login`, {
    username: "emilys",
    password: "emilyspass",
  });
  const { data } = await axios.get(`${BASE}/carts`, {
    headers: { Authorization: `Bearer ${login.accessToken}` },
  });

  const acc = {};
  for (const cart of data.carts) {
    for (const p of cart.products) {
      if (!acc[p.id]) {
        acc[p.id] = { cartCount: 0, totalQuantity: 0, totalExtendedPrice: 0 };
      }
      acc[p.id].cartCount += 1;
      acc[p.id].totalQuantity += p.quantity;
      acc[p.id].totalExtendedPrice += p.total;
    }
  }

  const entries = Object.entries(acc);
  const top = (field) =>
    [...entries]
      .sort((a, b) => b[1][field] - a[1][field])
      .slice(0, 3)
      .map((e) => String(e[0]));

  return {
    uniqueCartCount: top("cartCount"),
    sumQuantity: top("totalQuantity"),
    sumExtendedTotal: top("totalExtendedPrice"),
  };
}

function asStrings(value) {
  return Array.isArray(value) ? value.map((v) => String(v)) : value;
}

function arraysEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((v, i) => v === b[i])
  );
}

async function runTests() {
  // Compute the expected answer from the live API.
  let expected;
  try {
    expected = await referenceAnswer();
  } catch (e) {
    return {
      ok: false,
      error: `Could not reach dummyjson.com to compute the expected answer: ${e.message}. Check your internet connection.`,
      cases: [],
      table: [],
    };
  }

  // Load the candidate solution fresh (so repeated runs pick up edits).
  delete require.cache[require.resolve(SOLUTION)];
  let getTopProducts;
  try {
    ({ getTopProducts } = require(SOLUTION));
  } catch (e) {
    return {
      ok: false,
      error: `Could not load index.js: ${e.message}`,
      cases: [],
      table: [],
    };
  }

  if (typeof getTopProducts !== "function") {
    return {
      ok: false,
      error: "index.js must export a getTopProducts function.",
      cases: [],
      table: [],
    };
  }

  let answer;
  try {
    answer = await getTopProducts();
  } catch (e) {
    return {
      ok: false,
      error: `getTopProducts() threw: ${e.message}`,
      cases: [],
      table: [],
    };
  }

  if (!answer || typeof answer !== "object") {
    return {
      ok: false,
      error:
        "getTopProducts() must return an object with uniqueCartCount, sumQuantity and sumExtendedTotal arrays.",
      cases: [],
      table: [],
    };
  }

  const cases = [];
  const table = [];
  for (const { key, label } of METRICS) {
    const exp = expected[key];
    const got = asStrings(answer[key]);
    const passed = arraysEqual(exp, got);
    cases.push({
      name: label,
      passed,
      detail: `expected [${exp.join(", ")}], got [${
        Array.isArray(got) ? got.join(", ") : got
      }]`,
    });
    table.push({
      metric: key,
      expected: exp,
      actual: Array.isArray(got) ? got : [String(got)],
      passed,
    });
  }

  return { ok: cases.every((c) => c.passed), error: null, cases, table };
}

module.exports = { runTests };

// CLI mode: `npm test`
if (require.main === module) {
  runTests()
    .then((result) => {
      console.log("\nREST API: Cart Aggregation — test results\n");
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
