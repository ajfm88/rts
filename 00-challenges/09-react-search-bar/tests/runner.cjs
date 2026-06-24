"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const VITEST = path.join(ROOT, "node_modules", "vitest", "vitest.mjs");
const OUT = path.join(ROOT, ".vitest-result.json");

// Run the vitest suite (jest-compatible JSON reporter) and reshape it into the
// { ok, error, cases } structure the shell understands.
async function runTests() {
  if (!fs.existsSync(VITEST)) {
    return { ok: false, error: 'Vitest is not installed. Run "npm install" in this folder first.', cases: [] };
  }

  try {
    fs.rmSync(OUT, { force: true });
  } catch (_) {}

  try {
    execFileSync(
      process.execPath,
      [VITEST, "run", "--reporter=json", "--outputFile=" + OUT],
      { cwd: ROOT, encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] }
    );
  } catch (e) {
    // Vitest exits non-zero when tests fail; the JSON file is still written.
    if (!fs.existsSync(OUT)) {
      const out = stripAnsi((e.stdout || "") + (e.stderr || "")).trim();
      return { ok: false, error: "Could not run the test suite:\n\n" + out.slice(0, 1500), cases: [] };
    }
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(OUT, "utf-8"));
  } catch (e) {
    return { ok: false, error: "Could not parse the test results.", cases: [] };
  }

  const cases = [];
  for (const file of data.testResults || []) {
    for (const a of file.assertionResults || []) {
      cases.push({
        name: a.title || a.fullName,
        passed: a.status === "passed",
        detail:
          a.status === "passed"
            ? ""
            : stripAnsi((a.failureMessages || []).join("\n")).slice(0, 1500),
      });
    }
  }

  return { ok: cases.length > 0 && cases.every((c) => c.passed), error: null, cases };
}

function stripAnsi(str) {
  // eslint-disable-next-line no-control-regex
  return String(str).replace(/\[[0-9;]*m/g, "");
}

module.exports = { runTests };

// CLI mode: `npm test`
if (require.main === module) {
  runTests()
    .then((result) => {
      console.log("\nReact: Bugfix Searchbar Component — test results\n");
      if (result.error) console.log(result.error + "\n");
      result.cases.forEach((c) => {
        console.log(`  ${c.passed ? "PASS" : "FAIL"}  ${c.name}`);
        if (c.detail) console.log("        " + c.detail.split("\n").slice(0, 4).join("\n        "));
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
