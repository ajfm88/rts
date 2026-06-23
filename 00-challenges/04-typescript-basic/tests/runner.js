"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TESTS_DIR = __dirname;
const DIST = path.join(ROOT, "dist", "shoppingCart.js");
const TSC = path.join(ROOT, "node_modules", "typescript", "bin", "tsc");

// Compile shoppingCart.ts -> dist/shoppingCart.js using the project's tsconfig.
// Returns null on success, or a compiler-error string to surface to the user.
function compile() {
  try {
    execFileSync(process.execPath, [TSC, "-p", path.join(ROOT, "tsconfig.json")], {
      cwd: ROOT,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return null;
  } catch (e) {
    // tsc prints diagnostics to stdout; include stderr as a fallback.
    const out = (e.stdout || "") + (e.stderr || "");
    return out.trim() || e.message;
  }
}

// Each tests/inputN.txt is piped to the compiled program over stdin; the
// trimmed stdout is compared against tests/outputN.txt.
async function runTests() {
  if (!fs.existsSync(TSC)) {
    return {
      ok: false,
      error: 'TypeScript is not installed. Run "npm install" in this folder first.',
      cases: [],
    };
  }

  const compileError = compile();
  if (compileError) {
    return {
      ok: false,
      error: "TypeScript failed to compile:\n\n" + compileError,
      cases: [],
    };
  }

  const inputFiles = fs
    .readdirSync(TESTS_DIR)
    .filter((f) => /^input\d+\.txt$/.test(f))
    .sort();

  const cases = [];
  for (const inputFile of inputFiles) {
    const num = inputFile.match(/\d+/)[0];
    const outputPath = path.join(TESTS_DIR, `output${num}.txt`);
    if (!fs.existsSync(outputPath)) continue;

    const input = fs.readFileSync(path.join(TESTS_DIR, inputFile), "utf-8");
    const expected = fs.readFileSync(outputPath, "utf-8").trim();

    try {
      const actual = execFileSync(process.execPath, [DIST], {
        input,
        encoding: "utf-8",
        timeout: 5000,
      }).trim();

      cases.push({
        name: `Test Case ${num}`,
        passed: actual === expected,
        detail: actual === expected ? "" : `Expected: ${expected}\nGot:      ${actual}`,
      });
    } catch (err) {
      cases.push({
        name: `Test Case ${num}`,
        passed: false,
        detail: "Runtime error:\n" + String(err.message).split("\n")[0],
      });
    }
  }

  return {
    ok: cases.length > 0 && cases.every((c) => c.passed),
    error: null,
    cases,
  };
}

module.exports = { runTests };

// CLI mode: `npm test`
if (require.main === module) {
  runTests()
    .then((result) => {
      console.log("\nTypeScript: Shopping Cart Total — test results\n");
      if (result.error) console.log(result.error + "\n");
      result.cases.forEach((c) => {
        console.log(`  ${c.passed ? "PASS" : "FAIL"}  ${c.name}`);
        if (c.detail) console.log("        " + c.detail.replace(/\n/g, "\n        "));
      });
      const passed = result.cases.filter((c) => c.passed).length;
      console.log(`\n  ${passed}/${result.cases.length} tests passed.\n`);
      process.exitCode = result.ok ? 0 : 1;
    })
    .catch((err) => {
      console.error("Runner crashed:", err);
      process.exitCode = 1;
    });
}
