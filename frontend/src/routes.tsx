import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Stocks,
  Login,
  Account,
  Dashboard,
  Error,
  Register,
  Watchlist,
  Stock,
} from "./pages/index";

// This is the routes switch. To add a new page, import the page here
// and add it to the switch with the desired route
function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/stock/:code">
        <Stock />
      </Route>
      <Route path="/stocks">
        <Stocks />
      </Route>
      <Route path="/watchlist">
        <Watchlist />
      </Route>
      <Route>
        <Error />
      </Route>
    </Switch>
  );
}

export default Routes;
