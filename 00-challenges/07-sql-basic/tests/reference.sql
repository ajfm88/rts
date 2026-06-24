-- Reference solution (hidden from the candidate).
-- The runner executes this to derive the expected result set, then compares the
-- candidate's solution.sql against it.
--
-- PostgreSQL original used ROUND(balances.amount::NUMERIC, 2); on SQLite the
-- cast is unnecessary.
SELECT customers.iban, ROUND(balances.amount, 2) AS amount
FROM customers
INNER JOIN balances ON customers.id = balances.customer_id
WHERE balances.amount > 0
ORDER BY balances.amount DESC;
