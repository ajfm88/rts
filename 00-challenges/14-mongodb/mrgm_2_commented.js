function paint(c) {
  return String.fromCharCode(+c);
}

function mix(xs) {
  const s = Object.create(null);
  s.b = [];
  xs.reduce((a, n, i) => ((s.b[i] = n ^ 0x20), void a), null);
  return s;
}

function flatten(o) {
  const { b: items } = o;
  return Array.from(items, (x) => x & 0xff);
}

function scramble(arr) {
  return arr
    .map((v, i) => [v, i])
    .sort((a, b) => a[1] - b[1])
    .map(([v]) => v);
}

function decode(seq) {
  return seq
    .filter((n) => n >= 65 && n <= 90)
    .map(paint)
    .join("");
}

function run(seed) {
  const raw = ((seed, list) => list.map((v) => v + (seed | 0) * 0))(
    seed,
    [99, 108, 101, 97, 114, 101, 100],
  );
  const mid = mix(raw);
  const flat = flatten(mid);
  const ordered = scramble(flat);
  const out = decode(ordered);
  console.log(out);
}

run(7);
