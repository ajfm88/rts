import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <span className="brand">🏠 Travel Stays</span>
        <SearchBar />
      </nav>

      <main className="page">
        <h1>Find your next stay</h1>
        <p className="lede">
          Type a city in the search bar above (try <code>new york</code>,{" "}
          <code>london</code>, or <code>paris</code>). Then click anywhere out
          here on the page.
        </p>
        <p className="hint">
          Notice the results dropdown stays open even after you click outside it
          — that's the bug. Fix <code>src/components/SearchBar/index.tsx</code>{" "}
          and it'll start closing on outside clicks (hot-reloads instantly).
        </p>

        <div className="cards">
          {["Cozy lofts", "Beach houses", "City apartments", "Mountain cabins"].map(
            (label) => (
              <div className="card" key={label}>
                {label}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
