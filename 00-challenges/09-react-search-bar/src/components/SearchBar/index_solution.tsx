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

  // run code when something changes (or once on mount)
  useEffect(() => {
    console.log("i am here");
    // every time the user clicks, we want to register its location
    function handleClick(e: MouseEvent) {
      console.log("clicked:", e.target);
      console.log(
        "inside bar?",
        searchBarRef.current?.contains(e.target as Node),
      );
      // if the click was OUTSIDE the navbar, we close it
      if (!searchBarRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setShowResults(false);
      }
    }
    // mount the handleClick function in the document
    document.addEventListener("mousedown", handleClick);
    // unmount the handleClick function from the document
    function cleanup() {
      document.removeEventListener("mousedown", handleClick);
    }
    return cleanup;
  }, []);

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
