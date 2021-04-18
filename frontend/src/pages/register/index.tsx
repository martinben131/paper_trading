import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  InputGroup,
  Slider,
  Label,
  Tag,
} from "@blueprintjs/core";
import { useHistory } from "react-router-dom";

import { handleStringChange } from "../../common/index";
import { useProfile } from "../../store";
import "./index.css";

// This page is for creating an account
export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [balance, setBalance] = useState(0);

  const history = useHistory();
  const [state, actions] = useProfile();

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (state.id) {
      history.push("/profile");
    }
  });

  const onSubmit = () => {
    actions.register(
      email,
      password,
      username,
      confirmPassword,
      balance,
      history
    );
  };

  const handleUsernameChange = handleStringChange((newUsername) =>
    setUsername(newUsername)
  );

  const handleEmailChange = handleStringChange((newEmail) =>
    setEmail(newEmail)
  );

  const handlePasswordChange = handleStringChange((newPassword) =>
    setPassword(newPassword)
  );

  const handleConfirmPasswordChange = handleStringChange((newConfirmPassword) =>
    setConfirmPassword(newConfirmPassword)
  );

  const handleBalanceChange = (balance: number) => {
    setBalance(balance);
  };

  function balanceLabel(val: number) {
    return `$${val}`;
  }

  return (
    <>
      <h4 className="bp3-heading">{"Create account"}</h4>
      <FormGroup>
        <InputGroup
          id="username"
          placeholder="Enter username here"
          onChange={handleUsernameChange}
        />
        {state.registerErrorMessage.hasOwnProperty("username") && (
          <div className="tagWrapper">
            <Tag intent="warning">{state.registerErrorMessage["username"]}</Tag>
          </div>
        )}
        <br />
        <InputGroup
          id="email"
          placeholder="Enter email here"
          type="email"
          onChange={handleEmailChange}
        />
        {state.registerErrorMessage.hasOwnProperty("email") && (
          <div className="tagWrapper">
            <Tag intent="warning">{state.registerErrorMessage["email"]}</Tag>
          </div>
        )}
        <br />
        <InputGroup
          id="password"
          placeholder="Enter password here (must be at least 6 characters)"
          type="password"
          onChange={handlePasswordChange}
        />
        {state.registerErrorMessage.hasOwnProperty("password") && (
          <div className="tagWrapper">
            <Tag intent="warning">{state.registerErrorMessage["password"]}</Tag>
          </div>
        )}
        <br />
        <InputGroup
          id="confirm_password"
          placeholder="Confirm password"
          type="password"
          onChange={handleConfirmPasswordChange}
        />
        {state.registerErrorMessage.hasOwnProperty("password2") && (
          <div className="tagWrapper">
            <Tag intent="warning">
              {state.registerErrorMessage["password2"]}
            </Tag>
          </div>
        )}
        <br />
        <Label>Choose desired starting balance! (More than $0)</Label>
        <Slider
          min={0}
          max={100000}
          stepSize={1000}
          labelStepSize={10000}
          onChange={handleBalanceChange}
          labelRenderer={balanceLabel}
          value={balance}
        />
        <br />
        <Button
          disabled={
            username === "" ||
            password === "" ||
            email === "" ||
            confirmPassword === "" ||
            balance === 0
          }
          text="Submit"
          intent="success"
          onClick={() => onSubmit()}
        />
      </FormGroup>
    </>
  );
}

export default Register;
