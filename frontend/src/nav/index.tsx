import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Tag,
  Switch,
} from "@blueprintjs/core";

import { useProfile, useTheme } from "../store";
import { getChangeIntent } from "../common";
import icon from "./assets/logo.jpg";
import "./index.css";

// This is the navbar, it is rendered on every page
export function Nav() {
  const [state, actions] = useProfile();
  const [theme, changeTheme] = useTheme();
  const history = useHistory();
  const location = useLocation();

  const onLogoutClick = () => {
    actions.logout();
    history.push("/");
  };

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT}>
        <img src={icon} alt="Stonks logo" width="32px" height="32px" />
        <NavbarHeading className="heading">{"stonks"}</NavbarHeading>
        <NavbarDivider />
        <Button
          className="bp3-minimal"
          icon="home"
          text="Home"
          active={location.pathname === "/"}
          onClick={() => history.push("/")}
        />
        {/* This is the logged in navbar state */}
        {state.id ? (
          <>
            <Button
              className="bp3-minimal"
              icon="chart"
              text="Stocks"
              active={location.pathname === "/stocks"}
              onClick={() => history.push("/stocks")}
            />
            <Button
              className="bp3-minimal"
              icon="dashboard"
              text="Dashboard"
              active={location.pathname === "/dashboard"}
              onClick={() => history.push("/dashboard")}
            />
            <Button
              className="bp3-minimal"
              icon="eye-open"
              text="Watchlist"
              active={location.pathname === "/watchlist"}
              onClick={() => history.push("/watchlist")}
            />
            <NavbarDivider />
            <Button
              className="bp3-minimal"
              icon="user"
              text="Account"
              active={location.pathname === "/account"}
              onClick={() => history.push("/account")}
            />
            <Button
              className="bp3-minimal"
              icon="log-out"
              text="Logout"
              onClick={() => {
                onLogoutClick();
              }}
            />
            <NavbarDivider />
            <Tag>{state.username}</Tag>
            <NavbarDivider />
            <Tag>
              Balance: ${state.balance ? state.balance.toFixed(2) : 0.0}
            </Tag>
            <NavbarDivider />
            <Tag intent={getChangeIntent(state.profit)}>
              Profit: ${state.profit ? state.profit.toFixed(2) : 0.0}
            </Tag>
          </>
        ) : (
          // This is the logged out navbar state
          <>
            <NavbarDivider />
            <Button
              className="bp3-minimal"
              icon="chart"
              text="Create account"
              active={location.pathname === "/register"}
              onClick={() => history.push("/register")}
            />
            <Button
              className="bp3-minimal"
              icon="log-in"
              text="Login"
              active={location.pathname === "/login"}
              onClick={() => history.push("/login")}
            />
          </>
        )}
        <NavbarDivider />
        <div className="slider">
          <Switch
            checked={theme.isDark}
            onChange={() => changeTheme.swap()}
            innerLabelChecked="Dark theme"
            innerLabel="Light theme"
            large
          />
        </div>
      </NavbarGroup>
    </Navbar>
  );
}

export default Nav;
