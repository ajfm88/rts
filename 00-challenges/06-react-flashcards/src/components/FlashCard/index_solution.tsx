import React, { useState } from "react";
import type { FlashCardProps } from "../../types/FlashCard";
import "./index.css";

const FlashCard: React.FC<FlashCardProps> = ({ flashCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="flashcard"
      onClick={() => setIsFlipped(!isFlipped)}
      data-testid={`flashcard-container-${flashCard.id}`}
    >
      <div className={`flashcard-content ${isFlipped ? "flipped" : ""}`}>
        <div
          className="front"
          data-testid={`flashcard-question-${flashCard.id}`}
        >
          {flashCard.question}
        </div>
        <div className="back" data-testid={`flashcard-answer-${flashCard.id}`}>
          {flashCard.answer}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
