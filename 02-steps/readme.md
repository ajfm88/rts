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
