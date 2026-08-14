/**
 *  Walk through the code and figure out what gets logged at the end.
 *
 *  Hint: track the `silo` object. It travels between functions via .bind().
 *  Hint: not every line contributes to the final output.
 **/


// ============================================================
//  HELPER FUNCTIONS (defined first, called from launch)
// ============================================================


// ---- morph(c) ----
// Takes a single lowercase character and returns its uppercase version.
// But it does it the HARD WAY — via bitwise math instead of .toUpperCase().
//
// QUIRK 14: Bitwise AND with ~32 clears bit 5 (the "case bit" in ASCII).
//
//   In ASCII, lowercase and uppercase letters differ by exactly 32:
//     'a' = 97  (01100001)     'A' = 65  (01000001)
//     'h' = 104 (01101000)     'H' = 72  (01001000)
//                    ^                         ^
//                    bit 5 is ON               bit 5 is OFF
//
//   ~32 flips all bits of 32:
//     32       = 00000000 00000000 00000000 00100000
//     ~32      = 11111111 11111111 11111111 11011111
//
//   So (charCode & ~32) turns OFF bit 5, converting lowercase → uppercase.
//
// QUIRK 15: charCodeAt(0) / String.fromCharCode()
//   charCodeAt(0) returns the numeric Unicode code point of the first char.
//   String.fromCharCode(n) converts a code point back to a character.
//
// TRACE for 'h':
//   'h'.charCodeAt(0) = 104
//   104 & ~32 = 104 & 4294967263 = 72
//   String.fromCharCode(72) = 'H'
function morph(c) {
  return String.fromCharCode(c.charCodeAt(0) & ~32)
}


// ---- extract() ----
// Called with this = silo.
// Picks first letters from words at indices stored in silo.picks,
// uppercases them via morph(), and stores the result in silo.out.
function extract() {

  // QUIRK 6: Destructuring with rename from an array.
  // Arrays have a .length property, just like strings.
  // { length: count } pulls .length and names the local variable `count`.
  // this.w has 5 elements → count = 5.
  //
  // Equivalent to: const count = this.w.length
  const { length: count } = this.w

  // this.picks = [1, 3, 2, 0, 4]  (computed in launch)
  // this.w = ['each', 'happy', 'rhino', 'is', 'dancing']
  //
  // For each index i, grab this.w[i] (a word), then [0] (first character).
  //
  // QUIRK 7: String bracket indexing — str[0] returns the first character.
  //   'happy'[0] = 'h'.  Same as .charAt(0) or .at(0).
  //
  // TRACE:
  //   i=1 → this.w[1] = 'happy'    → 'happy'[0]   = 'h'
  //   i=3 → this.w[3] = 'is'       → 'is'[0]      = 'i'
  //   i=2 → this.w[2] = 'rhino'    → 'rhino'[0]   = 'r'
  //   i=0 → this.w[0] = 'each'     → 'each'[0]    = 'e'
  //   i=4 → this.w[4] = 'dancing'  → 'dancing'[0] = 'd'
  //
  // this.buf = ['h', 'i', 'r', 'e', 'd']
  this.buf = this.picks.map(i => this.w[i][0])

  // QUIRK 8: [...this.buf] is an unnecessary spread.
  // this.buf is already an array. Spreading it into a new array does
  // nothing useful — just like [...t] in the interview exercise.
  // It creates a shallow copy, which is pointless since forEach doesn't
  // return or modify the copy in any meaningful way.
  //
  // QUIRK 9: .forEach() ALWAYS returns undefined.
  // Unlike .map() which returns a new array, forEach returns nothing.
  // So `ghost` = undefined, regardless of what the callback does.
  //
  // The SIDE EFFECT is what matters: for each character c at index j,
  // morph(c) uppercases it and stores the result in this.out[j].
  //
  // TRACE:
  //   j=0, c='h' → this.out[0] = morph('h') = 'H'
  //   j=1, c='i' → this.out[1] = morph('i') = 'I'
  //   j=2, c='r' → this.out[2] = morph('r') = 'R'
  //   j=3, c='e' → this.out[3] = morph('e') = 'E'
  //   j=4, c='d' → this.out[4] = morph('d') = 'D'
  //
  // this.out = ['H', 'I', 'R', 'E', 'D']
  // ghost = undefined
  const ghost = [...this.buf].forEach((c, j) => this.out[j] = morph(c))

  // QUIRK 10: || (logical OR) short-circuit.
  // || returns the FIRST TRUTHY value, or the last value if all are falsy.
  // ghost is undefined (falsy) → skips to count.
  // count is 5 (truthy) → returns 5.
  //
  // So this.total = 5.
  //
  // RED HERRING: silo.total is never read again. This line exists to
  // test whether you can identify dead code and not get distracted by it.
  this.total = ghost || count

  // Returns ghost, which is undefined.
  // This matters for the ?? chain in launch().
  return ghost
}


