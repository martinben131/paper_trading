import React, { useState } from "react";
import { Card, Elevation, InputGroup, Tag, Button } from "@blueprintjs/core";

import { useProfile } from "../../../store";
import { handleStringChange } from "../../../common/index";
import "./index.css";

function Profile() {
  const [state, actions] = useProfile();
  const [open, setOpen] = useState("none");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = handleStringChange((newUsername) =>
    setUsername(newUsername)
  );

  const handleEmailChange = handleStringChange((newEmail) =>
    setEmail(newEmail)
  );

  const handlePasswordChange = handleStringChange((newPassword) =>
    setPassword(newPassword)
  );

  const buttonClick = (field: string) => {
    if (open === "none") {
      setOpen(field);
    } else if (field === "none") {
      setOpen("none");
    } else {
      if (open === "username") {
        actions.setUsername(username);
      }
      if (open === "email") {
        actions.setEmail(email);
      }
      if (open === "password") {
        actions.setPassword(password);
      }
      setOpen("none");
    }
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Card elevation={Elevation.TWO}>
      <h3 className="bp3-heading">Account Details</h3>
      <h5 className="bp3-heading">Username</h5>
      {open === "username" ? (
        <>
          <InputGroup onChange={handleUsernameChange} />
          <br />
        </>
      ) : (
        <p>{state.username}</p>
      )}
      <Button
        onClick={() => buttonClick("username")}
        disabled={open !== "username" && open !== "none"}
      >
        {open === "username" ? "Set Username" : "Change Username"}
      </Button>
      {state.profileErrorMessage.hasOwnProperty("username") && (
        <div className="tagWrapper">
          <Tag intent="warning">{state.profileErrorMessage["username"]}</Tag>
        </div>
      )}
      <br />
      <br />
      <h5 className="bp3-heading">Email</h5>
      {open === "email" ? (
        <>
          <InputGroup onChange={handleEmailChange} />
          <br />
        </>
      ) : (
        <p>{state.email}</p>
      )}
      <Button
        onClick={() => buttonClick("email")}
        disabled={open !== "email" && open !== "none"}
      >
        {open === "email" ? "Set Email" : "Change Email"}
      </Button>
      {state.profileErrorMessage.hasOwnProperty("email") && (
        <div className="tagWrapper">
          <Tag intent="warning">{state.profileErrorMessage["email"]}</Tag>
        </div>
      )}
      <br />
      <br />
      <h5 className="bp3-heading">Password</h5>
      {open === "password" ? (
        <>
          <InputGroup onChange={handlePasswordChange} />
          <br />
        </>
      ) : (
        <p>••••••••</p>
      )}
      <Button
        onClick={() => buttonClick("password")}
        disabled={open !== "password" && open !== "none"}
      >
        {open === "password" ? "Set Password" : "Change Password"}
      </Button>
      {state.profileErrorMessage.hasOwnProperty("password") && (
        <div className="tagWrapper">
          <Tag intent="warning">{state.profileErrorMessage["password"]}</Tag>
        </div>
      )}
      {open !== "none" && (
        <>
          <br />
          <br />
          <Button onClick={() => buttonClick("none")} intent={"danger"}>
            Cancel change
          </Button>
        </>
      )}
    </Card>
  );
}

export default Profile;
