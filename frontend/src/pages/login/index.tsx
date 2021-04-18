import React, { useState, useEffect } from "react";
import { Button, FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";

import { handleStringChange } from "../../common/index";
import { useProfile } from "../../store";
import "./index.css";

// This page is for logging in
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [state, actions] = useProfile();

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (state.id) {
      history.push("/stocks");
    }
  });

  const onSubmit = () => {
    actions.login(email, password);
  };

  const handleEmailChange = handleStringChange((newEmail) =>
    setEmail(newEmail)
  );

  const handlePasswordChange = handleStringChange((newPassword) =>
    setPassword(newPassword)
  );

  return (
    <>
      <h4 className="bp3-heading">{"Login"}</h4>
      <FormGroup>
        <InputGroup
          id="username"
          placeholder="Enter email here"
          onChange={handleEmailChange}
        />
        {state.loginErrorMessage.hasOwnProperty("email") && (
          <div className="tagWrapper">
            <Tag intent="warning">{state.loginErrorMessage["email"]}</Tag>
          </div>
        )}
        <br />
        <InputGroup
          id="password"
          placeholder="Enter password here"
          type="password"
          onChange={handlePasswordChange}
        />
        {state.loginErrorMessage.hasOwnProperty("password") && (
          <div className="tagWrapper">
            <Tag intent="warning">{state.loginErrorMessage["password"]}</Tag>
          </div>
        )}
        <br />
        <Button
          disabled={email === "" || password === ""}
          text="Submit"
          intent="success"
          onClick={() => onSubmit()}
        />
      </FormGroup>
    </>
  );
}

export default Login;
