var express = require("express");
var router = express.Router();
var CronJob = require("cron").CronJob;
var Parser = require("rss-parser");

// load stock database model
const Stock = require("../models/stock_model.js");

// import stocks helper functions
const { fetchStockPrices, createLink, shortenDate } = require("../helperFunctions/stockHelper")

// CronJob which runs every morning at 9am to fetch and update all S&P500 stock prices
const updateStocks = new CronJob("00 00 09 * * *", function() {
  fetchStockPrices();
});
updateStocks.start();

// define the default stocks page route
router.get("/", (req, res) => {
  res.send("Stocks home page");
});

// get data for all 500 S&P stocks
router.get("/all", (req, res) => {
  Stock.find({}, "code name priceChange priceCurr").then(stocks => {
    res.send(stocks);
  });
});

// get historical price data for a particular stock by code
router.post("/prices", (req, res) => {
  let code = req.body.code;
  Stock.findOne({ code }).then(stock => {
    res.send(stock);
  });
});

// get news data for a partictular stock by code
router.post("/news", (req, res) => {
  let code = req.body.code;
  let parser = new Parser();
  let news = [];

  // fetch RSS data from seeking alpha
  (async () => {
    let feed = await parser.parseURL(
      "https://seekingalpha.com/api/sa/combined/" + code + ".xml"
    );
    // formatting the news data so it's easier to read from the frontend
    feed.items.forEach(item => {
      news.push({
        title: item.title,
        link: createLink(item.title, item.guid),
        pubDate: shortenDate(item.pubDate)
      });
    });
    res.send(news);
  })();
});

// gets daily prices of all stocks
router.get("/getDailyPrices", (req, res) => {
  fetchStockPrices();
})

module.exports = router;

