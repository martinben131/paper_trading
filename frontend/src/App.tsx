import React from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Nav from "./nav/index";
import Routes from "./routes";
import setAuthToken from "./utils/setAuthToken";
import { useProfile, useTheme } from "./store";

import "./index.css";

function App() {
  const [state, actions] = useProfile();
  const [theme, themeActions] = useTheme();
  const history = useHistory();

  // persist login by using jwt token -> since in authActions we store token in localStorage
  // we can persist login by setting currentUser if the token exists
  if (localStorage.jwtToken && state.id === null) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded: any = jwt_decode(token);
    actions.setUser(decoded);

    const currentTime = Date.now() / 1000;
    // If the user's token is old, log them out.
    if (decoded.exp < currentTime) {
      actions.logout();
      history.push("/");
    }
  }

  // If the theme is dark, change the background colour and apply the dark theme
  if (theme.isDark || localStorage.dark === "dark") {
    // If the user has previously set a dark theme and the theme isn't dark, set it to dark
    if (!theme.isDark) {
      themeActions.setDark();
    }

    document.body.style.backgroundColor = "#30404d";

    return (
      <div className="bp3-dark">
        <div className="margin">
          <Nav />
          <Routes />
        </div>
      </div>
    );
  }

  document.body.style.backgroundColor = "#FFFFFF";

  return (
    <div className="margin">
      <Nav />
      <Routes />
    </div>
  );
}

export default App;
