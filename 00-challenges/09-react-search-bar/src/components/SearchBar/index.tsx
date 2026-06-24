import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ChangeEvent } from "react";
import "./index.css";
import { searchApartments } from "../../api/searchApartments";
import type { Apartment } from "../../api/searchApartments";
import useDebounce from "../../hooks/useDebounce";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Apartment[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const debouncedSearchText = useDebounce(searchText, 150);

  const fetchSearchResults = useCallback(async (value: string) => {
    if (value.length > 0) {
      try {
        const data = await searchApartments(value);
        setSearchResults(data);
      } catch (error) {
        console.error("Error retrieving search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    fetchSearchResults(debouncedSearchText);
  }, [debouncedSearchText, fetchSearchResults]);

  // -------------------------------------------------------------------------
  // BUG: the search bar never closes when the user clicks outside of it.
  // `searchBarRef` is attached to the wrapper <div> below but is never used.
  // Your task: close the dropdown (set isDropdownOpen + showResults to false)
  // when the user clicks anywhere outside the search bar, while keeping it open
  // when they are typing or interacting with the results. Remember to clean up
  // any event listeners you add.
  // -------------------------------------------------------------------------

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    setShowResults(value.length > 0);
    setIsDropdownOpen(true);
    fetchSearchResults(value);
  };

  const memoizedSearchResults = useMemo(() => {
    return searchResults.length > 0 ? (
      searchResults.map((result) => (
        <p
          key={result.id}
          data-testid="apartment-name-search-result"
          className="search-result"
        >
          {result.address}
        </p>
      ))
    ) : (
      <p className="no-results">No matching results found</p>
    );
  }, [searchResults]);

  return (
    <div className="search-bar" ref={searchBarRef}>
      <input
        data-testid="search-input"
        type="text"
        className="search-input"
        placeholder="Search for a location"
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        className="search-button"
        onClick={() => fetchSearchResults(searchText)}
      >
        🔍
      </button>
      {isDropdownOpen && showResults && (
        <div data-testid="search-div" className="results-dropdown">
          {memoizedSearchResults}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
