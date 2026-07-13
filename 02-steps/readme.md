# State, Events, and Forms — Interactive Components

## What We Need to Learn About State

> **State** is the most important concept in React — so we keep learning about it throughout the entire course.

### What React developers need to learn about state

1. **What is state and why do we need it?** — _this section_
2. **How to use state in practice?** — _rest of the course..._
   - `useState`
   - `useReducer`
   - Context API
3. **Thinking about state** — _rest of the course..._
   - When to use state
   - Where to place state
   - Types of state

## What Is State?

- Data that a component **can hold over time** — necessary for information that it needs to **remember** throughout the app's lifecycle
- 🧠 **"Component's memory"**
- **"State variable" / "piece of state"** — a **single** variable in a component (component state). We use these terms **interchangeably**
- Updating **component state** triggers React to **re-render the component**

> Examples in the wild: a `Notifications`/`Messages` badge count (`9+`), the text typed into a search box, the active tab (`Overview` / `Q&A` / `Notes`), the number of items in a shopping cart — all pieces of state that change over time.

- **State keeps data and UI in sync**: `State → Component View`. Changing the **data** (state) re-renders the **UI**, so the component rendered in the UI always reflects the current state.

### State allows developers to

1. **Update the component's view** (by re-rendering it)
2. **Persist local variables** between renders

> 👋 **State is a tool.** Mastering state will unlock the power of React development.

### Where state lives inside a component

- A **component** is made of **Data**, **Logic**, and **Appearance**
- **Data** splits into two kinds:
  - **Props** — passed **into** the component from its **parent component**
  - **State** — the component's **own** internal data

Note: You can only call **hooks** like **useState** at the top level of a function.

## The Mechanics of State in React

- We **don't do direct DOM manipulations** — because React is **declarative** (we never touch the DOM by hand)
- **How is a component view updated then?**
- **In React, a view is updated by re-rendering the component** — _important React principle_
- A component is **re-rendered when its state is updated**
- **So to update a view, we update state** ✅ (this is the takeaway the whole chain leads to)

### The flow

```
STATE  →  RENDER / RE-RENDER  →  UPDATED VIEW
```

- **STATE** → When state changes, React **calls the component function again** (this is the re-render)
- **RENDER / RE-RENDER** → produces the new view
- **UPDATED VIEW** → the UI reflecting the new state

> 👉 **State is preserved throughout re-renders** — even though React calls the component function again, the state is not reset.

### The full update cycle (event-driven)

The view triggers the cycle, and the cycle produces a new view — updating state is the mechanism that connects them:

1. **Event handler** — an event on the current view (e.g. a button click) runs an event handler
2. **Update state** — the handler updates the state → **Updated State**
3. **Re-render** — the state change triggers **Render / Re-render**, producing the **Updated View**

```
                    ┌──────── 3. RE-RENDER ────────┐
                    ▼                               │
   UPDATED STATE  →  RENDER / RE-RENDER  →  UPDATED VIEW
        ▲                                           │
        └──────── 2. UPDATE STATE ◄── 1. Event handler
```

> This is what makes React apps interactive: **event → update state → re-render → updated view**, and around again.

### A concrete example (the "advice" app)

State declared with `useState`, where the initial value renders into the view:

```jsx
const [advice, setAdvice] = useState("Quality beats quantity.");
const [countAdvice, setCountAdvice] = useState(13);
```

When the **Get advice** button is clicked, the handler **updates state**:

```jsx
setAdvice(data.slip.advice);
setCountAdvice((count) => count + 1);
```

- This triggers a **re-render**, and the view reflects the new state — the advice text and _"You have read **13** pieces of advice"_
- Note `setCountAdvice((count) => count + 1)` uses the **updater function** form: the new value is derived from the **current** state (`count`)

### Why is React called "React"?

> 👉 **React _reacts_ to state changes by re-rendering the UI.**

- This is the whole point: **`DATA ⇄ UI`** — the data (state) and the UI are kept in a two-way sync loop, where a change in state drives React to re-render the UI to match.
