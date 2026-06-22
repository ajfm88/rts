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
  // your code here
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
