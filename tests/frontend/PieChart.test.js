import React from "react";
import { render } from "@testing-library/react";
import Graph from "../../frontend/components/PieChart/PieChart";

describe("Graph", () => {
  const soldOffers = 10;
  const unsoldOffers = 20;
  const reclinedOffers = 5;

  it("renders without crashing", () => {
    render(
      <Graph
        soldOffers={soldOffers}
        unsoldOffers={unsoldOffers}
        reclinedOffers={reclinedOffers}
      />
    );
  });

  it("renders correct chart data", () => {
    const { getByLabelText } = render(
      <Graph
        soldOffers={soldOffers}
        unsoldOffers={unsoldOffers}
        reclinedOffers={reclinedOffers}
      />
    );

    const legend = getByLabelText("Legend");
    expect(legend).toBeInTheDocument();

    const pieChart = getByLabelText("Pie Chart");
    expect(pieChart).toBeInTheDocument();

    const chartDataLabels = chartData.map((data) => data.name);
    chartDataLabels.forEach((label) => {
      const legendItem = getByLabelText(label);
      expect(legendItem).toBeInTheDocument();
    });
  });

  it("renders the correct number of chart cells", () => {
    const { getAllByTestId } = render(
      <Graph
        soldOffers={soldOffers}
        unsoldOffers={unsoldOffers}
        reclinedOffers={reclinedOffers}
      />
    );

    const chartCells = getAllByTestId("chart-cell");
    expect(chartCells).toHaveLength(chartData.length);
  });
});
