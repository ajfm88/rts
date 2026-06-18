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
