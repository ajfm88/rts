import React, { useState } from "react";
import type { FlashCardDeckProps } from "../../types/FlashCard";
import FlashCard from "../FlashCard";
import "./index.css";

const FlashCardDeck: React.FC<FlashCardDeckProps> = ({ flashCards }) => {
  const [cards, setCards] = useState(flashCards);

  // Fisher-Yates shuffle
  const handleShuffle = () => {
    // make a copy so we do not mutate the original array
    const shuffled = [...cards];

    // keep shuffling until the order is diffeerent from the original
    do {
      // loop backwards from the last element to the second element
      for (let i = shuffled.length - 1; i > 0; i--) {
        // pick a random index from 0 to i(inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // swap elements at positions i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // if every card is still in its original position, shuffle again
    } while (shuffled.every((card, index) => card.id == flashCards[index].id));

    // update state with new shuffled order
    setCards(shuffled);
  };

  return (
    <div className="layout-column align-items-center justify-content-start">
      <div className="flashcard-deck" data-testid="flashcard-deck">
        {cards.map((card) => (
          <FlashCard key={card.id} flashCard={card} />
        ))}
      </div>
      <button onClick={handleShuffle} data-testid="shuffle-button">
        Shuffle
      </button>
    </div>
  );
};

export default FlashCardDeck;
