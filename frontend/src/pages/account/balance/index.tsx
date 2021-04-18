import React, { useState } from "react";
import { Card, Elevation, NumericInput } from "@blueprintjs/core";
import { useProfile } from "../../../store";
import { Button } from "@blueprintjs/core";

function Balance() {
  const [state, actions] = useProfile();
  const [open, setOpen] = useState(false);
  const [localBal, setLocalBal] = useState(state.balance);

  const buttonClick = () => {
    if (open) {
      actions.setBalance(localBal);
    }
    setOpen(!open);
  };

  return (
    <Card elevation={Elevation.TWO}>
      <h3 className="bp3-heading">Balance and Profit</h3>
      <h5 className="bp3-heading">Balance</h5>
      {open ? (
        <div>
          <NumericInput
            value={localBal}
            onValueChange={(val) => setLocalBal(val)}
            stepSize={1000}
            majorStepSize={10000}
            min={0}
          />
          <br />
        </div>
      ) : (
        <p>${state.balance ? state.balance.toFixed(2) : 0.0}</p>
      )}
      <Button onClick={() => buttonClick()}>
        {open ? "Set Balance" : "Change Balance"}
      </Button>
      <br />
      <br />
      <h5 className="bp3-heading">Realised Profit</h5>
      <p>${state.profit ? state.profit.toFixed(2) : 0.0}</p>
    </Card>
  );
}

export default Balance;
