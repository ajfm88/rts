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
  // try/catch block as safeguard before hitting the endpoint
  try {
    // get token response from the API endpoint
    const tokenResponse = await axios.post("https://dummyjson.com/auth/login", {
      username: "emilys",
      password: "emilyspass",
    });
    // extract token from the response
    const token = tokenResponse.data.accessToken;
    // use token to login and get cartsResponse
    const cartsReponse = await axios.get("https://dummyjson.com/carts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // extract cart data from the response
    const carts = cartsReponse.data.carts;
    // apply flatMap to get nested product objects out
    const products = carts.flatMap((cart) => cart.products);
    // use reduce to calculate uniqueCartCount, sumQuantity and sumExtendedTotal
    const stats = products.reduce((acc, cur) => {
      // see CURrent product is in the ACCumulator object already
      // if not, initialize
      if (!acc[cur.id]) {
        acc[cur.id] = {
          uniqueCartCount: 0,
          sumQuantity: 0,
          sumExtendedTotal: 0,
        };
      }
      // calculate uniqueCartCount
      acc[cur.id].uniqueCartCount++;
      // calculate sumQuantity
      acc[cur.id].sumQuantity += cur.quantity;
      // calculate sumExtendedTotal
      acc[cur.id].sumExtendedTotal += cur.total;
      // return the accumulator object
      return acc;
    }, {});
    // turn object into nested array of arrays
    let statsArr = Object.entries(stats);

    // sort by uniqueCartCount
    statsArr.sort((a, b) => b[1].uniqueCartCount - a[1].uniqueCartCount);
    // top 3 uniqueCartCount
    let top3CartCount = statsArr.slice(0, 3);

    // sort by sumQuantity
    statsArr.sort(
      (a, b) =>
        // tie-break by product id ascending so lower id wins
        b[1].sumQuantity - a[1].sumQuantity || Number(a[0]) - Number(b[0]),
    );
    // top 3 sumQuantity
    let top3SumQuantity = statsArr.slice(0, 3);

    // sort by sumExtendedTotal
    statsArr.sort((a, b) => b[1].sumExtendedTotal - a[1].sumExtendedTotal);
    // top 3 sumExtendedTotal
    let top3SumExtendedTotal = statsArr.slice(0, 3);

    // return just the ids
    return {
      uniqueCartCount: top3CartCount.map((elem) => elem[0]),
      sumQuantity: top3SumQuantity.map((elem) => elem[0]),
      sumExtendedTotal: top3SumExtendedTotal.map((elem) => elem[0]),
    };
  } catch (err) {
    console.error("Error is", err);
  }
}

module.exports = { getTopProducts };

// Run `node index.js` to execute your solution and print the result.
if (require.main === module) {
  getTopProducts()
    .then((result) => console.log(result))
    .catch((err) => console.error("Error:", err.message));
}
