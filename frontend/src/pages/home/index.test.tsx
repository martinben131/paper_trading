import React from "react";
import { shallow } from "enzyme";
import Home from "./index";

test("Renders home page correctly", () => {
  const component = shallow(<Home />);
  expect(component).toMatchSnapshot();
});
