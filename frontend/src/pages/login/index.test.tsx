import React from "react";
import { shallow } from "enzyme";
import Login from "./index";

test("Renders login page correctly", () => {
  const component = shallow(<Login />);
  expect(component).toMatchSnapshot();
});
