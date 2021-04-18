import React from "react";

import Chart from "./chart";
import Trade from "./trade";
import News from "./news";

import "./index.css";

// The stock page is made up of three components, the chart, the trade window and the news section
export function Stock() {
  return (
    <>
      {/* // product details section includes the price and the graph */}
      <div className="firstRow">
        <div className="productDetails">
          <Chart />
        </div>
        {/* //Buy Sell section includes the current details of ownership and the buy/sell functionality */}
        <div className="buySellContainer subtitleHeading">
          <Trade />
        </div>
      </div>
      {/* // news section is simply the news regarding the stock */}
      <div className="newsSection">
        <News />
      </div>
    </>
  );
}

export default Stock;
