# TypeScript: Shopping Cart Total

Develop a shopping cart system where each item in the cart has a unique _productId_, _name_, _price_, _quantity_, and an optional _discount_ percentage. Calculate the total cost for the shopping cart, taking discounts into account, and return the total price rounded to two decimal places.

Define an _Item_ interface that includes the _productId_, _name_, _price_, _quantity_, and optional _discount_. The function _calculateTotalPrice_ should take an array of _Item_ objects and return the total cost for all items in the shopping cart.

## Example

There are 4 items in the shopping cart, each uniquely identified by _productId_, _name_, _price_, _quantity_, and optional _discount_. The items are as follows:

- "item1" with name "Laptop", price 1000.00, quantity 2, and discount 10%.
- "item2" with name "Mouse", price 50.00, quantity 3, and no discount.
- "item3" with name "Keyboard", price 100.00, quantity 1, and discount 20%.
- "item4" with name "Monitor", price 300.00, quantity 2, and no discount.

| ID    | Name     | Price   | Quantity | Discount | Discounted Price per Unit | Total Cost            |
| ----- | -------- | ------- | -------- | -------- | ------------------------- | --------------------- |
| item1 | Laptop   | 1000.00 | 2        | 10%      | 1000.00 \* 0.90 = 900.00  | 900.00 \* 2 = 1800.00 |
| item2 | Mouse    | 50.00   | 3        | 0%       | 50.00                     | 50.00 \* 3 = 150.00   |
| item3 | Keyboard | 100.00  | 1        | 20%      | 100.00 \* 0.80 = 80.00    | 80.00 \* 1 = 80.00    |
| item4 | Monitor  | 300.00  | 2        | 0%       | 300.00                    | 300.00 \* 2 = 600.00  |

Summing these totals gives the final price: 150.00 + 80.00 + 600.00 = 2630.00

## Function Description

`calculateTotalPrice(items: Item[]): string`. The function accepts one parameter:

- **items**: an array of _Item_ objects, where each object contains the following properties:
  - **id**: a string, a unique identifier for each item
  - **name**: a string, the name of the item
  - **price**: a number, the price of the item
  - **quantity**: a number, the quantity of the item
  - **discount**: a number (optional), the discount percentage for the item

## Returns

string: The total price of all items in the shopping cart, rounded to two decimal places.

## Constraints

- 1 ≤ number of transactions ≤ 10,000
- 0 ≤ quantity ≤ 100,000
- 0 ≤ price ≤ 1,000,000 (up to two decimal places)
- 0 ≤ discount ≤ 100 (percentage, optional)

## Input Format for Custom Testing

### Sample Case 0

**Sample Input 0**

```
STDIN          FUNCTION
-----          --------
1              n
item1 Notebook 25.00 4 10    items
```

**Sample Output 0**

```
90.00
```

**Explanation 0**

There is `1` item: "item1" with name "Notebook", price 25.00, quantity 4, and discount 10%.
The discounted price per unit is `25.00 * 0.90 = 22.50`, so the total is `22.50 * 4 = 90.00`.
