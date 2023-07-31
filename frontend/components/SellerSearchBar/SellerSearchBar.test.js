import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SellerSearchBar from "./SellerSearchBar";

// Mock sellers data for testing
const sellers = [
  { seller_id: 1, seller_name: "John", seller_firstname: "Doe" },
  { seller_id: 2, seller_name: "Jane", seller_firstname: "Smith" },
];

describe("SellerSearchBar", () => {
  it("renders the input element", () => {
    render(<SellerSearchBar allSellers={sellers} />);
    const inputElement = screen.getByPlaceholderText("Verkäufer suchen...");
    expect(inputElement).toBeInTheDocument;
  });

  it("displays searched sellers when typing in the input", () => {
    render(<SellerSearchBar allSellers={sellers} />);
    const inputElement = screen.getByPlaceholderText("Verkäufer suchen...");

    // Type "John" into the input
    fireEvent.change(inputElement, { target: { value: "John" } });

    // Expect "John Doe" to be displayed in the results
    const searchResultElement = screen.getByText("John Doe");
    expect(searchResultElement).toBeInTheDocument;
  });

  it("should log wholeName and clickedSellerID when a seller is clicked", () => {
    // Spy on the console.log method
    const consoleSpy = jest.spyOn(console, "log");
    // Mock the setName and setClickedSellerID functions
    const setName = jest.fn();
    const setClickedSellerID = jest.fn();

    // Render the SellerSearchBar component
    render(
      <SellerSearchBar
        allSellers={sellers}
        setName={setName}
        setClickedSellerID={setClickedSellerID}
      />
    );

    // Type "John" into the input to trigger search
    const searchBar = screen.getByPlaceholderText("Verkäufer suchen...");
    fireEvent.change(searchBar, { target: { value: "John" } });

    // Click on the first seller in the search results
    const firstSeller = screen.getByText("John Doe");
    fireEvent.click(firstSeller);

    // Check if the console.log method was called with the expected messages
    expect(consoleSpy).toHaveBeenCalledWith("clicked seller: 1");
    expect(consoleSpy).toHaveBeenCalledWith("wholeName: John Doe");

    // Restore the original console.log implementation
    consoleSpy.mockRestore();
  });
});
