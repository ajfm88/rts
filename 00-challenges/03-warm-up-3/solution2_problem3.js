/*
 * 347. Top K Frequent Elements (Medium)
 *
 * Given an integer array nums and an integer k, return the k most frequent
 * elements. You may return the answer in any order.
 *
 * Constraints:
 *   - 1 <= nums.length <= 10^5
 *   - -10^4 <= nums[i] <= 10^4
 *   - k is in range [1, number of unique elements]
 *   - The answer is guaranteed to be unique
 *
 * Follow-up: Your algorithm's time complexity must be better than O(n log n).
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // create a result array for the final result
  let result = [];
  // create a hashmap with each number and how many times it occurs
  let numberCounts = nums.reduce((acc, cur) => {
    if (acc[cur]) {
      // number already exists in hashmap, we +1 it
      acc[cur] = acc[cur] + 1;
    } else {
      // number isn't in hash map, we add it
      acc[cur] = 1;
    }
    return acc;
  }, {});
  // create buckets to hold numbers
  let buckets = Array(nums.length + 1)
    .fill()
    .map(() => []);
  // key:value pairs, in the new array, would go
  // value = index of the array of arrays element
  // key = new value inside of that index
  // we push each key:value pair into buckets using this logic
  for (const [key, value] of Object.entries(numberCounts)) {
    buckets[value].push(Number(key));
  }
  console.log(buckets);
  // walk through the buckets BACKWARDS
  for (let i = buckets.length - 1; i >= 0; i--) {
    // only keep adding elements until we have k of them
    if (result.length < k) {
      // push the top k elements into the result array
      result.push(...buckets[i]);
    }
  }
  // return result
  return result;
}

// ─── Test Runner ─────────────────────────────────────────────────────────────

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function arraysMatch(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, i) => val === sortedB[i]);
}

function runTest(description, nums, k, expected) {
  const result = topKFrequent(nums, k);
  const passed = Array.isArray(result) && arraysMatch(result, expected);
  if (passed) {
    console.log(`${GREEN}PASS${RESET} — ${description}`);
  } else {
    console.log(`${RED}FAIL${RESET} — ${description}`);
    console.log(`       expected: [${expected}]`);
    console.log(`       received: [${result}]`);
  }
}

runTest("Example 1 — two frequent elements", [1, 1, 1, 2, 2, 3], 2, [1, 2]);
runTest("Example 2 — single element array", [1], 1, [1]);
runTest(
  "Example 3 — tie broken by count",
  [1, 2, 1, 2, 1, 2, 3, 1, 3, 2],
  2,
  [1, 2],
);
runTest("Example 4 — k equals unique count", [4, 4, 3, 3, 2], 3, [4, 3, 2]);
