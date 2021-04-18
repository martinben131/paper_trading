import React from "react";
import Balance from "./balance/index";
import History from "./history/index";
import Profile from "./profile/index";

export function Account() {
  return (
    <>
      <Balance />
      <br />
      <History />
      <br />
      <Profile />
    </>
  );
}

export default Account;