// ---- channel() ----
// Called with this = silo.
// Joins silo.out into a string.
function channel() {

  // QUIRK 13: typeof NaN === 'number' is TRUE.
  //
  // NaN stands for "Not a Number" but its TYPE is 'number'.
  // This is part of the IEEE 754 floating-point spec — NaN is a
  // special value within the number type, not a separate type.
  //
  // So the ternary resolves:
  //   typeof NaN === 'number'  →  true
  //   true ? '' : ' '         →  ''
  //
  // If you mistakenly think typeof NaN is 'NaN' or 'undefined' or
  // anything else, you'd pick ' ' and get 'H I R E D' (with spaces).
  //
  // this.out = ['H', 'I', 'R', 'E', 'D']
  // .join('') → 'HIRED'
  return this.out.join(typeof NaN === 'number' ? '' : ' ')
}


// ============================================================
//  MAIN FUNCTION
// ============================================================

//launch(5)
function launch(n) { // n = 5

  const phrase = 'each happy rhino is dancing'

  // silo is the shared state object. It starts with just an empty `out`
  // array and accumulates properties (.w, .picks, .buf, .out, .total)
  // as it passes through functions via .bind().
  const silo = { out: [] }

  // Split into words:
  // silo.w = ['each', 'happy', 'rhino', 'is', 'dancing']
  silo.w = phrase.split(' ')

  const raw = [54, 101, 23, 40, 32]

  // QUIRK 1: .sort() with no comparator is LEXICOGRAPHIC.
  //
  // It converts every element to a string first, then compares character
  // by character using Unicode code points.
  //
  //   '101' vs '23':  '1' < '2' → '101' comes first
  //   '101' vs '32':  '1' < '3' → '101' comes first
  //   '23'  vs '32':  '2' < '3' → '23' comes first
  //   '40'  vs '54':  '4' < '5' → '40' comes first
  //
  // RESULT:       [101, 23, 32, 40, 54]
  // NOT expected: [23, 32, 40, 54, 101]
  //
  // To sort numerically you need: raw.sort((a, b) => a - b)
  //
  // QUIRK 2: .sort() MUTATES in place AND returns the same array reference.
  // So `sorted === raw` is true — they point to the same object.
  // Same behavior as .reverse() in the interview exercise.
  const sorted = raw.sort()

  // QUIRK 3: typeof null === 'object'.
  //
  // This is JavaScript's most famous bug, dating back to Brendan Eich's
  // original 1995 implementation. In the first JS engine, values were
  // tagged with a type code, and null's internal representation used
  // the object type tag (0). It was never fixed because too much code
  // depended on it by the time anyone noticed.
  //
  // So typeof null === 'object' evaluates to TRUE.
  //
  // QUIRK 4: && (logical AND) short-circuit returns the ACTUAL VALUE,
  // not a boolean.
  //
  // && returns the first FALSY value, or the LAST value if all are truthy.
  //   true && 10  →  both truthy, returns LAST value → 10
  //   false && 10 →  first is falsy, returns false
  //   0 && 10     →  0 is falsy, returns 0
  //
  // Here: typeof null === 'object'  →  true
  //       n * 2                     →  5 * 2 = 10
  //       true && 10                →  10
  //
  // So the whole expression becomes: x % 10
  //
  // TRACE:
  //   sorted = [101, 23, 32, 40, 54]
  //   101 % 10 = 1
  //   23  % 10 = 3
  //   32  % 10 = 2
  //   40  % 10 = 0
  //   54  % 10 = 4
  //
  // silo.picks = [1, 3, 2, 0, 4]
  //
  // These are the indices that will pluck words from silo.w!
  //   Index 1 → 'happy'   → 'h'
  //   Index 3 → 'is'      → 'i'
  //   Index 2 → 'rhino'   → 'r'
  //   Index 0 → 'each'    → 'e'
  //   Index 4 → 'dancing' → 'd'
  silo.picks = sorted.map(x => x % (typeof null === 'object' && n * 2))

  // QUIRK 5: .bind(silo) sets `this` to silo inside extract().
  // Then () immediately calls the bound function with no arguments.
  //
  // extract() returns `ghost`, which is undefined (since forEach returns
  // undefined). So `unused` = undefined.
  //
  // But the SIDE EFFECTS are what matter:
  //   silo.buf   = ['h', 'i', 'r', 'e', 'd']
  //   silo.out   = ['H', 'I', 'R', 'E', 'D']
  //   silo.total = 5
  const unused = extract.bind(silo)()

  // QUIRK 11: void ALWAYS returns undefined.
  //
  // void <expression> evaluates the expression for its side effects
  // but discards the return value and gives back undefined.
  //
  // silo.w.push('hooray') mutates silo.w:
  //   silo.w becomes ['each','happy','rhino','is','dancing','hooray']
  // .push() returns the new array length (6), but void throws that away.
  //
  // nothing = undefined
  //
  // RED HERRING: the push mutates silo.w, but silo.w is never read again
  // after this point. The mutation is irrelevant to the output.
  const nothing = void silo.w.push('hooray')

  // QUIRK 12: ?? (nullish coalescing) chain.
  //
  // ?? returns the left side UNLESS it's null or undefined (nullish).
  // This is different from || which triggers on ANY falsy value
  // (0, '', false, null, undefined, NaN).
  //
  //   0 ?? 'fallback'  →  0       (0 is not nullish)
  //   0 || 'fallback'  →  'fallback'  (0 IS falsy)
  //
  // TRACE through the chain:
  //   nothing = undefined           →  nullish, skip to next
  //   unused  = undefined           →  nullish, skip to next
  //   channel.bind(silo)            →  a Function object, NOT nullish!
  //
  // So the whole (nothing ?? unused ?? channel.bind(silo)) evaluates
  // to the bound function channel.bind(silo).
  //
  // Then the trailing () CALLS that function.
  //
  // Inside channel():
  //   typeof NaN === 'number' → true  (QUIRK 13)
  //   this.out.join('')       → 'HIRED'
  //
  // p = 'HIRED'
  const p = (nothing ?? unused ?? channel.bind(silo))()

  console.log(p)
  // OUTPUT: 'HIRED'
}


