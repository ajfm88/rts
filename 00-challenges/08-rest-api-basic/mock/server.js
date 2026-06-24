"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");

const INVENTORY = path.join(__dirname, "inventory.json");

// Local mock inventory API:
//   GET /api/inventory?barcode=<barcode>  ->  { data: [record] | [] }
// Runs fully offline and deterministically.
function createMockApp() {
  const records = JSON.parse(fs.readFileSync(INVENTORY, "utf8"));
  const app = express();

  app.get("/api/inventory", (req, res) => {
    const barcode = String(req.query.barcode || "");
    const match = records.filter((r) => String(r.barcode) === barcode);
    res.json({
      page: 1,
      per_page: 10,
      total: match.length,
      total_pages: 1,
      data: match,
    });
  });

  return app;
}

// Start the mock on an ephemeral port; resolves with { server, port }.
function startMockServer(port = 0) {
  const app = createMockApp();
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve({ server, port: server.address().port });
    });
  });
}

module.exports = { createMockApp, startMockServer };
