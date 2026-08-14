/**
 *  Context:
 *   Not a completion exercise, getting to the end is not really the goal.
 *   Intent is to see how we collaborate through code together, and what
 *   properties you're familiar with. Some may be new and thats okay.
 *
 *  Hint :
 *     Highly suggest making comments under complex lines.
 **/


// ============================================================
//  HELPER FUNCTIONS (defined first, called later from rube)
// ============================================================


// ---- the() ----
// Called with a String as `this` (via .bind), e.g. 'tac(3)'
// Job: find the parenthesized suffix, reverse the word part, uppercase it,
//      then concatenate them.
//
// QUIRK: `this` is a String OBJECT, not a primitive.
// When you do the.bind('tac(3)'), JS wraps the primitive in a String object.
// Luckily, .search() and .substr() exist on String.prototype, so they
// work on String objects just fine.
function the() {
  // .search(regex) returns the INDEX of the first match, or -1 if none.
  // /[()]/ matches the first '(' or ')' character.
  // For 'tac(3)':  t=0, a=1, c=2, (=3  →  pI = 3
  const pI = this.search(/[()]/);

  // this.substr(pI)       → from index pI to end   → '(3)'
  // this.substr(0, pI)    → from 0, length pI      → 'tac'
  // machine('tac')        → 'cat'  (reverses the string)
  // .toUpperCase()        → 'CAT'
  //
  // RESULT: '(3)' + 'CAT' = '(3)CAT'
  //
  // NOTE: The concatenation order puts the parens FIRST.
  // So the final output format is (N)WORD, e.g. '(3)CAT'.
  //
  // If the interviewers intended 'CAT(3)' format, the return
  // would need to be:
  //   return machine(this.substr(0, pI)).toUpperCase() + this.substr(pI)
  //
  // QUIRK: .substr() is technically deprecated in favor of .substring()
  // or .slice(), but still works in all major engines. In an interview
  // setting, mentioning this is a nice bonus.
  return this.substr(pI) + machine(this.substr(0, pI)).toUpperCase()
}


// ---- machine(m) ----
// Reverses a string character by character.
// 'brown' → 'nworb',  'cat' → 'tac',  'over' → 'revo'
function machine(m) {
  return m
    .split('')    // 'brown' → ['b','r','o','w','n']
    .reverse()    //         → ['n','w','o','r','b']
    .join('')     //         → 'nworb'
}


// ---- rocks() ----
// Called with `this` bound to the `data` object.
// Simply returns data.s (the formatted string built on line 26 of rube).
function rocks() {
  return this.s
}


