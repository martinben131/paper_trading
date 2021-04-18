import React from "react";
import { shallow } from "enzyme";
import Profile from "./index";

test("Renders profile correctly", () => {
  const component = shallow(<Profile />);
  expect(component).toMatchSnapshot();
});
