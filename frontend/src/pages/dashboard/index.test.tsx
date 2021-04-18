import React from "react";
import { shallow } from "enzyme";
import Dashboard from "./index";

jest.mock("../../store", () => ({
  useProfile: () => [
    {
      ownedStocks: [],
      profit: 50,
      balance: 100,
    },
  ],
  useStocks: () => [{}],
}));

jest.mock("react-router-dom", () => ({
  useHistory: () => ({}),
}));

test("Renders dashboard correctly", () => {
  const component = shallow(<Dashboard />);
  expect(component).toMatchSnapshot();
});
