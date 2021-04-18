import React from "react";
import { shallow } from "enzyme";
import Register from "./index";

jest.mock("../store", () => ({
  useData: () => [
    {
      code: "MSFT",
      priceCurr: { toFixed: jest.fn() },
      priceChange: { toFixed: jest.fn() },
      prices: [],
    },
  ],
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    code: "MSFT",
  }),
}));

test("Renders chart correctly", () => {
  const component = shallow(<Register />);
  expect(component).toMatchSnapshot();
});
