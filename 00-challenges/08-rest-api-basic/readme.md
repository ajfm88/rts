# 🗋 REST API: Discounted Price

Query an API to retrieve a product's discounted price based on its barcode.

The API endpoint is `${API_URL}/api/inventory?barcode=<barcode>`. The response contains a
`data` field, which is either:

- An **empty array** (barcode not found)
- An **array with a single object** containing the item's record

For a barcode found in the system, calculate the discounted price using:

> **discountedPrice = price − (discount / 100) × price**

**Round** the result to the nearest integer. If the barcode is **not found, return −1**.

### Example

`barcode = 74001755`

Querying `/api/inventory?barcode=74001755` returns a `data` array with this record:

```json
{
  "barcode": "74001755",
  "item": "Ball Gown",
  "category": "Full Body Outfits",
  "price": 785,
  "discount": 7,
  "available": 1
}
```

`discountedPrice = 785 − (7 / 100 × 785) = 730.05`, which rounds to **730**.

### Function Description

Complete the `getDiscountedPrice` function in the editor with the following parameter:

- `int barcode`: the item to query

**Returns**

- `int`: the discounted price rounded to the nearest integer or -1

**Constraints**

- There will be either 1 or 0 records in `data`.

**Available libraries:** `axios` (pre-imported in the stub) and the global `fetch` (Node 18+) are both available.

<details>
<summary><strong>▾ Input Format For Custom Testing</strong></summary>

In the first and only line, there is an integer, `barcode`.

</details>

<details>
<summary><strong>▾ Sample Case 0</strong></summary>

**Sample Input For Custom Testing**

```
74002314
```

**Sample Output**

```
2964
```

**Explanation**

The inventory API is queried with barcode `74002314`. The price = 3705 and the discount is 20.

</details>

<details>
<summary><strong>▾ Sample Case 1</strong></summary>

**Sample Input For Custom Testing**

```
74005364
```

**Sample Output**

```
-1
```

**Explanation**

The inventory API is queried with barcode `74005364`. The `data` field contains an empty array, so the item was not found.

</details>

---

> This local harness runs an offline **mock API** — no internet needed.
> Edit **`index.js`**, then click **Run Tests**.
