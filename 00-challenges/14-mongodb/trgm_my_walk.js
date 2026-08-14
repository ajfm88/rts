/**
 *  Context:
 *   Not a completion exercise, getting to the end is not really the goal.
 *   Intent is to see how we collaborate through code together, and what
 *   properties you're familiar with. Some may be new and thats okay.
 *
 *  Hint :
 *     Highly suggest making comments under complex lines.
 **/

function the() {
  // 19. each individual element of ['tac(3)', 'revo(4)', 'nworb(5)'] is used as this
  const pI = this.search(/[()]/);
  // 20. regEx that means "find the first ( or )."
  // for 'tac(3)', it means:
  // t a c ( 3 )
  // 0 1 2 3 4 5
  // 3 gets returned
  return this.substr(pI) + machine(this.substr(0, pI)).toUpperCase();
  // 21. first this is 'tac(3)', pI is 3
  // LEFT:  substr(3) → from index 3 to the end → '(3)'
  // RIGHT: substr(0, 3) → first 3 chars → 'tac'
  //        machine('tac') → 'cat', then .toUpperCase() → 'CAT'
  // glue: '(3)' + 'CAT' → '(3)CAT'
}

function rube(inputNumber) {
  // 02. entering here with value 3
  const phrase = "the sly quick brown fox jumped over the lazy cat";
  const data = {};
  const a = [];
  data.l = phrase.split(" ");
  // 03. we have that data.l is just gonna be ['the', 'sly', 'quick'...]
  for (let i = 1; i <= 3; i++) {
    a.push(i * inputNumber);
    // 04. a ends up eing [3, 6, 9]
  }
  const y = goldberg.bind(data)(a);
  // 05. We call goldberg and we attach, as context/state, the data object
  // then we pass a (which is [3, 6, 9]) as an argument to it
  data.s = data.y.map((f) => f + `(${f.length})`).join(" ");
  // 13. data.y is ['tac', 'revo', 'nworb'], we map over it and we append the length
  // so as a middle step, we get ['tac(3)', 'revo(4)', 'nworb(5)']
  // and then join(" ") joins them all into 'tac(3) revo(4) nworb(5)'
  // this string is what data.s becomes.
  const p = rocks
    .bind(data)()
    // 14. const p calls rocks with data as the this bind
    .split(" ")
    // 17. we receive the string 'tac(3) revo(4) nworb(5)'
    // and it gets split into an array that looks like:
    // ['tac(3)', 'revo(4)', 'nworb(5)']
    .map((g) => the.bind(g)())
    // 18. we map (build a new array) over each element of ['tac(3)', 'revo(4)', 'nworb(5)']
    // and we call the 'the' function with each string in that array as its this/state value.

    // 22. After step 21. we land here with ['(3)CAT', '(4)OVER', '(5)BROWN']
    .join(" ");
  // 23. this joins the array, puts a space between each element
  // and we get '(3)CAT (4)OVER (5)BROWN'
  console.log(p);
  // 24. '(3)CAT (4)OVER (5)BROWN' gets printed onto the console.
}

function goldberg(pickList) {
  // 06. we are here, using [3, 6, 9] as the argument and data as the context
  this.y = new Array(pickList.length);
  // 07. this.y is basically data.y. pickList.length is 3, so we create a SPARSE array with 3 empty slots
  const t = pickList.map((b) => this.l[b % this.l.length]);
  // 08. this.l.length (data.l.length) is 10. b is gonna be 3, 6, 9 and modulo 3 % 10 returns 3
  // same with 6 % 10 (returns 6). this.l is data.l so we pick elements 3, 6 and 9
  // and we assign them to t, such that t = ['brown', 'over', 'cat']
  const v = [...t].forEach((r, i) => (this.y[i] = machine(r)));
  // 09. we spread t, but it IS ALREADY an array, so nothing really happens there.
  // this.y which is data.y, (the sparse array from 07) gets filled with values from machine(r)
  // then we have the forEach, which returns undefined, but its side effect still happens.
  return this.y.reverse();
  // 12. this flips the array in place and returns ['tac', 'revo', 'nworb']
}

function machine(m) {
  // 10. we enter machine(m) with m on a per-word basis, so we get 'brown', 'over' and then 'cat'
  return m.split("").reverse().join("");
  // 11. after this line runs on each element, we end up sending back 'nworb', 'revo' and 'tac'
}

function rocks() {
  // 15. we come from 14. and we call rocks with NO argument, but with data as the this/context
  return this.s;
  // 16. from step 13. we know that data.s is just the string 'tac(3) revo(4) nworb(5)'
  // this gets returned and used on step 17.
}

rube(3);
// 01. calling rube with value 3
