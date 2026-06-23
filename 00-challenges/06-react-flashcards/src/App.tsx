import React from "react";
import FlashCardDeck from "./components/FlashCardDeck";
import { flashCardsData } from "./data/cards-data";

function App() {
  return (
    <div className="App">
      <h1>FlashCards</h1>
      <FlashCardDeck flashCards={flashCardsData} />
    </div>
  );
}

export default App;
