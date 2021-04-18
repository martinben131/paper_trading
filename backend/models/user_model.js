//mongoose shcema for users
//we want to store name, email, password
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  unhashedPassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  watchlist: {
    type: Array,
    required: true,
    default: [],
  },
  profit: {
    type: Number,
    required: true,
    default: 0,
  },
  ownedStocks: {
    type: Map,
    required: true,
    default: new Map(),
  },
  transactions: {
    type: Array,
    required: true,
    default: [],
  },
});
module.exports = User = mongoose.model("users", UserSchema);
