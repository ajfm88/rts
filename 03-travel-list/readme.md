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
