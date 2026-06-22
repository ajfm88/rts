# 347. Top K Frequent Elements

**Difficulty:** Medium  
**Acceptance Rate:** 66.3%

---

## Problem

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.

---

## Examples

**Example 1**
```
Input:  nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Example 2**
```
Input:  nums = [1], k = 1
Output: [1]
```

**Example 3**
```
Input:  nums = [1,2,1,2,1,2,3,1,3,2], k = 2
Output: [1,2]
```

---

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, number of unique elements in the array]`
- The answer is **guaranteed to be unique**

---

## Follow-up

Your algorithm's time complexity must be **better than O(n log n)**, where `n` is the array's size.

---

## How to Run

```bash
node problem3.js
```

Tests will print `PASS` or `FAIL` with expected vs received values.

---

## Hints

<details>
<summary>Hint 1</summary>
Count the frequency of each element using a hash map.
</details>

<details>
<summary>Hint 2</summary>
Think about how to efficiently get the top k elements from the frequency map without fully sorting it — can you do it in O(n)?
</details>

<details>
<summary>Hint 3</summary>
Bucket sort: use an array of size n+1 where the index represents frequency, then read buckets from the end.
</details>
