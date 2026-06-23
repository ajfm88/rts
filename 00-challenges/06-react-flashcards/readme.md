# React (Typescript): Flashcards

Using Typescript and React, design a flashcard app that displays a series of flashcards with questions on the front and answers on the back. Certain core React functionalities are already implemented.

The application has two components: `FlashCardDeck.tsx` and `FlashCard.tsx` where the functionalities should be implemented.

The component must have the following functionalities:

- Display a series of flashcards with questions on the front and answers on the back.
- Clicking a flashcard should flip it to reveal the other side.
- Update the `isFlipped` constant to a state variable in `FlashCard/index.tsx`:
  - When `isFlipped` is true
    - `flipped` is appended to divs with the class name `flashcard-content`.
    - the answer is shown.
  - When `isFlipped` is false
    - `''` is appended to divs with the class name `flashcard-content`.
    - the question is shown.
- Clicking the `Shuffle` button should reorder the flashcards.
  - Ensure the shuffled order of the flashcards is different from the original order present in `src/data/cards-data.ts`.
- All the types are defined under file `src/types/FlashCard.ts`

Create a type for FlashCard in `src/types/FlashCard.ts` with the following properties:

- `id`, a number
- `question`, a string
- `answer`, a string

**Note:**

The following `data-testid` attributes are required in the components for the tests to pass:

| Attribute                       | Component                          |
| ------------------------------- | ---------------------------------- |
| `flashcard-deck`                | the main FlashCardApp component    |
| `flashcard-container-{card.id}` | an individual FlashCard            |
| `flashcard-question-{card.id}`  | the question text in a FlashCard   |
| `flashcard-answer-{card.id}`    | the answer text in a FlashCard     |
| `shuffle-button`                | a button to shuffle the flashcards |

**Note:**

- Components have `data-testid` attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.
- The files that should be modified by the candidate are `src/components/FlashCardDeck.tsx`, and `src/components/FlashCard.tsx`, and `src/types/FlashCard.ts`.

## Read-only Files

The following files are marked read-only. You cannot edit these files in the editor; however, it is possible from the terminal. You must not modify or delete these files because doing so results in a zero score.

- `tests/flashcards.test.tsx`
- `src/data/cards-data.ts`
- `src/types/FlashCard.ts`

---

## Running the live app (local)

This folder is a complete **Vite + React + TypeScript** scaffold — so you can run the real app in the browser:

```bash
npm install
npm run dev
```

Vite prints a local URL (default <http://localhost:5173>). Open it to click and flip the
flashcards live as you implement them.

To run the tests:

```bash
npm test
```
