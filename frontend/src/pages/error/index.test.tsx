import React from "react";
import { shallow } from "enzyme";
import Error from "./index";

test("Renders error page correctly", () => {
  const component = shallow(<Error />);
  expect(component).toMatchSnapshot();
});

test("Page shows a 404 error", () => {
  const component = shallow(<Error />);
  expect(component.text()).toContain("404");
});
