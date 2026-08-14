/**
 *  Walk through the code and figure out what gets logged at the end.
 *
 *  Hint: track the `silo` object. It travels between functions via .bind().
 *  Hint: not every line contributes to the final output.
 **/

function morph(c) {
  // 10. morph is called once per letter in this.buf: 'h', 'i', 'r', 'e', 'd'.
  return String.fromCharCode(c.charCodeAt(0) & ~32);
  // 11. each letter gets CAPITALIZED. so, silo.out
  // becomes ['H', 'I', 'R', 'E', 'D']
}

function extract() {
  const { length: count } = this.w;
  // 07. we are destructuring silo.w and calculating the length of
  // the w array. We get 5, and we assign 5 to a variable count = 5
  this.buf = this.picks.map((i) => this.w[i][0]);
  // 08. we create the buf property in silo
  // then we chain index with silo.w[i][0]
  // map walks the indexes 1, 3, 2, 0, 4
  // silo.buf ends up becoming ['h', 'i', 'r', 'e', 'd'].
  const ghost = [...this.buf].forEach((c, j) => (this.out[j] = morph(c)));
  // 09. we spread buf into another array, but it IS already an array
  // forEach returns undefined, but the writes to this.out will still happen
  this.total = ghost || count;
  // 12. ghost is undefined (forEach returns undefined), so count evaluates
  // total becomes count, which is 5 (step 07)
  return ghost;
  // 13. we return ghost (undefined)
}

function channel() {
  return this.out.join(typeof NaN === "number" ? "" : " ");
  // 17. NaN IS a number, so we join the out propery from silo
  // with "", so no space between each char
  // silo.out is ['H', 'I', 'R', 'E', 'D'] → 'HIRED'.
}

//launch(5)
function launch(n) {
  const phrase = "each happy rhino is dancing";
  const silo = { out: [] };
  // 02. an object named silo is initialized with key:value pair of out:empty array

  silo.w = phrase.split(" ");
  // 03. the w property in silo is now ['each', 'happy', 'rhino'...]

  const raw = [54, 101, 23, 40, 32];
  const sorted = raw.sort();
  // 04. metod .sort() mutates an array in place, so now sorted and raw are the same
  // Default .sort() turns items into strings and compares those.
  // First chr is used to decide sorting order, so we end up with [101, 23, 32, 40, 54].

  silo.picks = sorted.map((x) => x % (typeof null === "object" && n * 2));
  // 05. typeof null is an object so n * 2 evaluates
  // so we get 101 % 10, 23 % 10... so we end up with
  // [1, 3, 2, 0, 4]

  const unused = extract.bind(silo)();
  // 06. we call the extract function using the object silo as this/context
  // and we pass nothing to it

  // 14. we get undefined and it gets assigned to unused.

  const nothing = void silo.w.push("hooray");
  // 15. silo.w is now ['each', 'happy', 'rhino', 'is', 'dancing', 'hooray']
  // after we push 'hooray' onto it. Side effect.
  // nothing is undefined due to void. Side effect still happened. silo.w remains.

  const p = (nothing ?? unused ?? channel.bind(silo))();
  // 16. nullish coalescing
  // nothing is undefined → skip
  // unused is undefined → skip
  // so we call the channel function with silo as its this/context

  console.log(p);
  // 18. 'HIRED' is printed out.
}

launch(5);
// 01. calling launch with value 5