// ---- goldberg(pickList) ----
// Called with `this` bound to `data`, and pickList = [3, 6, 9].
// Picks words from the phrase by index, reverses each one, and
// stores them on data.y.
function goldberg(pickList) {

  // new Array(n) creates a SPARSE array of length n.
  // new Array(3) → [ <3 empty slots> ]   (length is 3, but no values)
  //
  // QUIRK: This is NOT the same as [undefined, undefined, undefined].
  // Sparse arrays have "holes" — methods like .map() and .forEach()
  // SKIP holes, but direct index assignment (this.y[i] = ...) works fine.
  // That distinction matters later when we use forEach to fill it.
  this.y = new Array(pickList.length)

  // pickList = [3, 6, 9]
  // this.l = ['the','sly','quick','brown','fox','jumped','over','the','lazy','cat']
  //            0     1     2       3       4     5        6      7     8      9
  // this.l.length = 10
  //
  // QUIRK — modulo when the number is smaller than the divisor:
  //   3 % 10 = 3    (any number < divisor just gives itself)
  //   6 % 10 = 6
  //   9 % 10 = 9
  // So the modulo here is a safety net for index wrapping, but with these
  // values it doesn't actually change anything. If inputNumber were 4,
  // we'd get a = [4, 8, 12], and 12 % 10 = 2, which WOULD wrap around.
  // That's the kind of thing the interviewers want you to notice and
  // articulate: "it works like a circular buffer / wrapping index."
  const t = pickList.map(b => this.l[b % this.l.length])
  // t = [this.l[3], this.l[6], this.l[9]]
  // t = ['brown', 'over', 'cat']

  // [...t] spreads t into a new array (shallow copy).
  // .forEach() iterates and assigns machine(r) into this.y at each index.
  //
  // QUIRK: forEach() always returns undefined.
  // So `v` is undefined. This is a subtle gotcha — if you expected `v`
  // to hold the transformed results, you'd want .map() instead.
  // But it doesn't matter here because the side effect (writing into
  // this.y) is what we care about.
  //
  // i=0, r='brown': this.y[0] = machine('brown') = 'nworb'
  // i=1, r='over':  this.y[1] = machine('over')  = 'revo'
  // i=2, r='cat':   this.y[2] = machine('cat')   = 'tac'
  //
  // this.y is now ['nworb', 'revo', 'tac']
  const v = [...t].forEach((r, i) => this.y[i] = machine(r))

  // QUIRK: .reverse() mutates the array IN PLACE *and* returns it.
  // So this.y (which IS data.y, same reference) becomes ['tac', 'revo', 'nworb'].
  // The return value is the same array object, not a copy.
  // That means `y` in rube() and `data.y` point to the exact same array.
  return this.y.reverse()
  // this.y = data.y = ['tac', 'revo', 'nworb']
}


// ============================================================
//  MAIN FUNCTION
// ============================================================

function rube(inputNumber) { // inputNumber = 3

  const phrase = 'the sly quick brown fox jumped over the lazy cat'

  // `data` is a plain object that will accumulate properties (.l, .y, .s)
  // as the code runs. It gets passed around via .bind() as `this`.
  const data = {}

  const a = []  // will become [3, 6, 9]

  // Split the phrase into an array of words and store on data:
  data.l = phrase.split(' ')
  // data.l = ['the','sly','quick','brown','fox','jumped','over','the','lazy','cat']
  // data.l.length = 10

  // Build the index array: i goes 1, 2, 3
  for (let i = 1; i <= 3; i++) {
    a.push(i * inputNumber)
    // i=1: 1*3 = 3  → a = [3]
    // i=2: 2*3 = 6  → a = [3, 6]
    // i=3: 3*3 = 9  → a = [3, 6, 9]
  }

  // ---- .bind(data)(a) ----
  // QUIRK / KEY CONCEPT: Function.prototype.bind()
  //
  // goldberg.bind(data) creates a NEW function where `this` is permanently
  // set to `data`. Then we immediately call it with (a) as the argument.
  // It's equivalent to: goldberg.call(data, a)
  //
  // This pattern is used throughout this code to share state (the `data`
  // object) across functions without passing it as a parameter.
  // It tests whether you understand how `this` binding works in JS.
  const y = goldberg.bind(data)(a)
  // After goldberg runs:
  //   data.l = ['the','sly','quick','brown','fox','jumped','over','the','lazy','cat']
  //   data.y = ['tac', 'revo', 'nworb']  (reversed words, reversed order)
  //   y      = same reference as data.y

  // ---- Template literal inside .map() ----
  //
  // data.y.map(f => f + (`(${f.length})`))
  //
  // The template literal `(${f.length})` evaluates to a string like '(3)'.
  // The outer parens around the template literal are just grouping — they
  // don't change anything. It's the same as:
  //   f => f + `(${f.length})`
  //
  // TRACE:
  //   'tac'   → 'tac'   + '(3)' = 'tac(3)'      (length 3)
  //   'revo'  → 'revo'  + '(4)' = 'revo(4)'      (length 4)
  //   'nworb' → 'nworb' + '(5)' = 'nworb(5)'     (length 5)
  //
  // .join(' ') glues them with spaces:
  //   data.s = 'tac(3) revo(4) nworb(5)'
  data.s = data.y.map(f => f + (`(${f.length})`)).join(' ')

  // ---- The big chain on the final line ----
  //
  // Let's break this apart step by step:
  //
  // STEP 1: rocks.bind(data)()
  //   Calls rocks() with this = data.
  //   rocks() returns this.s = 'tac(3) revo(4) nworb(5)'
  //
  // STEP 2: .split(' ')
  //   'tac(3) revo(4) nworb(5)'.split(' ')
  //   → ['tac(3)', 'revo(4)', 'nworb(5)']
  //
  // STEP 3: .map(g => the.bind(g)())
  //   For each string g, call the() with this = g:
  //
  //   g = 'tac(3)':
  //     pI = 3  (index of '(')
  //     this.substr(3)     = '(3)'
  //     this.substr(0, 3)  = 'tac'
  //     machine('tac')     = 'cat'
  //     .toUpperCase()     = 'CAT'
  //     return '(3)' + 'CAT' = '(3)CAT'
  //
  //   g = 'revo(4)':
  //     pI = 4
  //     this.substr(4)     = '(4)'
  //     this.substr(0, 4)  = 'revo'
  //     machine('revo')    = 'over'
  //     .toUpperCase()     = 'OVER'
  //     return '(4)' + 'OVER' = '(4)OVER'
  //
  //   g = 'nworb(5)':
  //     pI = 5
  //     this.substr(5)     = '(5)'
  //     this.substr(0, 5)  = 'nworb'
  //     machine('nworb')   = 'brown'
  //     .toUpperCase()     = 'BROWN'
  //     return '(5)' + 'BROWN' = '(5)BROWN'
  //
  // STEP 4: .join(' ')
  //   → '(3)CAT (4)OVER (5)BROWN'
  //
  const p = rocks.bind(data)().split(' ').map(g => the.bind(g)()).join(' ')

  console.log(p)
  // ACTUAL OUTPUT: '(3)CAT (4)OVER (5)BROWN'
  //
  // The interview comment said 'CAT(3) BROWN(5) OVER(4)'.
  // The format difference (parens-first vs word-first) comes from the
  // concatenation order in the(). The word-order difference (OVER before
  // BROWN vs. BROWN before OVER) is just the natural sequence after
  // the reverse in goldberg.
}