// ============================================================
//  SUMMARY OF JS QUIRKS IN THIS EXERCISE
// ============================================================
//
//  1.  .sort() is lexicographic by default
//      [54, 101, 23, 40, 32].sort() → [101, 23, 32, 40, 54]
//      Fix: .sort((a, b) => a - b)
//
//  2.  .sort() mutates in place AND returns the same reference
//      const sorted = raw.sort() → sorted === raw is true
//
//  3.  typeof null === 'object'
//      A 1995 bug that can never be fixed. null has type tag 0 (object).
//
//  4.  && returns the actual value, not a boolean
//      true && 10 → 10 (last truthy value)
//      false && 10 → false (first falsy value)
//
//  5.  .bind(obj) sets `this` permanently
//      Same as the interview exercise — core to how state flows here.
//
//  6.  Destructuring with rename: { length: count }
//      Pulls .length from this.w and names the variable count.
//      Works on arrays (they have .length) and strings alike.
//
//  7.  String bracket indexing: 'hello'[0] → 'h'
//      Strings are array-like — you can index into them.
//
//  8.  Unnecessary [...spread] on an already-array
//      Same red herring as the interview exercise.
//      [...this.buf] creates a pointless copy.
//
//  9.  .forEach() always returns undefined
//      Unlike .map() which returns a new array.
//      The side effect (writing to this.out) is the real work.
//
// 10.  || returns the first truthy value
//      undefined || 5 → 5
//      Unlike &&, which returns the first falsy or last value.
//
// 11.  void discards any expression's return value → undefined
//      void silo.w.push('hooray') → undefined
//      The push still happens (side effect), but the value is thrown away.
//
// 12.  ?? (nullish coalescing) only skips null and undefined
//      undefined ?? undefined ?? fn → fn
//      Different from || which also skips 0, '', false, NaN.
//      Here it chains until it finds the bound function, then () calls it.
//
// 13.  typeof NaN === 'number' → true
//      "Not a Number" is of type number. IEEE 754 says NaN is a special
//      float value, not a separate type. JavaScript inherits this.
//
// 14.  & ~32 is bitwise uppercase
//      Bit 5 (value 32) is the only difference between lowercase and
//      uppercase ASCII letters. Clearing it converts to uppercase.
//
// 15.  charCodeAt(0) / String.fromCharCode()
//      Convert between characters and their numeric code points.
//      The bitwise trick operates on the number, then converts back.
//
//  RED HERRINGS:
//  - silo.total is computed (5) but never read
//  - count is captured but only used in the dead variable silo.total
//  - void swallows push's return AND the push mutates silo.w pointlessly
//  - the parameter n could be anything ≥ 1 (as long as n*2 ≥ 10 for
//    the modulo to extract single digits correctly from these numbers)


launch(5)
