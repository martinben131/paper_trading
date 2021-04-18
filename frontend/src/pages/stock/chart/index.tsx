import React from "react";
import { Spinner } from "@blueprintjs/core";
import { useParams } from "react-router-dom";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { getChangeClass } from "../../../common";
import { useData } from "../store";
import { options } from "./chartOptions";
import "./index.css";

function Chart() {
  //hooks
  const [stockData, actions] = useData();
  const params = useParams();

  // get data for the stock
  if (stockData.code !== params["code"]) {
    actions.fetchData(params["code"]);
  }

  if (stockData.loading) {
    return <Spinner />;
  }

  //change data into data that can be read by highStocks
  const chartData: any[] = [];
  for (let i = 0; i < stockData.prices.length; i++) {
    chartData.push({
      x: new Date(stockData.prices[i].date).getTime(),
      y: stockData.prices[i].close,
    });
  }

  return (
    <>
      <div className="codeDetails">
        {stockData.code} | {stockData.name}
      </div>
      <div className="price">
        <span className="priceDetails">${stockData.priceCurr.toFixed(2)}</span>
        <span
          className={`${getChangeClass(
            stockData.priceChange
          )} priceChangeDetails`}
        >
          {stockData.priceChange.toFixed(2)}% (day)
        </span>
      </div>
      <div>
        <HighchartsReact
          className="chart"
          constructorType={"stockChart"}
          highcharts={Highcharts}
          options={options(chartData, stockData.code)}
        />
      </div>
    </>
  );
}

export default Chart;
