"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");

const ROOT = path.join(__dirname, "..");
const PORT = process.env.PORT || 3000;

const app = express();

// The shell (README left, live preview + Run Tests right) is served at /.
app.use(express.static(path.join(ROOT, "shell")));

// The candidate's actual page (index.html + style.css) is served under /app
// so the shell can load it in a same-origin iframe and inspect its layout.
app.use("/app", express.static(ROOT, { index: "index.html" }));

app.get("/api/readme", (req, res) => {
  res.type("text/plain").send(fs.readFileSync(path.join(ROOT, "readme.md"), "utf8"));
});

app.get("/api/solution", (req, res) => {
  res.type("text/plain").send(fs.readFileSync(path.join(ROOT, "style.css"), "utf8"));
});

app.listen(PORT, () => {
  console.log(`\n  CSS: Form`);
  console.log(`  Open  http://localhost:${PORT}  in your browser.`);
  console.log(`  Edit  style.css  then click "Run Tests".\n`);
});
