import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductTable from "./productTable";

const testData = [
    {
        product_name: "Product 1",
        product_category: "Category 1",
        product_price: "10",
    },
    {
        product_name: "Product 2",
        product_category: "Category 2",
        product_price: "20",
    },
];

describe("ProductTable", () => {
    it("renders the correct table title", () => {
        render(
            <ProductTable
                data={testData}
                type="penned"
                setData={() => { }}
                setMsg={() => { }}
                shouldScrollToBottom={false}
                setShouldScrollToBottom={() => { }}
                setProductReclinedID={() => { }}
            />
        );

        expect(screen.getByText("Eingepflegte Produkte")).toBeInTheDocument();
    });

    it("renders the correct number of rows", () => {
        render(
            <ProductTable
                data={testData}
                type="scan"
                setData={() => { }}
                setMsg={() => { }}
                shouldScrollToBottom={false}
                setShouldScrollToBottom={() => { }}
                setProductReclinedID={() => { }}
            />
        );

        expect(screen.getAllByRole("row")).toHaveLength(testData.length + 2); // +2 for the header row and the empty row at the end
    });
});
