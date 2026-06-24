"use strict";
/*
 * Complete the 'getDiscountedPrice' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER barcode as parameter.
 *
 * Query: `${API_URL}/api/inventory?barcode=<barcode>`
 * The JSON response has a `data` array:
 *   - empty            -> the barcode was not found
 *   - one record       -> { barcode, item, category, price, discount, available }
 *
 * Fetch the data with either approach (both are available):
 *   - axios (imported above):   const res = await axios.get(url); const body = res.data;
 *   - global fetch (Node 18+):  const res = await fetch(url);     const body = await res.json();
 *   In both cases the records array is `body.data`.
 *
 * Discounted price = price - (discount / 100) * price, rounded to the nearest integer.
 * If the barcode is not found, return -1.
 *
 * After editing this file, click "Run Tests" in the browser (or run `npm test`).
 */
const axios = require("axios");
// The API base URL — points at the bundled mock server.
const API_URL = process.env.API_URL || "http://localhost:3100";

async function getDiscountedPrice(barcode) {
  // your code here

  // build the URL
  const url = `${API_URL}/api/inventory?barcode=${barcode}`;

  // hit the API endpoint
  const response = await axios.get(url);

  // extract the nested data array of objects
  const data = response.data.data;

  // if there is no data, early return
  if (data.length === 0) {
    return -1;
  }

  // extract price and discount properties from the object
  const price = data[0].price;
  const discount = data[0].discount;

  // calculate discounted price
  const discountedPrice = price * (1 - discount / 100);

  // apply toFixed (has number have two decimal places), coerce to number and return
  return Number(discountedPrice.toFixed(2));
}

module.exports = { getDiscountedPrice };
