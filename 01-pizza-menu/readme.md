- [Pizza Menu](https://fast-react-pizza-menu.netlify.app) (Components, props, JSX)

## JSX is Declarative

### Imperative (vanilla JS) — *"How to do things"*

- Manual DOM element selections and DOM traversing
- Step-by-step DOM mutations until we reach the desired UI

### Declarative (React/JSX) — *"What we want"*

- Describe what UI should look like using JSX, **based on current data**
- React is an **abstraction** away from DOM: **we never touch the DOM**
- Instead, we think of the UI as a **reflection of the current data**

## Separation Of Concerns

### Traditional — *one technology per file*

- Separate files for **HTML**, **CSS**, and **JS**
- Worked when JS only added small bits of interactivity to a page

### Why it broke down

- Rise of interactive **SPAs** → **JavaScript is in charge of the HTML**
- **Logic and UI became tightly coupled** — they belong together
- Splitting them across files just *artificially* separates things that are really one concern

### Modern (React) — *one component per file*

- A **completely new paradigm**: separation by **component**, not by technology
- **HTML and JS are colocated** inside the same component (JSX)
- Each component bundles its own **data**, **logic**, and **appearance**
- **Each component is concerned with one piece of the UI** (Question, Menu, Filters, Player…)
- The *fundamental reason* components exist → **React Components + JSX**

## Props, Immutability, and One-Way Data Flow

### Reviewing Props

- Props are used to pass data from **parent components** to **child components** (down the component tree)
- Data flows **one way**: `App` → `Header` / `Menu` / `Footer` → `Pizza` (x3) / `Order`
- Essential tool to **configure** and **customize** components (like function parameters)
- With props, parent components **control** how child components look and work

```jsx
<Menu>
  <Button bgColor="blue" text="New" />
  <Button bgColor="green" text="Edit" />
  <Button bgColor="red" text="Delete" />
</Menu>
```

- Each `Button` receives different `bgColor` and `text` props, so the **same component** renders differently: **NEW** (blue), **EDIT** (green), **DELETE** (red)
- **Anything** can be passed as props: single values, arrays, objects, functions, even other components

```jsx
function CourseRating() {
  const [rating, setRating] = useState(0);

  return (
    <Rating
      text="Course rating"
      currentRating={rating}
      numOptions={3}
      options={["Terrible", "Okay", "Amazing"]}
      allRatings={{ num: 2390, avg: 4.8 }}
      setRating={setRating}
      component={Star}
    />
  );
}

function Star() {
  // To do
}
```

- `text` → string, `currentRating` / `numOptions` → numbers, `options` → array, `allRatings` → object, `setRating` → function, `component` → another component (`Star`)

### Props Are Read-Only!

- A **component** is made up of **data**, **logic**, and **appearance**
- **Data** splits into two kinds:
  - **Props** — data coming from the **outside**, can only be updated by the **parent component**
  - **State** — **internal** data that can be updated by the **component's own logic**

```jsx
// Don't do this!
let x = 7;

function Component() {
  x = 23;
  return <h1>Number {x}</h1>;
}
```

- **Props are read-only, they are immutable!** This is one of React's strict rules
- If you need to mutate props, you actually **need state**

**Why?**

- Mutating props would affect the parent, creating **side effects** (not pure)
- Components have to be **pure functions** in terms of props and state
- This allows React to **optimize apps**, avoid bugs, and make apps **predictable**

### Pure Functions

- A **pure function** always returns the **same output** given the **same input**, and has **no side effects** (doesn't change anything outside its own scope)
- **React assumes every component is a pure function** of its props and state — same props/state in, same JSX out. This is what makes UI predictable and lets React safely optimize rendering
- The opposite is an **impure function**: it can produce **different output for the same input**, and/or it **mutates external state** (e.g. the `let x = 7; x = 23;` example above) — this is exactly what React's rules forbid inside components

### One-Way Data Flow

- Data flows **down** the component tree only (parent → child), via props — **never up, never sideways**
- `App` → `Header` / `Menu` / `Footer` → `Menu` → `Pizza` (x3), `Footer` → `Order`

One-way data flow...

- ...makes applications **more predictable** and easier to understand
- ...makes applications **easier to debug**, as we have more control over the data
- ...**is more performant**

> Angular has **two-way** data flow, unlike React

## Rules of JSX

### General JSX Rules

- JSX works essentially like HTML, but we can enter **"JavaScript mode"** by using `{}` (for text or attributes)
- We can place **JavaScript expressions** inside `{}`. Examples: reference variables, create arrays or objects, `[].map()`, ternary operator
- **Statements are not allowed** (`if`/`else`, `for`, `switch`)
- **JSX produces a JavaScript expression**

```jsx
const el = <h1>Hello React!</h1>;
// is the same as
const el = React.createElement("h1", null, "Hello React!");
```

1. We can place **other pieces of JSX** inside `{}`
2. We can write JSX **anywhere** inside a component (in `if`/`else`, assign to variables, pass it into functions)

- A piece of JSX can only have **one root element**. If you need more, use `<React.Fragment>` (or the short `<>`)

### Differences between JSX and HTML

- `className` instead of HTML's `class`
- `htmlFor` instead of HTML's `for`
- Every tag needs to be **closed**. Examples: `<img />` or `<br />`
- All event handlers and other properties need to be **camelCased**. Examples: `onClick` or `onMouseOver`
- **Exception**: `aria-*` and `data-*` are written with dashes like in HTML
- CSS inline styles are written like this: `{{<style>}}` (to reference a variable, and then an object)
- CSS property names are also **camelCased**
- Comments need to be in `{}` (because they are JS)
