import React from "react";
import {
  Card,
  Elevation,
  NonIdealState,
  Button,
  ButtonGroup,
} from "@blueprintjs/core";
import { useHistory } from "react-router-dom";

import { useProfile, useStocks } from "../../store";
import { Stock } from "../../common/types";
import { getChangeClass } from "../../common/index";
import "./index.css";

// This creates an individual stock card on the watchlist page
function StockCard(Props: Stock) {
  const history = useHistory();
  const [, profileActions] = useProfile();

  const change =
    Props.change > 0
      ? `+${Props.change.toFixed(2)}%`
      : `${Props.change.toFixed(2)}%`;

  return (
    <Card elevation={Elevation.TWO} className="stock">
      <div className="headingContainer">
        <h4 className="bp3-heading">{Props.name}</h4>
      </div>
      <p>
        ${Props.price.toFixed(2)} |{" "}
        <b className={getChangeClass(Props.change)}>{change}</b>
      </p>
      <ButtonGroup fill minimal>
        <Button
          onClick={() => history.push(`/stock/${Props.code}`)}
          icon="chart"
          intent="primary"
        >
          Trade {Props.code}
        </Button>
        <Button
          onClick={() => profileActions.removeWatchlist(Props.code)}
          icon="cross"
          intent="danger"
        />
      </ButtonGroup>
    </Card>
  );
}

export function Watchlist() {
  const history = useHistory();
  const [state] = useProfile();
  const [stocks, stockActions] = useStocks();

  // This page requires stock data
  if (stocks.haveStocksBeenFetched === false) {
    stockActions.fetchStocks();
  }

  if (state.watchlist.length === 0) {
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
        icon="eye-off"
        title="Your watchlist is empty"
        description="Visit the stocks page to add some stocks to your watchlist"
        action={StockButton}
      />
    );
  }

  // combine the watchlist and stock data to create tiles of data
  const tiles = state.watchlist.map((c) => {
    const stock = stocks.data.find((s) => s.code === c);
    if (stock) {
      return {
        name: stock.name,
        price: stock.priceCurr,
        code: c,
        change: stock.priceChange,
      };
    }
    return { name: "Company name", price: 0, code: c, change: 0 };
  });

  // map the tiles of data to react components and render them
  return (
    <div className="stockContainer">
      {tiles.map((stock) => (
        <StockCard {...stock} key={stock.code} />
      ))}
    </div>
  );
}

export default Watchlist;
