export interface FlashCard {
  // your code here
  id: number;
  question: string;
  answer: string;
}

export interface FlashCardProps {
  flashCard: FlashCard;
}

export interface FlashCardDeckProps {
  flashCards: FlashCard[];
}
