import React from "react";
import { shallow } from "enzyme";
import Stock from "./index";

test("Renders stock correctly", () => {
  const component = shallow(<Stock />);
  expect(component).toMatchSnapshot();
});
