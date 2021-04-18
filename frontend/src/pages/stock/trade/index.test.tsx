import React from "react";
import { shallow } from "enzyme";
import Register from "./index";

jest.mock("../store", () => ({
  useProfile: () => [{}],
  useData: () => [
    {
      priceCurr: { toFixed: jest.fn() },
    },
  ],
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    code: "MSFT",
  }),
}));

test("Renders trade page correctly", () => {
  const component = shallow(<Register />);
  expect(component).toMatchSnapshot();
});
