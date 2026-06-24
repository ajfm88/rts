import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";

function renderSearchBar() {
  return render(
    <div>
      <SearchBar />
      <div data-testid="outside-area">Outside the search bar</div>
    </div>
  );
}

describe("SearchBar", () => {
  test("dropdown opens when the user types a query", async () => {
    renderSearchBar();
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "new yo" },
    });
    await waitFor(() =>
      expect(screen.getByTestId("search-div")).toBeInTheDocument()
    );
  });

  test("dropdown closes when the user clicks outside the search bar", async () => {
    renderSearchBar();
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "new yo" },
    });
    await waitFor(() =>
      expect(screen.getByTestId("search-div")).toBeInTheDocument()
    );

    fireEvent.mouseDown(screen.getByTestId("outside-area"));

    await waitFor(() =>
      expect(screen.queryByTestId("search-div")).not.toBeInTheDocument()
    );
  });

  test("dropdown stays open while the user keeps typing", async () => {
    renderSearchBar();
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "new" } });
    await waitFor(() =>
      expect(screen.getByTestId("search-div")).toBeInTheDocument()
    );
    fireEvent.change(input, { target: { value: "new yo" } });
    expect(screen.getByTestId("search-div")).toBeInTheDocument();
  });

  test("dropdown stays open when the user clicks inside the results", async () => {
    renderSearchBar();
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "new yo" },
    });
    await waitFor(() =>
      expect(screen.getByTestId("search-div")).toBeInTheDocument()
    );

    fireEvent.mouseDown(screen.getByTestId("search-div"));

    expect(screen.getByTestId("search-div")).toBeInTheDocument();
  });

  test("required data-testid attributes are preserved", async () => {
    renderSearchBar();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "new yo" },
    });
    await waitFor(() =>
      expect(
        screen.getAllByTestId("apartment-name-search-result").length
      ).toBeGreaterThan(0)
    );
  });
});
