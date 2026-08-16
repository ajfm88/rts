# State vs. Props

> Section: **State, Events, and Forms: Interactive Components** — Lecture: **State vs. Props**

## State vs. Props

### State

- **Internal** data, owned by component
- Component **"memory"**
- Can be **updated by the component itself**
- Updating state causes component to **re-render**
- Used to **make components interactive**

### Props

- **External** data, owned by **parent component**
- Similar to **function parameters**
- **Read-only**
- **Receiving new props causes component to re-render.** Usually when the parent's state has been updated
- Used by parent to **configure** child component ("settings")

### Example — `Question` (parent) and `Button` (child)

```jsx
function Question() {
  const [upvotes, setUpvotes] = useState(0);

  return (
    <div>
      {/* ... */}
      <Button upvotes={upvotes} bgColor="blue" />
    </div>
  );
}

function Button({ upvotes, bgColor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      {/* ... */}
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: bgColor }}
      >
        {hovered ? "Upvote" : `👍 ${upvotes}`}
      </button>
    </div>
  );
}
```

- `Question` owns the **`upvotes` state** and passes it down to `Button` as the **`upvotes` prop**, along with `bgColor` — both are **read-only** inside `Button`
- `Button` owns its **own `hovered` state**, updated internally by `onMouseEnter` / `onMouseLeave` — completely private to `Button`
- Updating `upvotes` in `Question` (**parent state update**) re-renders `Question`, which sends the new value down as **props**, re-rendering `Button`
- Updating `hovered` inside `Button` (**its own state**) re-renders only `Button`

> 🔑 **Takeaway:** state flows down as props, but each component still manages and updates its own state independently.

# Fundamentals of State Management

> Section: **Thinking in React: State Management** — Lecture: **Fundamentals of State Management**

## Roadmap

- **Thinking** in React
- **State** management
- **When** and **where** to create state?
- **Derived** state
- **Lifting** up state

> 🎒 Exploring these concepts using the **"Far Away"** travel list app

## "Thinking in React" Is a Core Skill

- **How to work with the React API** ∩ **Thinking in React** = **"React Mindset"**
- The overlap between the two is **where professional React apps are built**

> 🔑 Knowing the React API isn't enough — professional apps require the **mindset** of thinking in React, not just knowledge of its syntax/features.

### What "Thinking in React" Means

- **"React Mindset"**
- Thinking about **components**, **state**, **data flow**, **effects**, etc.
- Thinking in **state transitions**, not element mutations

## "Thinking in React" as a Process

> Not a rigid process

1. Break the desired UI into **components** and establish the **component tree**
2. Build a **static** version in React (without state)
3. Think about **state**:
   - When to use state
   - Types of state: local vs. global
   - Where to place each piece of state
4. Establish **data flow**:
   - One-way data flow
   - Child-to-parent communication
   - Accessing global state

> Steps 3 and 4 together make up **state management**

### Questions You'll Be Able to Answer

- How to break up a UI design into components?
- How to make some components reusable?
- How to assemble UI from reusable components?
- What pieces of state do I need for interactivity?
- Where to place state? (What component should "own" each piece of state?)
- What types of state can or should I use?
- How to make data flow through app?

## What Is State Management?

> **State management:** Deciding **when** to create pieces of state, what **types** of state are necessary, **where** to place each piece of state, and how data **flows** through the app

> 🏠 Giving each piece of state a **home**

### Example — Udemy Shopping Cart Page

Identifying the **pieces of state (`useState`)** on a real UI:

- `searchQuery` — the search bar input (`"javascript"`)
- `shoppingCart` — the courses in the cart
- `coupons` — the applied promo code (`ST351022`)
- `notifications` — the notification bell count
- `isOpen` — whether the user account dropdown is open
- `user` — the logged-in user info shown in the dropdown
- `language` — the selected language setting

> 🔑 Every interactive piece of a real UI (search, cart, coupons, notifications, dropdowns, settings) maps to its own piece of **state**.

