//mongoose shcema for stocks
//we want to store ticker, name, prices
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  prices: {
    type: Array,
    required: false,
  },
  priceChange: {
    type: Number,
    required: false,
  },
  priceCurr: {
    type: Number,
    required: false,
  },
});

module.exports = stocks = mongoose.model("stocks", stockSchema);
