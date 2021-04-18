import React from "react";
import { shallow } from "enzyme";
import Watchlist from "./index";

jest.mock("../../store", () => ({
  useProfile: () => [
    {
      watchlist: ["AAPL"],
    },
  ],
  useStocks: () => [
    {
      haveStocksBeenFetched: true,
      data: [
        {
          code: "AAPL",
          name: "Apple Inc.",
          priceCurr: 123.45,
          priceChange: 1.26,
        },
      ],
    },
  ],
}));

jest.mock("react-router-dom", () => ({
  useHistory: () => ({}),
}));

test("Renders watchlist page correctly", () => {
  const component = shallow(<Watchlist />);
  expect(component).toMatchSnapshot();
});
