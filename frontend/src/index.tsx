import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "@blueprintjs/core/lib/css/blueprint.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// The service worker has been disabled
// Change it to register() to enable
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
