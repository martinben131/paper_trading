import React from "react";
import { useProfile, useStocks } from "../../store";
import { Button, NonIdealState } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { getChangeClass } from "../../common";

import "./index.css";

type stockFacts = {
  dailyProfit: number;
  totalProfit: number;
  currValue: number;
  currPrice: number;
};

// This dashboard details stock ownership and profits
export function Dashboard() {
  const [state] = useProfile();
  const history = useHistory();
  const [stocks, stocksActions] = useStocks();

  const ownedStocks = Object.entries(state.ownedStocks).filter(
    (stock: any) => stock[1].units_owned !== 0
  );

  // fetch stocks if unfetched
  if (stocks.haveStocksBeenFetched === false) {
    stocksActions.fetchStocks();
  }

  // process data into the stockFactsMap
  let stockFactsMap: Map<String, stockFacts> = new Map<String, stockFacts>();
  for (let i = 0; i < ownedStocks.length; i++) {
    let code = ownedStocks[i][0];
    for (let j = 0; j < stocks.data.length; j++) {
      if (stocks.data[j].code === code) {
        stockFactsMap.set(code, {
          currPrice: stocks.data[j].priceCurr,
          //@ts-ignore
          currValue: stocks.data[j].priceCurr * ownedStocks[i][1].units_owned,
          dailyProfit:
            //@ts-ignore
            stocks.data[j].priceChange * ownedStocks[i][1].units_owned,
          totalProfit:
            //@ts-ignore
            (stocks.data[j].priceCurr - ownedStocks[i][1].average_price) *
            //@ts-ignore
            ownedStocks[i][1].units_owned,
        });
      }
    }
  }

  let total = 0;
  stockFactsMap.forEach((value: any, key: String) => {
    total += value.totalProfit;
  });

  if (ownedStocks.length === 0) {
    const StockButton = (
      <Button
        rightIcon="arrow-right"
        intent="success"
        text="See all stocks"
        onClick={() => history.push("/stocks")}
      />
    );

    return (
      <NonIdealState
        icon="clean"
        title="You don't own any stocks"
        description={`Visit the stocks page to buy some stocks. You have $${state.balance.toFixed(
          2
        )} to buy stocks with.`}
        action={StockButton}
      />
    );
  }

  return (
    <>
      <div className="newsTitle">Owned Stocks</div>
      <h3>
        {"Unrealised Profit: "}
        <span className={getChangeClass(total)}>${total.toFixed(2)}</span>
        {" | Realised Profit: "}
        <span className={getChangeClass(state.profit)}>
          ${state.profit.toFixed(2)}
        </span>
        {" | Total Profit: "}
        <span className={getChangeClass(total + state.profit)}>
          ${(total + state.profit).toFixed(2)}
        </span>
      </h3>
      <h3>
        {"Balance: "}
        <span className={getChangeClass(state.balance)}>
          ${state.balance.toFixed(2)}
        </span>
      </h3>
      <table className="stockTable bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-interactive ">
        <thead>
          <tr>
            <th>Stock Code</th>
            <th>Units Owned</th>
            <th>Total Investment</th>
            <th>Current Value</th>
            <th>Average Price Per Unit</th>
            <th>Current Price</th>
            <th>Unrealised Profit</th>
          </tr>
        </thead>
        <tbody>
          {ownedStocks.map((i: any) => (
            <tr key={i[0]} onClick={() => history.push("/stock/" + i[0])}>
              <td>
                <b>{i[0]}</b>
              </td>
              <td>{i[1].units_owned}</td>
              <td>${i[1].total_investment.toFixed(2)}</td>
              <td>${stockFactsMap.get(i[0])?.currValue.toFixed(2)}</td>
              <td>${i[1].average_price.toFixed(2)}</td>
              <td>${stockFactsMap.get(i[0])?.currPrice.toFixed(2)}</td>
              <td>
                <b
                  className={getChangeClass(
                    stockFactsMap.get(i[0])?.totalProfit
                  )}
                >
                  ${stockFactsMap.get(i[0])?.totalProfit.toFixed(2)}
                </b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;
