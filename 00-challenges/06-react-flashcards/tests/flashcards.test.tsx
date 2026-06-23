import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FlashCardDeck from "../src/components/FlashCardDeck";
import { flashCardsData } from "../src/data/cards-data";

describe("Flashcards", () => {
  test("renders the deck with a container, question and answer per card", () => {
    render(<FlashCardDeck flashCards={flashCardsData} />);
    expect(screen.getByTestId("flashcard-deck")).toBeInTheDocument();
    flashCardsData.forEach((card) => {
      expect(screen.getByTestId(`flashcard-container-${card.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`flashcard-question-${card.id}`)).toHaveTextContent(card.question);
      expect(screen.getByTestId(`flashcard-answer-${card.id}`)).toHaveTextContent(card.answer);
    });
  });

  test("clicking a flashcard flips it (appends 'flipped' to flashcard-content)", () => {
    render(<FlashCardDeck flashCards={flashCardsData} />);
    const container = screen.getByTestId(`flashcard-container-${flashCardsData[0].id}`);
    const content = container.querySelector(".flashcard-content") as HTMLElement;
    expect(content.className).not.toContain("flipped");
    fireEvent.click(container);
    expect(content.className).toContain("flipped");
    fireEvent.click(container);
    expect(content.className).not.toContain("flipped");
  });

  test("clicking Shuffle reorders the cards into a different order", () => {
    render(<FlashCardDeck flashCards={flashCardsData} />);
    const order = () =>
      screen
        .getAllByTestId(/^flashcard-container-/)
        .map((el) => el.getAttribute("data-testid"));
    const before = order();
    fireEvent.click(screen.getByTestId("shuffle-button"));
    const after = order();
    expect(after).toHaveLength(before.length);
    expect(after).not.toEqual(before);
  });
});
