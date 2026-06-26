# 🗋 REST API: Cart Aggregation

> REST API coding exercise — technical session

Talk to a **live, authentication-protected API**, aggregate the cart data it returns,
and report the top 3 products for three different metrics.

## Problem

1. **Log in** — `POST https://dummyjson.com/auth/login` with username `emilys` and
   password `emilyspass` to obtain a _short-lived_ access token.
2. **Fetch carts** — `GET https://dummyjson.com/carts`, passing the token as a
   `Bearer` token in the `Authorization` header.
3. **Aggregate** the product data across all carts.
4. **Identify the top 3 products (by `id`)** for each of the following metrics:
   - **`uniqueCartCount`** — the number of carts containing the product
   - **`sumQuantity`** — the total units ordered across all carts
   - **`sumExtendedTotal`** — the total dollar value (`product.total`) ordered across all carts

## Endpoints

<details>
<summary><code>POST /auth/login</code></summary>

```bash
curl --location 'https://dummyjson.com/auth/login' \
--header 'Content-Type: application/json' \
--data '{ "username": "emilys", "password": "emilyspass" }'
```

</details>

<details>
<summary><code>GET /carts</code></summary>

```bash
curl --location 'https://dummyjson.com/carts' \
--header 'Authorization: Bearer ACCESS_TOKEN_HERE'
```

Each cart contains a `products` array; each product has an `id`, a `quantity`,
and a `total` (the extended price for that line).

</details>

### Function Description

Complete the `getTopProducts` function in **`index.js`**. It takes no arguments,
performs the login + fetch above, and **returns** an object with three ranked lists
(highest first), each a 3-element array of product **id strings**:

```js
{
  uniqueCartCount:  ["<id>", "<id>", "<id>"],
  sumQuantity:      ["<id>", "<id>", "<id>"],
  sumExtendedTotal: ["<id>", "<id>", "<id>"],
}
```

This returned object is what **Run Tests** checks: the runner independently logs in,
fetches the same live cart data, computes the expected top 3 for each metric, and
compares it against your result.

> **Note:** In the original assessment you would also **submit** this shape via
> `POST https://dummyjson.com/carts/add` (Bearer-authenticated). That submit step is
> optional here — the local harness grades the object you return.

**Available libraries:** `axios` and `lodash` are installed. You can also use the
global `fetch` (Node 18+).

---

> This problem talks to the **real `dummyjson.com` API**, so an internet connection is
> required (no mock server). Run your solution directly with `node index.js`, or edit
> `index.js` and click **Run Tests** in the browser.
