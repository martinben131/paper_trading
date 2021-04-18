import React from "react";
import { shallow } from "enzyme";
import Stocks from "./index";

jest.mock("../../store", () => ({
  useProfile: () => [
    {
      watchlist: [],
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

test("Renders stocks page correctly", () => {
  const component = shallow(<Stocks />);
  expect(component).toMatchSnapshot();
});

test("Page contains Apple Inc", () => {
  const component = shallow(<Stocks />);
  expect(component.text()).toContain("AAPLApple Inc.$123.45+1.26%");
});
