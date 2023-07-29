import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SellerSearchBar from "../../frontend/components/input/SellerSearchBar";

// Mock sellers data for testing
const sellers = [
  { id: 1, seller_name: "John", seller_firstname: "Doe" },
  { id: 2, seller_name: "Jane", seller_firstname: "Smith" },
];

describe("SellerSearchBar", () => {
  it("renders the input element", () => {
    render(<SellerSearchBar allSellers={sellers} />);
    const inputElement = screen.getByPlaceholderText("Verkäufer suchen...");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays searched sellers when typing in the input", () => {
    render(<SellerSearchBar allSellers={sellers} />);
    const inputElement = screen.getByPlaceholderText("Verkäufer suchen...");

    // Type "John" into the input
    fireEvent.change(inputElement, { target: { value: "John" } });

    // Expect "John Doe" to be displayed in the results
    const searchResultElement = screen.getByText("John Doe");
    expect(searchResultElement).toBeInTheDocument();
  });

  it("calls the setClickedSellerID and setName functions when clicking on a seller", () => {
    const setClickedSellerID = jest.fn();
    const setName = jest.fn();

    render(
      <SellerSearchBar
        allSellers={sellers}
        setClickedSellerID={setClickedSellerID}
        setName={setName}
      />
    );

    const inputElement = screen.getByPlaceholderText("Verkäufer suchen...");
    // Type "John" into the input
    fireEvent.change(inputElement, { target: { value: "John" } });

    // Click on the first seller in the list
    const sellerElement = screen.getByText("John Doe");
    fireEvent.click(sellerElement);

    // Expect setClickedSellerID and setName to be called with the correct arguments
    expect(setClickedSellerID).toHaveBeenCalledWith(sellers[0].id);
    expect(setName).toHaveBeenCalledWith("John Doe");
  });
});
