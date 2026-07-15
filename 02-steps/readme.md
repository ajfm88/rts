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

## One Component, One State

> 👋 **Each component has and manages its _own_ state**, no matter how many times we render the same component.

- State is **isolated per component instance** — it is **local** to the instance where it's declared
- Rendering the **same component** multiple times creates **multiple _instances_** of that component, and **each instance holds its own independent state**
- Updating one instance's state **does not affect** the other instances

### Example — a `TeamScores` component with three `Counter`s

```
              TeamScores
                  │
    ┌─────────────┼─────────────┐
 Counter       Counter       Counter
 score = 2     score = 0     score = 0
```

- The **`Counter`** component is rendered **three times** → three separate **instances**
- Each `Counter` keeps its **own `score`** piece of state:
  - _Score Bayern Munich_ → **2**
  - _Score Real Madrid_ → **0**
  - _Score Benfica_ → **0**
- Clicking the first counter to `score = 2` leaves the other two at `0` — proof that **state is per instance**, not shared across all renders of the component.

> 🔑 **Takeaway: state is isolated inside each component.**

## UI as a Function of State

- The entire UI is the **result of applying a function to the current state** — components (A, B, C, D…) combine to produce the UI:

```
UI = f(state)
```

- As **state changes over time**, React re-runs that function and the **UI updates to match** each new state:

```
STATE:   ▨▨      →     ▨▨      →     ▨▨      →     ▨▨     → … (TIME)
         ▨▨            ▨▨            ▨▨            ▨▨
UI:    [browser]     [browser]     [browser]     [browser]
```

- Each snapshot of **state** produces a corresponding snapshot of the **UI** — change one piece of state, and only the part of the UI that depends on it changes.

### Declarative, revisited

> 👉 With state, we view the UI as a **reflection of data changing over time**.

> 👉 We **_describe_** that reflection of data using **state**, **event handlers**, and **JSX** — we don't manually manipulate the DOM.

- This is the **declarative** approach: we tell React **what** the UI should look like for a given state, and React figures out **how** to update the DOM.

## 🎯 In Practical Terms… — Practical Guidelines About State

1. 👉 Use a **state variable** for any data that the component should keep track of ("remember") over time. **This is data that will change at some point.** In Vanilla JS, that's a `let` variable, or an `[]` or `{}`.

2. 👉 Whenever you want something in the component to be **dynamic**, create a **piece of state** related to that "thing", and **update the state** when the "thing" should change (aka "be dynamic").
   > **Example:** A modal window can be open or closed. So we create a state variable `isOpen` that tracks whether the modal is open or not. On `isOpen = true` we display the window, on `isOpen = false` we hide it.

3. 👉 If you want to **change the way a component looks**, or the data it displays, **update its state.** This usually happens in an **event handler** function.

4. 👉 When building a component, imagine its view as a **reflection of state changing over time**.

5. 👉 For data that **should _not_ trigger** component re-renders, **don't use state** — use a regular variable instead. This is a common **beginner mistake**.
