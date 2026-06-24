# 🗋 Bugfix: Searchbar Component

## Task Description

The Travel application, built with a React frontend and Node.js backend, allows users to
browse and book apartment listings for travel and short-term stays. A key feature in the UI
is the search bar located in the navigation bar, which lets users quickly look up available
apartments.

Currently, there is a usability issue in the search bar component: once activated, the search
bar and its dropdown remain open **even when the user clicks elsewhere** on the page or
navigates to a new apartment listing. This results in a cluttered and unintuitive experience.
The task is a frontend-only enhancement focused on improving the search bar's behavior by
ensuring it **automatically closes when the user clicks outside of it**, while still remaining
accessible during active use.

> **Note:** The code may intentionally contain other issues unrelated to this task. Please
> focus only on the described requirement.

## Issue: Search Bar Doesn't Close on Outside Click

**To Reproduce**

1. Click inside the search bar to activate it.
2. Begin typing a query to trigger the search results dropdown.
3. Click on any area outside the search bar (page background, navbar, footer).
4. Observe that the search bar and dropdown remain open.

**Expected Behavior**

- When the user clicks **outside** the search bar, the search bar and its dropdown results
  should **close** automatically.
- The search bar should **remain open** when:
  - The user is actively typing.
  - The user interacts with the search results (e.g. clicks inside the dropdown).

## Required `data-testid` attributes

Do **not** remove or alter these — the automated tests depend on them.

| data-testid | element |
| --- | --- |
| `search-input` | the search text input |
| `search-div` | the results dropdown container |
| `apartment-name-search-result` | each result row in the dropdown |

---

> The file to edit is **`src/components/SearchBar/index.tsx`**. It uses `useRef`
> (`searchBarRef`) already attached to the wrapper — wire up an outside-click handler (and
> clean it up on unmount). Then click **Run Tests**.

## Running the live app (local)

This folder is a complete **Vite + React + TypeScript** app, so you can reproduce the bug and
watch your fix work in real time:

```bash
npm install
npm run dev      # Vite dev server, default http://localhost:5173
```

Type a city (e.g. `new york`, `london`, `paris`), then click anywhere outside the results — in
the buggy state the dropdown stays open. Implement the outside-click handler and it closes
(Vite hot-reloads as you save). The search runs against an internal dataset in
`src/data/apartments.ts` (swap `src/api/searchApartments.ts` for a real API if you like). The
dashboard's **Run Tests** view (port 3003) checks the same behavior with Vitest.
