/*
  Technical Interview — REST API: Cart Aggregation

  Using the live dummyjson.com API, complete the following steps:

  1. POST to https://dummyjson.com/auth/login with username "emilys" and
     password "emilyspass" to obtain a short-lived access token.

  2. Use that access token to GET https://dummyjson.com/carts
     (pass the token as a Bearer token in the Authorization header).

  3. Aggregate the product data from all carts.

  4. Identify the top 3 products (by id) for each of the following metrics:
       a. uniqueCartCount   — number of carts containing the product
       b. sumQuantity       — total units ordered across all carts
       c. sumExtendedTotal  — total dollar value ordered across all carts

  Return an object with the three top-3 lists (each a 3-element array of product
  id strings, ranked highest first):

      {
        uniqueCartCount:  ["<id>", "<id>", "<id>"],
        sumQuantity:      ["<id>", "<id>", "<id>"],
        sumExtendedTotal: ["<id>", "<id>", "<id>"],
      }

  This is what "Run Tests" checks. (In the real exercise you would then POST this
  shape to https://dummyjson.com/carts/add as a Bearer-authenticated submission.)

  You may use any publicly available npm package (axios and lodash are installed).
  Run your solution directly with:  node index.js
*/

const axios = require("axios");

async function getTopProducts() {
  // your code here — log in, fetch /carts, aggregate, and return the three lists.
  return {
    uniqueCartCount: [],
    sumQuantity: [],
    sumExtendedTotal: [],
  };
}

module.exports = { getTopProducts };

// Run `node index.js` to execute your solution and print the result.
if (require.main === module) {
  getTopProducts()
    .then((result) => console.log(result))
    .catch((err) => console.error("Error:", err.message));
}
