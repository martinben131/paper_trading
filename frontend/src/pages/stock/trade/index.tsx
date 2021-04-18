import React, { useState } from "react";
import { Card, Button, NumericInput } from "@blueprintjs/core";
import { useParams } from "react-router-dom";

import { useProfile } from "../../../store";
import { useData } from "../store";
import "./index.css";

function Trade() {
  //hooks
  const [store, actions] = useProfile();
  const [stockData] = useData();

  const [quantity, setQuantity] = useState(0);
  const [isBuy, setIsBuy] = useState(true);
  const params = useParams();

  const price = stockData.priceCurr;
  const code = params["code"];

  //get data of the current stock with regards to user
  // is it in their watchlist, units owned, price etc
  const inWatchlist = store.watchlist.includes(code);
  const unitsOwned = store.ownedStocks[code]
    ? store.ownedStocks[code].units_owned
    : 0;
  const totalInvestment = store.ownedStocks[code]
    ? store.ownedStocks[code].total_investment
    : 0;
  const averagePrice =
    store.ownedStocks[code] && store.ownedStocks[code].average_price
      ? store.ownedStocks[code].average_price
      : 0;

  // check to see if they can buy/sell
  const max = isBuy ? Math.floor(store.balance / price) : unitsOwned;

  //toggle between buy/sell
  if (isBuy === false && unitsOwned === 0) {
    setIsBuy(true);
  }

  //are they allowed to sell?
  function checkSell() {
    if (unitsOwned > 0) {
      setIsBuy(false);
    }
  }

  return (
    <Card>
      <div className="sub">Current Price: ${price.toFixed(2)} </div>
      <div className="sub">Units Owned: {unitsOwned} </div>
      <div className="sub">Total Value: ${totalInvestment.toFixed(2)} </div>
      <div className="sub">Average Price: ${averagePrice.toFixed(2)} </div>
      <Button
        icon={inWatchlist ? "eye-off" : "eye-on"}
        text={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        onClick={
          inWatchlist
            ? () => actions.removeWatchlist(code)
            : () => actions.addWatchlist(code)
        }
      />
      <div className="buySellHeading">
        <div className="container">
          <div
            className={`buyBox ${isBuy ? "selectedBuy" : ""}`}
            onClick={() => setIsBuy(true)}
          >
            Buy
          </div>
          <div
            className={`sellBox ${!isBuy ? "selectedSell" : ""}`}
            onClick={() => checkSell()}
          >
            Sell
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <NumericInput
        value={quantity}
        onValueChange={(val) => setQuantity(val)}
        stepSize={1}
        majorStepSize={10}
        large
        min={0}
        max={max}
      />
      <Button
        text={"Confirm purchase"}
        disabled={
          quantity === 0 || !Number.isInteger(quantity) || quantity > max
        }
        onClick={() => actions.tradeStock(code, quantity, price, isBuy)}
      />
    </Card>
  );
}

export default Trade;
