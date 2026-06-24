# 🗋 SQL: Billing Software Report

Create a query for a billing software application that retrieves customers with a positive
balance. The query should return:

- Customer **IBAN** number
- **Balance amount** formatted with 2 decimal places, all are less than or equal to 100

Only customers with a balance **greater than zero** should be included.
Results should be **sorted in descending order** by balance amount.

<details open>
<summary><strong>▾ Schema</strong></summary>

**customers**

| name | type | description |
| --- | --- | --- |
| id | SMALLINT | ID |
| iban | VARCHAR(255) | IBAN number |

**balances**

| name | type | description |
| --- | --- | --- |
| customer_id | SMALLINT | Customer ID |
| amount | DECIMAL(5,2) | Amount |

</details>

<details>
<summary><strong>▾ Sample Data Tables</strong></summary>

**customers**

| id | iban |
| --- | --- |
| 1 | FR03 8308 7233 40BK 6LHY HTTI 296 |
| 2 | KZ55 828R LAKG RRTR MGEH |
| 3 | DE93 3002 5100 5869 7389 68 |
| 4 | IL16 2899 3640 4350 6827 897 |
| 5 | FO73 7625 1325 8044 80 |
| 6 | PS22 XKTA RNGY CCDN S68S G5YE HRUP E |
| 7 | CZ07 8963 5878 7630 6909 2236 |
| 8 | SE05 1B65 4389 1326 4897 5396 |
| 9 | SA21 31QH BPI3 K6IB WHGV GJTD |
| 10 | KZ87 4246 EWPW SLEO 4CP6 |
| … | … _(20 rows total)_ |

**balances**

| customer_id | amount |
| --- | --- |
| 18 | 97.04 |
| 13 | 86.78 |
| 4 | 79.53 |
| 5 | 67.06 |
| 17 | 36.77 |
| 1 | 14.86 |
| 19 | 5.65 |
| 10 | 4.81 |
| 2 | -22.86 |
| 7 | -24.60 |
| … | … _(20 rows total, 12 negative)_ |

</details>

<details>
<summary><strong>▾ Expected Output</strong></summary>

| iban | amount |
| --- | --- |
| PT19 6035 6448 2662 1157 2219 8 | 97.04 |
| BE23 7638 2407 6334 | 86.78 |
| IL16 2899 3640 4350 6827 897 | 79.53 |
| FO73 7625 1325 8044 80 | 67.06 |
| MD78 ECGU XQST I8LF DRIK 4JRH | 36.77 |
| FR03 8308 7233 40BK 6LHY HTTI 296 | 14.86 |
| CR95 5363 9756 8790 5129 9 | 5.65 |
| KZ87 4246 EWPW SLEO 4CP6 | 4.81 |

</details>

---

> **Note:** the real assessment runs on **PostgreSQL**. This local harness runs on **SQLite**,
> so use `ROUND(amount, 2)` (no `::NUMERIC` cast needed). The query logic is identical.
>
> Edit **`solution.sql`**, then click **Run Tests**.
