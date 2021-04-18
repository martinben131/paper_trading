import React from "react";
import { shallow } from "enzyme";
import Register from "./index";

test("Renders register page correctly", () => {
  const component = shallow(<Register />);
  expect(component).toMatchSnapshot();
});
