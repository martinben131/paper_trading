import React, { useState } from "react";
import { InputGroup, NonIdealState, Button } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { useStocks, useProfile } from "../../store";
import { handleStringChange, getChangeClass } from "../../common/index";
import "./index.css";
export function Stocks() {
  //hooks
  const [searchText, setSearchText] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [stocks, stocksActions] = useStocks();
  const [profile, profileActions] = useProfile();
  const [sortKey, setSortKey] = useState(null);
  const history = useHistory();

  //get s&p 500 stock data
  if (stocks.haveStocksBeenFetched === false) {
    stocksActions.fetchStocks();
  }

  //sorting functionality
  function changeSortKey(key) {
    if (sortDirection === "asc" && key === sortKey) {
      sortByKeyDesc(key);
      setSortKey(key);
      setSortDirection("desc");
    } else {
      sortByKeyAsc(key);
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  // changes in the search field
  const handleSearchChange = handleStringChange((searchText) =>
    setSearchText(searchText)
  );

  //sort ascending
  function sortByKeyAsc(key) {
    stocks.data.sort(function (a, b) {
      var keyA = a[key],
        keyB = b[key];
      if (key === "name") {
        keyA.toUpperCase();
        keyB.toUpperCase();
      }
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  //sort descending
  function sortByKeyDesc(key) {
    stocks.data.sort(function (a, b) {
      var keyA = a[key],
        keyB = b[key];
      if (key === "name") {
        keyA = keyA.toUpperCase();
        keyB = keyB.toUpperCase();
      }
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
  }

  return (
    <>
      <InputGroup
        large
        placeholder="Enter stock code..."
        type={"search"}
        onChange={handleSearchChange}
      />
      {stocks.data.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchText.toLowerCase()) ||
          stock.code.toLowerCase().includes(searchText.toLowerCase())
      ).length !== 0 ? (
        <table
          id="StocksTable"
          className="stockTable bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-interactive sortable "
        >
          <thead>
            <tr>
              <th onClick={() => changeSortKey("code")}>{`Stock Code ${
                sortKey === "code" && sortDirection === "asc"
                  ? "⬆️"
                  : sortKey === "code" && sortDirection === "desc"
                  ? "⬇️"
                  : ""
              }`}</th>
              <th onClick={() => changeSortKey("name")}>{`Stock Name ${
                sortKey === "name" && sortDirection === "asc"
                  ? "⬆️"
                  : sortKey === "name" && sortDirection === "desc"
                  ? "⬇️"
                  : ""
              }`}</th>
              <th onClick={() => changeSortKey("priceCurr")}>{`Price ${
                sortKey === "priceCurr" && sortDirection === "asc"
                  ? "⬆️"
                  : sortKey === "priceCurr" && sortDirection === "desc"
                  ? "⬇️"
                  : ""
              }`}</th>
              <th onClick={() => changeSortKey("priceChange")}>{`Day ${
                sortKey === "priceChange" && sortDirection === "asc"
                  ? "⬆️"
                  : sortKey === "priceChange" && sortDirection === "desc"
                  ? "⬇️"
                  : ""
              }`}</th>
              <th>Watchlist</th>
            </tr>
          </thead>
          <tbody>
            {stocks.data
              .filter(
                (stock) =>
                  stock.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  stock.code.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((i) => (
                <tr key={i.code}>
                  <td onClick={() => history.push("/stock/" + i.code)}>
                    <b>{i.code}</b>
                  </td>
                  <td onClick={() => history.push("/stock/" + i.code)}>
                    {i.name}
                  </td>
                  <td onClick={() => history.push("/stock/" + i.code)}>
                    ${i.priceCurr.toFixed(2)}
                  </td>
                  <td onClick={() => history.push("/stock/" + i.code)}>
                    <b className={getChangeClass(i.priceChange)}>
                      {i.priceChange > 0
                        ? `+${i.priceChange.toFixed(2)}%`
                        : `${i.priceChange.toFixed(2)}%`}
                    </b>
                  </td>
                  <td>
                    <Button
                      icon={
                        profile.watchlist.includes(i.code)
                          ? "eye-on"
                          : "eye-off"
                      }
                      onClick={
                        profile.watchlist.includes(i.code)
                          ? () => profileActions.removeWatchlist(i.code)
                          : () => profileActions.addWatchlist(i.code)
                      }
                      intent={
                        profile.watchlist.includes(i.code)
                          ? "primary"
                          : "warning"
                      }
                      minimal
                      fill
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <NonIdealState
          icon="search"
          title="No results found"
          description="Your stock might not be on stonks or you might have made an error. Please try again."
          className="emptyState"
        />
      )}
    </>
  );
}

export default Stocks;
