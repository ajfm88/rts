/**
 * Context:
 * Not a completion exercise, getting to the end is not really the goal.
 * Intent is to see how we collaborate through code together, and what
 * properties you're familiar with. Some may be new and thats okay.
 *
 * Hint :
 * Highly suggest making comments under complex lines.
 */

// ─── the() ───────────────────────────────────────────────────────────────
// This function is *never* called as a normal method.
// It is always invoked via .bind(someString)(), so `this` becomes a string.
function the() {
  // String.prototype.search returns the index of the first match of the regex.
  // /[()]/ means "find the first character that is either ( or )"
  // On the string "tac(3)" → pI = 3  (the position of the '(')
  const pI = this.search(/[()]/);

  // this.substr(pI)          → from index 3 to the end → "(3)"
  // this.substr(0, pI)       → from 0, length 3        → "tac"
  // machine("tac")           → reverse the characters  → "cat"
  // .toUpperCase()           → "CAT"
  //
  // Final concatenation order is what produces "(3)CAT" instead of "CAT(3)".
  // (If the two pieces were swapped you would get the format shown in the
  // interviewer's comment.)
  return this.substr(pI) + machine(this.substr(0, pI)).toUpperCase();
}

// ─── rube(inputNumber) ───────────────────────────────────────────────────
function rube(inputNumber) {
  // called as rube(3)
  const phrase = "the sly quick brown fox jumped over the lazy cat";
  const data = {}; // plain object that will act as the shared "this"

  const a = [];
  data.l = phrase.split(" ");
  // data.l is now:
  // [0:"the", 1:"sly", 2:"quick", 3:"brown", 4:"fox",
  //  5:"jumped", 6:"over", 7:"the", 8:"lazy", 9:"cat"]
  // length === 10

  // Hard-coded loop that always runs 3 times, regardless of inputNumber.
  // With inputNumber = 3 we get a = [3, 6, 9]
  for (let i = 1; i <= 3; i++) {
    a.push(i * inputNumber);
  }

  // goldberg.bind(data) creates a *new function* whose `this` is permanently
  // set to the data object.  Then we immediately invoke it with (a).
  // This is the classic "borrow a method and force its this" pattern.
  const y = goldberg.bind(data)(a);
  // After this call:
  //   data.y  === ["tac", "revo", "nworb"]   (the reversed array)
  //   y       === the same array (because goldberg returns this.y.reverse())

  // Template-literal gotcha that tripped you:
  //   (`(${f.length})`)
  // The outer backticks turn the whole thing into a template literal.
  // ${f.length} is evaluated, so for f = "tac" we get the string "(3)".
  // It is exactly equivalent to '(' + f.length + ')' but written with templates.
  // Then we concatenate:  f + thatString  →  "tac(3)"
  data.s = data.y.map((f) => f + `(${f.length})`).join(" ");
  // data.s is now the string:  "tac(3) revo(4) nworb(5)"

  // rocks.bind(data)()  →  simply returns data.s
  // Then we split, map each token through the(), and join again.
  const p = rocks
    .bind(data)()
    .split(" ")
    .map((g) => the.bind(g)()) // bind the string itself as `this` for the()
    .join(" ");

  console.log(p); // →  "(3)CAT (4)OVER (5)BROWN"
}

// ─── goldberg(pickList) ──────────────────────────────────────────────────
// Again always called via .bind(data), so `this` === the data object.
function goldberg(pickList) {
  // pickList = [3, 6, 9]
  // Creates a sparse array of length 3:  [ <3 empty items> ]
  this.y = new Array(pickList.length);

  // Classic modulo indexing trick:
  //   b % this.l.length
  // When the number is smaller than the length, n % len === n itself.
  // That is exactly the "number % 10 gives you the number itself" quirk
  // the interviewers mentioned.
  // 3 % 10 → 3 → "brown"
  // 6 % 10 → 6 → "over"
  // 9 % 10 → 9 → "cat"
  const t = pickList.map((b) => this.l[b % this.l.length]);
  // t = ["brown", "over", "cat"]

  // [...t] creates a shallow copy (so we don't mutate the original t).
  // forEach always returns undefined, therefore the variable `v` is useless
  // (it is always undefined).  The only purpose of the forEach is the
  // side-effect of writing into this.y.
  const v = [...t].forEach((r, i) => (this.y[i] = machine(r)));
  // after the forEach:  this.y = ["nworb", "revo", "tac"]

  // Array.prototype.reverse() mutates the array *in place* and also returns it.
  // So this both changes data.y and returns the reversed version.
  return this.y.reverse();
  // now this.y (and the return value) = ["tac", "revo", "nworb"]
}

// ─── machine(m) ──────────────────────────────────────────────────────────
// Simple character-level reverse.  Pure function, no `this` involved.
function machine(m) {
  return m
    .split("") // "brown" → ["b","r","o","w","n"]
    .reverse() //          → ["n","w","o","r","b"]
    .join(""); //          → "nworb"
}

// ─── rocks() ─────────────────────────────────────────────────────────────
// Also always called via .bind(data).  Just a getter for the string we built.
function rocks() {
  return this.s;
}