## Types of State: Local vs. Global State

### Local State

- State needed **only by one or few components**
- State that is defined in a component and **only that component and child components** have access to it (by passing via props)
- ☝️ *We should always start with local state*

### Global State

- State that **many components** might need
- **Shared** state that is accessible to **every component** in the entire application
- Tools: **Context API**, **Redux**

### Example — Udemy Shopping Cart Page

- `searchQuery` (search bar) → **local state**
- `My cart` (cart count, shown in both the cart page and the account dropdown) → **global state**

> 🔑 If a piece of state is only rendered/used in one place, it's local. If it needs to be reflected in multiple, unrelated components, it's global.

## State: When and Where?

> ☝️ *"Always start with local state"*

### When to Create State

Starting from **"Need to store data"**:

1. **Will data change at some point?**
   - **No** → regular `const` variable
   - **Yes** → continue
2. **Can it be computed from existing state/props?**
   - **Yes** → **derive state** instead of creating a new one
   - **No** → continue
3. **Should it re-render the component?**
   - **No** → use a **ref** (`useRef`, more on this later)
   - **Yes** → **place a new piece of state in the component**

### Where to Place State

Starting from **"Place a new piece of state in component"**:

1. **Only used by this component?**
   - **Yes** → leave it in the component
   - **No** → continue
2. **Also used by a child component?**
   - **Yes** → pass it down to child via **props**
   - **No** → continue
3. **Used by one or a few sibling components?**
   - **Yes** → **lift state up** to the first common parent
   - **No** → probably **global state** (global state management covered later in the course...)

# Lifting State Up

> Section: **Thinking in React: State Management** — Lecture: **Reviewing "Lifting Up State"**

## Problem: Sharing State With a Sibling Component

### Example — Checkout Page

Component tree:

```
        Checkout
       /        \
    Total      Promotions   ← owns [coupons, setCoupons]
```

- `Promotions` owns the **`coupons` state** (the "Enter Coupon" / "Apply" box)
- 👉 The **`Total` component also needs access to `coupons` state** — the discounted price (`€30.98`, 82% off) depends on the applied coupon
- ❌ But data **can only flow down to children (via props), not sideways to siblings**
- **ONE-WAY DATA FLOW** ⬇️

> 🤔 **How do we share state with other components?**

## Solution: Lifting State Up

> **State was lifted up to the closest _common_ parent**

```
        Checkout   ← now owns [coupons, setCoupons]
       /        \
   props        props
     ↓            ↓
   Total      Promotions
 (coupons)     (coupons)
```

- The `coupons` state is **moved from `Promotions` up to `Checkout`** (the closest common parent)
- `Checkout` then passes `coupons` **down as props** to **both** `Total` and `Promotions`
- `Promotions` also receives `setCoupons` as a prop so it can still **update** the state (child-to-parent communication)
- **ONE-WAY DATA FLOW** is preserved — nothing ever flows sideways

> ✌️ **By lifting state up, we have successfully shared one piece of state with multiple components in different positions in the component tree**

## Child-to-Parent Communication

> 🤔 If data flows from parent to children, how can `Promotions` (child) **update** state in `Checkout` (parent)?

- 👉 **Child-to-parent communication (inverse data flow):** child updating parent state (data "flowing" **up**)
- `Checkout` passes **`setCoupons` down as a prop** to `Promotions`
- When the user clicks **Apply**, `Promotions` calls `setCoupons(...)` → **UPDATE**s the state that lives in `Checkout`
- The new `coupons` value then flows back **down as props** to both `Total` and `Promotions`

> 🔑 It's not really "inverse" data flow — the **setter function** is just another prop passed down. Data still only flows one way; the child merely gets a handle to trigger the parent's update.

# Deriving State

> Section: **Thinking in React: State Management** — Lecture: **Deriving State**

## Problem: Redundant State

```jsx
const [cart, setCart] = useState([
  { name: "JavaScript Course", price: 15.99 },
  { name: "Node.js Bootcamp", price: 14.99 },
]);
const [numItems, setNumItems] = useState(2);
const [totalPrice, setTotalPrice] = useState(30.98);
```

