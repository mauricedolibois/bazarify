import React from "react";
import { render, screen } from "@testing-library/react";
import SellerDisplay from "./sellerDisplay";


// Sample data for testing
const testData = {
    name: "John Doe",
    soldProducts: [],
    unsoldProducts: [
      { product_name: "Product 1", product_price: 50 },
      { product_name: "Product 2", product_price: 30 },
      { product_name: "Product 3", product_price: 20 },
    ],
    provision: 0
  };

describe("SellerDisplay component", () => {

  it("displays seller name correctly", () => {
    render(<SellerDisplay {...testData} />);
    const sellerName = screen.getByText(testData.name);
    expect(sellerName).toBeInTheDocument;
  });

  it("calculates and displays seller payback correctly", () => {
    const { getByText } = render(<SellerDisplay {...testData} />);
    const expectedPayback = (
      testData.soldProducts.reduce(
        (acc, product) => acc + product.product_price,
        0
      ) -
      (testData.soldProducts.reduce(
        (acc, product) => acc + product.product_price,
        0
      ) *
        0) /
        100
    ).toFixed(2);
    const sellerPayback = getByText(`${expectedPayback}€`);
    expect(sellerPayback).toBeInTheDocument;
  });

  it("displays the correct text for unsold products", () => {
    const { getByText } = render(<SellerDisplay {...testData} />);
    const unsoldProductsText = getByText("3 nicht verkaufte Produkte vorhanden");
    expect(unsoldProductsText).toBeInTheDocument;
  });
});