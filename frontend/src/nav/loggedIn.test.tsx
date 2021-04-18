import React from "react";
import { shallow } from "enzyme";
import Nav from "./index";

const mockPathname = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: mockPathname(),
  }),
  useHistory: () => ({
    push: mockHistoryPush(),
  }),
}));

jest.mock("../store", () => ({
  useProfile: () => [
    {
      id: 123,
      username: "username",
      profit: { toFixed: jest.fn() },
      balance: { toFixed: jest.fn() },
    },
  ],
  useTheme: () => [
    {
      isDark: false,
    },
  ],
}));

test("Renders nav in logged in state correctly", () => {
  const component = shallow(<Nav />);
  expect(component).toMatchSnapshot();
});
