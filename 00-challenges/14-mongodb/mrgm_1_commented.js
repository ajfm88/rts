/**
 * Context:
 * Not a completion exercise. Getting to the end is secondary.
 * Intent is to see how you collaborate through code, how you comment,
 * and which language properties you already know. Some patterns may be
 * new (or deliberately a little noisy) – that is okay.
 *
 * Hint:
 * Highly suggest writing comments under every complex or non-obvious line.
 * Especially track what `this` refers to after each .bind().
 */

function the() {
  // Always invoked as the.bind(stringToken)()
  // therefore `this` inside the function is the string itself
  const digitAt = this.search(/\d/);
  const parenAndNum = this.slice(digitAt - 1); // includes the opening "("
  const reversedWord = this.slice(0, digitAt - 1);
  return machine(reversedWord).toUpperCase() + parenAndNum;
}

function machine(text) {
  // character-level reverse written with a spread (tiny extra noise)
  return [...String(text)].reverse().join("");
}

function goldberg(pickList, ..._ignored) {
  // rest parameter is never used
  // this === shared data object (forced by .bind)
  this.y = new Array(pickList.length); // sparse array on purpose

  const t = pickList.map((b) => this.l[b % this.l.length]);

  // Red-herring that mirrors the original interview code almost exactly:
  // - unnecessary spread of an already-real array
  // - forEach used solely for side-effects
  // - return value of forEach (always undefined) is captured in a dead variable
  const v = [...t].forEach((r, i) => {
    this.y[i] = machine(r);
  });

  // reverse both mutates the array in place and returns it
  return this.y.reverse();
}

function rocks() {
  return this.s;
}

function rube(inputNumber = 99) {
  // default is never used when we call it
  const data = Object.create(null); // object with no prototype (small quirk)
  data.l = "code ready walk through screen pass green light".split(" ");

  const a = [];
  // With the call rube(1) this produces [1, 3, 5, 7]
  for (let i = 0; i < 4; i++) {
    a.push(i * 2 + inputNumber);
  }

  // Classic "bind then immediately invoke" pattern
  const y = goldberg.bind(data)(a);

  // Template literal that could have been written with ordinary +
  // (the backticks and ${} are the only reason it looks fancy)
  data.s = data.y.map((f) => f + `(${f.length})`).join(" ");

  const p = rocks
    .bind(data)()
    .split(" ")
    .map((g) => the.bind(g)())
    .join(" ");

  console.log(p);
  // When called as rube(1) the final value of p is:
  // 'LIGHT(5) PASS(4) THROUGH(7) READY(5)'
}

rube(1);