// ============================================================
//  SUMMARY OF JS QUIRKS TESTED
// ============================================================
//
//  1. Function.prototype.bind(thisArg)
//     Creates a new function with `this` permanently set.
//     Used everywhere here to share the `data` object.
//
//  2. Modulo with a number smaller than the divisor
//     3 % 10 = 3.  The number is its own remainder. Acts like a
//     circular/wrapping index.
//
//  3. new Array(n) creates a sparse array
//     Holes are skipped by .map()/.forEach()/.filter(), but direct
//     index assignment (arr[i] = val) fills them just fine.
//
//  4. .reverse() mutates in place AND returns the same reference
//     So data.y and y in rube() are the same object after goldberg.
//
//  5. .forEach() always returns undefined
//     Unlike .map() which returns a new array. `const v = [...].forEach()`
//     means v is always undefined.
//
//  6. Template literals with expressions: `(${f.length})`
//     The ${} interpolation evaluates the expression inside.
//     Extra parens around a template literal are just grouping, no effect.
//
//  7. .search(regex) returns an index, not a boolean
//     Unlike .test() which returns true/false.
//
//  8. .substr() vs .substring() vs .slice()
//     .substr(start, length) — deprecated but universally supported.
//     .substring(start, end) — the modern equivalent.
//     .slice(start, end) — also works, supports negative indices.
//
//  9. String primitives vs String objects
//     .bind() wraps a string primitive in a String object.
//     String methods still work because they're on the prototype.
//
// 10. Method chaining
//     The entire line 33 chains 6 operations. Being able to mentally
//     "unwrap" a chain like this is exactly what they're testing.


rube(3)
