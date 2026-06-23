/**
 * This is the type declaration for an item in the shopping cart
 */
interface Item {
  //Define Item
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

/**
 * The function to calculate the total price of items in the cart
 * @param {Item[]} items - An array of items in the shopping cart
 * @returns {string} - The total price of all items rounded to two decimal places
 */
function calculateTotalPrice(items: Item[]): string {
  //Write your code here
  // total price of items
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    // get discount
    const discount = items[i].discount ?? 0;
    // calculate total
    total += items[i].price * (1 - discount / 100) * items[i].quantity;
  }
  return total.toFixed(2);
}

function main() {
  const lines: string[] = [];

  process.stdin.resume();
  process.stdin.setEncoding("utf-8");

  let inputData = "";

  process.stdin.on("data", (data: string) => {
    inputData += data;
  });

  process.stdin.on("end", () => {
    const lines = inputData.trim().split("\n");
    const n = parseInt(lines[0].trim(), 10);
    const items: Item[] = [];

    for (let i = 1; i <= n; i++) {
      const parts = lines[i].trim().split(/\s+/);
      const item: Item = {
        id: parts[0],
        name: parts[1],
        price: parseFloat(parts[2]),
        quantity: parseInt(parts[3], 10),
      };
      if (parts.length > 4) {
        item.discount = parseFloat(parts[4]);
      }
      items.push(item);
    }

    const result = calculateTotalPrice(items);
    process.stdout.write(result + "\n");
  });
}

main();
