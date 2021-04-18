import React from "react";
import { shallow } from "enzyme";
import Register from "./index";

jest.mock("../store", () => ({
  useProfile: () => [{}],
  useNews: () => [
    {
      code: "MSFT",
      loading: false,
      data: [],
    },
  ],
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    code: "MSFT",
  }),
}));

test("Renders news page correctly", () => {
  const component = shallow(<Register />);
  expect(component).toMatchSnapshot();
});
