import React, { useState } from "react";
import { Card, Elevation, ButtonGroup, NonIdealState } from "@blueprintjs/core";
import { useProfile } from "../../../store";
import { Button } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";

function History() {
  const [state] = useProfile();
  const [page, setPage] = useState([0, 9]);
  const history = useHistory();

  const transactions = state.transactions
    ? state.transactions.slice().reverse()
    : [];

  if (transactions.length === 0) {
    return (
      <Card elevation={Elevation.TWO}>
        <NonIdealState
          icon="history"
          title="Your history is empty"
          description="Purchase some stocks to fill up your history"
        />
        <br />
      </Card>
    );
  }

  return (
    <Card elevation={Elevation.TWO}>
      <h3 className="bp3-heading">Transaction History</h3>
      <table className="stockTable bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-interactive ">
        <thead>
          <tr>
            <th>Stock Code</th>
            <th>Transaction Price</th>
            <th>Units</th>
            <th>Type</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(page[0], page[1]).map((i: any) => (
            <tr
              key={i.transaction_time}
              onClick={() => history.push("/stock/" + i.stock_code)}
            >
              <td>{i.stock_code}</td>
              <td>{i.stock_price.toFixed(2)}</td>
              <td>{i.units}</td>
              <td>{i.transaction_type === "buy" ? "Buy" : "Sell"}</td>
              <td>{i.transaction_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <ButtonGroup>
        <Button
          icon={"caret-left"}
          onClick={() => setPage([page[0] - 10, page[1] - 10])}
          disabled={page[0] === 0}
        />
        <Button
          icon={"caret-right"}
          onClick={() => setPage([page[0] + 10, page[1] + 10])}
          disabled={page[1] >= transactions.length}
        />
      </ButtonGroup>
    </Card>
  );
}

export default History;
