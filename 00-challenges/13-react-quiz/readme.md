# Challenge 13 — React Multiple-Choice Quiz

A timed multiple-choice screening quiz on React fundamentals: hooks, render
behaviour, controlled components, HOCs, render props, portals and reconciliation.

11 questions, one correct answer each. Every question is transcribed below with
the original code, the original options, and — behind a collapsed `Answer`
block — the correct choice plus a short explanation.

Run `index.html` in a browser to take the quiz interactively without seeing the
answers first (see [Running the quiz](#running-the-quiz) at the bottom).

---

## Q1 — `useReducer` initial state

**Considering the code below, what is the value of the `counter` variable?**

```jsx
const MyComponent = () => {
  const [counter] = useReducer((s = 3) => s, 0);
  return <div />;
};
```

- [ ] `undefined`
- [ ] `3`
- [ ] `0`
- [ ] `[]`

<details>
<summary><b>Answer</b></summary>

**`0`**

`useReducer(reducer, initialState)` returns `[state, dispatch]`, and the initial
state is the **second** argument — `0`. The `s = 3` default parameter belongs to
the reducer function and only ever applies when the reducer is *called* with
`state === undefined`, which never happens here because no action is ever
dispatched. Destructuring `[counter]` takes the state, so `counter === 0`.

</details>

---

## Q2 — `useEffect` deps on a plain variable

**Which statement describes the effect of the code below?**

```jsx
const MyComponent = () => {
  let counter = 1;
  useEffect(() => {
    console.log('Hello');
  }, [counter]);
  return (
    <div>
      <button
        onClick={() => {
          counter = counter + 1;
        }}
      >
        Click me
      </button>
    </div>
  );
};
```

- [ ] The message `Hello` is printed only after the button is clicked.
- [ ] The message `Hello` is never printed.
- [ ] The message `Hello` is printed when `MyComponent` is mounted and each time the button is clicked.
- [ ] The message `Hello` is printed once when `MyComponent` is mounted.

<details>
<summary><b>Answer</b></summary>

**The message `Hello` is printed once when `MyComponent` is mounted.**

`counter` is a plain local variable, not state. Mutating it in `onClick` does not
schedule a re-render, so the component body never runs again and the dependency
array is never re-compared. Even if something else did trigger a re-render,
`let counter = 1` would be re-initialised to `1` every time, so the dependency
would always look unchanged. The effect therefore runs exactly once, on mount.

</details>

---

## Q3 — Controlled component?

**True or false: the component below is considered a controlled component.**

```jsx
const MyComponent = () => {
  const [isApple, setIsApple] = useState(true);
  return (
    <button onClick={() => setIsApple(!isApple)}>
      {isApple ? 'apple' : 'orange'}
    </button>
  );
};
```

- [ ] True
- [ ] False

<details>
<summary><b>Answer</b></summary>

**False**

"Controlled" is about who owns the value. Under either standard reading this
component is uncontrolled:

- *Form-element sense:* a controlled component is a form input (`<input>`,
  `<select>`, `<textarea>`) whose `value`/`checked` is driven by state and
  updated through `onChange`. There is no form element here at all — a `<button>`
  has no value bound to React state.
- *Component-API sense:* a controlled component receives its value and change
  handler from its parent via props. `MyComponent` takes no props and owns
  `isApple` internally, so the parent cannot read or set it.

Rendering *something* derived from internal state does not make a component
controlled — otherwise every stateful component would qualify.

</details>

---

## Q4 — Collapse two states into one

**How would you improve the code below in order to use a single state instead of two?**

```jsx
const Counter = ({ onChange }) => {
  const [i, setI] = useState(0);
  const increment = () => {
    onChange(i + 1);
    setI(i + 1);
  };
  return <button onClick={increment}>{i}</button>;
};

const Container = () => {
  const [i, setI] = useState(0);
  return (
    <>
      <Counter onChange={setI} />
    </>
  );
};
```

**Option A** — It is impossible to use only a single state in this example.

**Option B**

```jsx
const Counter = ({ onChange }) => {
  const [i, setI] = useState(0);
  const increment = () => {
    onChange(i + 1);
    setI(i + 1);
  };
  return <button onClick={increment}>{i}</button>;
};

const Container = () => {
  let i = 0;
  return (
    <>
      <Counter onChange={(v) => (i = v)} />
    </>
  );
};
```

**Option C**

```jsx
const Counter = ({ i, setI }) => {
  const increment = () => setI(i + 1);
  return <button onClick={increment}>{i}</button>;
};

const Container = () => {
  const [i, setI] = useState(0);
  return (
    <>
      <Counter i={i} setI={setI} />
    </>
  );
};
```

**Option D**

```jsx
const Counter = () => {
  const [i, setI] = useState(0);
  const increment = () => setI(i + 1);
  return <button onClick={increment}>{i}</button>;
};

const Container = () => {
  return (
    <>
      <Counter />
    </>
  );
};
```

<details>
<summary><b>Answer</b></summary>

**Option C**

This is textbook *lifting state up*. The original keeps two copies of the same
number — one in `Counter`, one in `Container` — kept in sync by hand through
`onChange`, which is exactly the duplicated-state smell. Option C deletes the
child's copy and makes `Counter` fully controlled: `Container` owns the single
source of truth and hands down both the value (`i`) and the setter (`setI`).

Why the others fail:

- **A** is simply wrong — C works.
- **B** replaces the parent's state with a plain `let`, which is reset to `0` on
  every render and never triggers one. It also still has the child's `useState`,
  so it hasn't even removed the second state.
- **D** *is* down to one state, which makes it the tempting distractor — but it
  removes the state from the parent instead of from the child, so `Container` can
  no longer read or share `i`. That changes the component's contract: any sibling
  or parent that needed the count (the whole reason the original lifted it) is now
  cut off. Collapsing duplicated state should keep the value at the highest level
  that needs it, not the lowest.

</details>

---

## Q5 — Async state read during first render

**Considering the code below, what will happen when the component `MyComponent` is mounted?**

```jsx
const fetchData = () =>
  new Promise((r) =>
    setTimeout(() => {
      r(['one', 'two']);
    }, 1000)
  );

const MyComponent = () => {
  const [result, setResult] = useState();
  useEffect(() => {
    fetchData().then((value) => setResult(value));
  }, []);
  return <div>{result.length}</div>;
};
```

- [ ] Only the value `2` will be displayed.
- [ ] Only the value `0` will be displayed.
- [ ] An error: `Cannot read property 'length' of undefined`.
- [ ] The value `0` will be displayed for one second, then the value `2`.

<details>
<summary><b>Answer</b></summary>

**An error: `Cannot read property 'length' of undefined`.**

`useState()` with no argument initialises `result` to `undefined`. The component
body runs **before** any effect and long before the promise resolves, so the very
first render evaluates `undefined.length` and throws — the app crashes on mount
and the fetch result never gets a chance to matter.

The fix is to give the state a sensible initial value (`useState([])`) or to
guard the read (`result?.length ?? 0`).

</details>

---

## Q6 — HOC that needs its props forwarded

**You want to hide a component after it is hovered by applying the high-order component below. Which component should be used to achieve this behavior?**

```jsx
const withHideOnHover = (C) => () => {
  const [hovered, setHovered] = useState();
  return (
    <C
      onMouseEnter={() => setHovered(true)}
      style={hovered ? { display: 'none' } : {}}
    />
  );
};
```

- [ ] `const MyC = (p) => <div onHover={p.onMouseEnter}>Hello</div>;`
- [ ] `const MyC = (p) => <div {...p}>Hello</div>;`
- [ ] `const MyC = (p) => <div onMouseEnter={p}>Hello</div>;`
- [ ] `const MyC = (p) => <div>Hello</div>;`

<details>
<summary><b>Answer</b></summary>

**`const MyC = (p) => <div {...p}>Hello</div>;`**

The HOC injects `onMouseEnter` and `style` as props on the wrapped component. A
React component does not receive DOM behaviour automatically — the wrapped
component has to forward those props onto a real DOM node. Spreading `{...p}`
puts both the handler and the style where the browser can act on them.

Why the others fail:

- `onHover` is not a React DOM event — no such prop exists, and `style` is
  dropped anyway, so the element could never hide.
- `onMouseEnter={p}` passes the whole props **object** where a function is
  expected; React would try to call an object on hover.
- The last one ignores props entirely, so nothing is ever wired up.

</details>

---

## Q7 — Functional updates and children-as-a-function

**What is the value of the variable `state` after the button is clicked two times?**

```jsx
const MyComponent = ({ children }) => {
  const [state, setState] = useState('one');
  const C = children;
  const append = () => setState((s) => s + 'one');
  return (
    <div>
      {state}
      <C onClick={append} value={state} />
    </div>
  );
};

const MyApp = () => {
  return (
    <MyComponent>
      {({ onClick }) => {
        return <button onClick={onClick}>Click me</button>;
      }}
    </MyComponent>
  );
};
```

- [ ] `oneoneone`
- [ ] `oneone`
- [ ] `one`
- [ ] An empty string

<details>
<summary><b>Answer</b></summary>

**`oneoneone`**

Two things are going on:

1. `children` is a function, and `const C = children` then `<C ... />` renders it
   as a regular function component — a valid *children-as-a-function* pattern.
   The button is wired to `append`, so clicks do reach the state setter.
2. `setState((s) => s + 'one')` is a **functional update**: each call receives the
   latest state rather than the value captured at render time.

Starting from `'one'`, two clicks append `'one'` twice: `one` → `oneone` →
`oneoneone`.

</details>

---

## Q8 — Render prop returning an array

**What is displayed on the screen after the component `MyApp` is rendered?**

```jsx
const MyComponent = ({ render }) => {
  return <>{render().join(',')}</>;
};

const MyApp = () => {
  return <MyComponent render={() => ['One', 'Two']} />;
};
```

- [ ] Nothing. The application will crash due to an error.
- [ ] The text `One,Two`.
- [ ] The text `[Object Object]`.
- [ ] The text `['One', 'Two']`.

<details>
<summary><b>Answer</b></summary>

**The text `One,Two`.**

Standard *render prop*: `MyComponent` calls the `render` function it was handed,
which returns `['One', 'Two']`. `.join(',')` turns that array into the plain
string `"One,Two"` **before** React ever sees it, and a string child renders
verbatim. The fragment adds no markup, so the screen shows `One,Two`.

Nothing here can throw, and there is no object to stringify — `[Object Object]`
would require rendering an object, not an array of strings.

</details>

---

## Q9 — Events through a portal

**Considering the code below, what is the value of the variable `counter` after the button is clicked for the first time?**

```jsx
const MyApp = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div onClick={() => setCounter(counter + 1)}>
      {counter}
      {ReactDOM.createPortal(<button>Click me</button>, document.body)}
    </div>
  );
};
```

- [ ] `0`
- [ ] `1`
- [ ] `2`
- [ ] `undefined`

<details>
<summary><b>Answer</b></summary>

**`1`**

A portal changes *where the DOM node lands*, not *where the component lives in
the React tree*. The button is physically appended to `document.body`, but for
event purposes it is still a child of the `<div>`, so React's synthetic click
bubbles up to the `<div>`'s `onClick` — this is the documented behaviour of
portals and the main reason modals-in-portals still work with handlers on their
logical parent.

The handler fires exactly once (the button is not a DOM descendant of the div, so
there is no second, native bubble through it), giving `0 + 1 = 1`.

</details>

---

## Q10 — Fragments, arrays and the real DOM

**What is the result of the code below in the HTML DOM tree?**

```jsx
const MyApp = () => {
  return (
    <>
      {[
        <div key="0">Apple</div>,
        <div key="1">Orange</div>,
      ]}
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```

**Option A**

```html
<div id="root">
  [
    <div>Apple</div>
    <div>Orange</div>
  ]
</div>
```

**Option B**

```html
<div id="root">
  <>
    <div>Apple</div>
    <div>Orange</div>
  </>
</div>
```

**Option C**

```html
<div id="root">
  <div>Apple</div>
  <div>Orange</div>
</div>
```

**Option D** — None. The code will result in an error.

<details>
<summary><b>Answer</b></summary>

**Option C**

Neither fragments nor arrays produce DOM nodes. A fragment is a grouping
construct that React unwraps when it commits, and an array of elements is just
"render each of these in order" — the brackets are JavaScript syntax, never
output. So only the two `<div>`s reach the DOM, as direct children of `#root`.

Options A and B invent markup that has no DOM equivalent (`[`/`]` and `<>` are
not HTML). Option D is wrong because the code is valid: keys are supplied, which
is exactly what an array of children requires.

</details>

---

## Q11 — Counting renders

**Considering the components below, how many times will the message `rendering` be printed on the console when the `MyApp` component is first rendered?**

```jsx
const MyComponent = () => {
  const [counter, setCounter] = useState(0);
  console.log('rendering');
  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>;
};

const MyApp = () => {
  const [message, setMessage] = useState();
  useEffect(() => {
    setMessage('Hello');
  }, []);
  return (
    <div>
      {message}
      <MyComponent />
    </div>
  );
};
```

- [ ] One time.
- [ ] Three times.
- [ ] No message will be displayed.
- [ ] Two times.

<details>
<summary><b>Answer</b></summary>

**Two times.**

1. **Initial render.** `MyApp` renders with `message === undefined`, and
   `MyComponent` renders as its child → `rendering` (1).
2. **After the effect.** `useEffect` runs post-commit and calls
   `setMessage('Hello')`. `message` changed from `undefined` to `'Hello'`, so
   `MyApp` re-renders. `MyComponent` is a plain (non-memoised) child, so a parent
   re-render re-renders it too, even though none of its own state or props changed
   → `rendering` (2).

The effect has `[]` deps so it never runs again, and nothing else updates state,
so it stops at two.

*Caveat worth mentioning in an interview:* under `<React.StrictMode>` in
development, React 18 double-invokes render, so you would actually see four logs
in the console. The question is asking about production semantics.

</details>

---

## Themes to review

| Theme | Questions |
|---|---|
| Hook APIs and argument order | Q1 |
| What actually triggers a re-render (state vs. plain variables) | Q2, Q4, Q11 |
| Controlled vs. uncontrolled | Q3 |
| Lifting state up / single source of truth | Q4 |
| Render order: body runs before effects | Q5, Q11 |
| HOCs and prop forwarding | Q6 |
| Functional state updates | Q7 |
| Render props and children-as-a-function | Q7, Q8 |
| Portals: DOM tree vs. React tree | Q9 |
| Fragments, arrays, keys and reconciliation | Q10 |

---

## Running the quiz

`index.html` is a self-contained interactive version of the same 11 questions —
it hides the answers until you commit to a choice, then shows the explanation and
tracks your score.

Open it directly in a browser:

```bash
start index.html      # Windows
```

Or serve it if you prefer a real origin:

```bash
npx serve .
```

It loads React and Babel from a CDN, so it needs an internet connection on first
load. No build step, no `npm install`.
