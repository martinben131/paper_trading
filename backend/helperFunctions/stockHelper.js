// importing the 500 codes from the S&P500
var spStocks = require("../stockTickers/S&P500.json");
var request = require("request");
// load stock database model
const Stock = require("../models/stock_model.js");

// fetches the stock prices for all S&P500 stocks
function fetchStockPrices() {
  const SnPstocks = spStocks;

  // calculates the date from one year ago
  let today = new Date();
  let currDate = formatDate(today);
  let lastYear = formatDate(today.setDate(today.getDate() - 365));
  var keys = Object.keys(SnPstocks);

  // for each stock ticker, make a call to the Tiingo API
  for (i = 0; i < keys.length; i++) {
    var url =
      "https://api.tiingo.com/tiingo/daily/" +
      keys[i] +
      "/prices?startDate=" +
      lastYear +
      "&endDate=" +
      currDate +
      "&token=85c2108d04702bb50857084856b681f64b34f630";

    // once the api is resolved, save the stock information into the database
    getStockData(url, keys[i]).then((resolve, reject) => {
      let body = resolve;
      let last = body.length;
      let priceChange =
        ((body[last - 2]["close"] - body[last - 3]["close"]) /
          body[last - 2]["close"]) *
        100;

      Stock.findOne({ code: body[last - 1] }, function (err, stock) {
        // return early if stock does not exist
        if (!stock) {
          return;
        }
        stock.priceCurr = body[last - 2].close;
        stock.priceChange = priceChange;
        stock.prices = body.slice(0, last - 1);
        stock.save();
      });
    });
  }
}

// fires the actual request to Tiingo given the URL and stock code
async function getStockData(url, stockCode) {
  var requestOptions = {
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    code: stockCode,
  };
  let promise = new Promise((resolve, reject) => {
    request(requestOptions, function (error, response, body) {
      content = JSON.parse(body);
      content.push(stockCode);
      resolve(content);
    });
  });
  let result = await promise;
  return result;
}

// formats the seeking alpha news url given the title of an article
function createLink(title, link) {
  code = link.split(":")[2];
  let url = "https://seekingalpha.com/news/" + code;

  var letters = /^[A-Za-z]+$/;

  for (i = 0; i < title.length; i++) {
    if (title[i].match(letters)) {
      url += title[i];
    } else if (title[i] == " ") {
      url += "-";
    }
  }
  return url;
}

// format the date object to Tiingo's requirements
function formatDate(date) {
  date = new Date(date);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();

  newdate = year + "-" + month + "-" + day;
  return newdate;
}

function shortenDate(date) {
  date = date.split(" ");
  return date.slice(0, 5).join(" ");
}

module.exports = {
  fetchStockPrices,
  createLink,
  shortenDate,
  formatDate,
};
