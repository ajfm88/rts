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
  const pI = this.search(/[()]/);
  return this.substr(pI) + machine(this.substr(0, pI)).toUpperCase()
}

function rube(inputNumber) {
  const phrase = 'the sly quick brown fox jumped over the lazy cat'
  const data = {}
  const a = []
  data.l = phrase.split(' ')
  for (let i = 1; i <= 3; i++) {
    a.push(i * inputNumber)
  }
  const y = goldberg.bind(data)(a)
  data.s = data.y.map(f => f + (`(${f.length})`)).join(' ')
  const p = rocks.bind(data)().split(' ').map(g => the.bind(g)()).join(' ')
  console.log(p)
}

function goldberg(pickList) {
  this.y = new Array(pickList.length)
  const t = pickList.map(b => this.l[b % this.l.length])
  const v = [...t].forEach((r, i) => this.y[i] = machine(r))
  return this.y.reverse()
}

function machine(m) {
  return m
    .split('')
    .reverse()
    .join('')
}

function rocks() {
  return this.s
}

rube(3)
