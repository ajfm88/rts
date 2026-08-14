/**
 *  Walk through the code and figure out what gets logged at the end.
 *
 *  Hint: track the `silo` object. It travels between functions via .bind().
 *  Hint: not every line contributes to the final output.
 **/

function morph(c) {
  return String.fromCharCode(c.charCodeAt(0) & ~32)
}

function extract() {
  const { length: count } = this.w
  this.buf = this.picks.map(i => this.w[i][0])
  const ghost = [...this.buf].forEach((c, j) => this.out[j] = morph(c))
  this.total = ghost || count
  return ghost
}

function channel() {
  return this.out.join(typeof NaN === 'number' ? '' : ' ')
}

//launch(5)
function launch(n) {
  const phrase = 'each happy rhino is dancing'
  const silo = { out: [] }

  silo.w = phrase.split(' ')

  const raw = [54, 101, 23, 40, 32]
  const sorted = raw.sort()

  silo.picks = sorted.map(x => x % (typeof null === 'object' && n * 2))

  const unused = extract.bind(silo)()

  const nothing = void silo.w.push('hooray')

  const p = (nothing ?? unused ?? channel.bind(silo))()
  console.log(p)
}

launch(5)
