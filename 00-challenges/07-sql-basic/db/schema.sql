-- Schema for the Billing Software Report exercise.
--
-- The real assessment runs on PostgreSQL with the column types shown in the
-- README (SMALLINT, VARCHAR(255), DECIMAL(5,2)). This harness uses SQLite, so
-- the types below are the SQLite-compatible equivalents. The query logic you
-- need to write is the same.

CREATE TABLE customers (
  id   INTEGER PRIMARY KEY,
  iban TEXT NOT NULL
);

CREATE TABLE balances (
  customer_id INTEGER NOT NULL,
  amount      REAL NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers (id)
);
