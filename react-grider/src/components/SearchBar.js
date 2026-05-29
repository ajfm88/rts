import { useState } from "react";

function SearchBar({ onSubmit }) {
  // 1. Create a new piece of state.
  const [term, setTerm] = useState("");

  // 6. This sends the input form text back to the parent component.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };

  // 2. Create an event handler to watch for the 'onChange' event
  const handleChamge = (event) => {
    // 3. When the 'onChange' event fires, get the value from the input
    setTerm(event.target.value);
    // 4. Take that value from the input and use it to update your state.
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* 5. Pass yout sate to the input as the value prop */}
        <input onChange={handleChamge} value={term} />
      </form>
    </div>
  );
}

export default SearchBar;
