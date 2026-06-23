import React, { useState } from "react";
import type { FlashCardProps } from "../../types/FlashCard";
import "./index.css";

const FlashCard: React.FC<FlashCardProps> = () => {
  const isFlipped = false;
  return (
    <div
      className="flashcard"
      onClick={() => {}}
      data-testid={`flashcard-container-1`}
    >
      <div className={`flashcard-content ${isFlipped ? "flipped" : ""}`}>
        <div className="front" data-testid={`flashcard-question-1`}>
          What is the capital of France?
        </div>
        <div className="back" data-testid={`flashcard-answer-1`}>Paris</div>
      </div>
      <div className={`flashcard-content ${isFlipped ? "flipped" : ""}`}>
        <div className="front" data-testid={`flashcard-question-2`}>
          What is the square root of 144?
        </div>
        <div className="back" data-testid={`flashcard-answer-2`}>12</div>
      </div>
    </div>
  );
};

export default FlashCard;