- 👎 **Three separate pieces of state**, even though `numItems` and `totalPrice` **depend on `cart`**
- `cart` is the only piece of data that actually needs to be **stored** — `numItems` and `totalPrice` can always be **calculated from it**
- 👎 **Need to keep them in sync** (update together) — keeping them as separate state means they can get **out of sync** with `cart` and requires **manually updating all three** on every change
- 👎 **3 state updates will cause 3 re-renders**

## Solution: Derived State

> 👍 **Derived state:** state that is **computed from an existing piece of state or from props**

```jsx
const [cart, setCart] = useState([
  { name: "JavaScript Course", price: 15.99 },
  { name: "Node.js Bootcamp", price: 14.99 },
]);
const numItems = cart.length;
const totalPrice = cart.reduce((sum, cur) => sum + cur.price, 0);
```

- `numItems` and `totalPrice` are no longer `useState` — **just regular variables**, derived from `cart`
- `cart` state is the **single source of truth** for this related data
- ✅ Works because **re-rendering the component** will **automatically re-calculate** derived state — `numItems` and `totalPrice` stay in sync with `cart` for free, since they're recalculated on every render
- Fewer state updates → simpler code, no risk of state getting out of sync

> 🔑 Whenever a value can be **computed from existing state/props**, derive it instead of storing it as its own state (see the "when to create state" decision flow above).

# The `children` Prop

> Section: **State, Events, and Forms: Interactive Components** — Lecture: **The "children" Prop: Making a Reusable Button**

## The `children` Prop

- The **`children` prop** lets us **pass JSX into a component** (besides regular props)
- Whatever is written **between the opening and closing tags** of a component becomes `props.children`
- Inside the component, `props.children` is an empty **"hole"** that can be filled by **any JSX** the component receives as children

### Example — a reusable `Button`

Usage (what the parent writes):

```jsx
<Button onClick={previous}>
  <span>👈</span> Previous
</Button>
```

- `onClick={previous}` is a **regular prop**
- `<span>👈</span> Previous` is the **children of `Button`**, accessible inside `Button` as `props.children`

```
              Button
         ┌──────────────┐
         │              │
         │ props.children│  ←  <span>👈</span> Previous
         │              │
         └──────────────┘
```

How `Button` uses it (the "hole"):

```jsx
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

- The **wrapper** stays the same: styles, `onClick`, the `<button>` element
- The **content inside** can be anything — `"Previous"`, `"Next 👉"`, an icon, more JSX
- That is what makes `Button` **reusable**: same component, different children

### Same hole, different children

The empty "hole" is not limited to "Previous". The **same** `Button` can receive completely different JSX:

```jsx
<Button onClick={previous}>
  <span>👈</span> Previous
</Button>

<Button onClick={next}>
  <span>🎉</span> PARTY <span>🎉</span>
</Button>
```

```
              Button
         ┌──────────────┐
         │  🎉 PARTY 🎉  │  ←  props.children
         └──────────────┘
```

- Both usages render through the **same** `Button` — only `props.children` changes
- First fill: `<span>👈</span> Previous`
- Second fill: `<span>🎉</span> PARTY <span>🎉</span>`
- Regular props (`onClick`) still configure **behavior**; `children` configures **content**

> 👉 The children prop allows us to **pass JSX into an element** (besides regular props)

> 👉 Essential tool to make **reusable** and **configurable** components (especially component **content**)

> 👉 Really useful for **generic** components that **don't know their content** before being used (e.g. a modal)

- A **modal**, a **card**, a **layout**, a **tooltip** — the wrapper owns the chrome (overlay, close button, padding)
- The **content** is supplied later by whoever uses the component, via `children`
- The generic component stays reusable because it never hardcodes what goes in the hole

> 🔑 `children` is just a prop — the special part is that React fills it automatically from whatever you put **between the tags**.
