import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@blueprintjs/core";

export function Error() {
  const history = useHistory();

  return (
    <>
      <h1 className="bp3-heading">
        {"Uh-oh "}
        <span role="img" aria-label="Crying Face">
          😢
        </span>
      </h1>
      <br />
      <h1 className="bp3-heading">404 - Page not found</h1>
      <br />
      <Button
        rightIcon="home"
        intent="primary"
        text="Go home"
        large
        onClick={() => history.push("/")}
      />
    </>
  );
}

export default Error;
