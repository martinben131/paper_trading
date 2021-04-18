// our routes for /users
// this contains endpoints for registration and login
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Validator = require("validator");
const jwt = require("jsonwebtoken");

// import helper validation functions
const validateRegistration = require("../helperFunctions/register");
const validateLogin = require("../helperFunctions/login");

// load mongoose user model
const User = require("../models/user_model");

// @route POST users/register
// @desc Register a new user - this is the endpoint for user registration
// @access Public
router.post("/register", (req, res) => {
  //user validateRegistration helper functiont to valid registration information
  const { errors, isValid } = validateRegistration(req.body);
  if (!isValid) {
    //return errors to display on frontend
    return res.status(400).json(errors);
  }

  //Check if the user already exists
  User.findOne({ email: req.body.email }).then((user) => {
    //if registration was valid create a new User and save it
    if (user){
      return res.status(400).json({email: "Email in use"});
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      unhashedPassword: req.body.password,
      balance: req.body.balance,
      watchlist: [],
      profit: 0,
      transactions: [],
      ownedStocks: new Map(),
    });

    // before saving the password in the database we should hash it
    // bcrpyt is alibrary to help hash passwords
    bcrypt.genSalt(10, (err, salt) => {
      //salt is string added to password being hashed before hashing
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //once the password has been hashed update the users password
        //to the hashed password and save user in DB
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
});

// @route POST users/login
// @desc Login user and return JWT token.
// @access Public
router.post("/login", (req, res) => {
  //validate the login information in the request
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find the user in the database by their email
  User.findOne({ email: req.body.email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({email:"Email not found"});
    } else {
      // compare the inputted password to the users password
      if (req.body.password.localeCompare(user.unhashedPassword) != 0){
        return res.status(400).json({password:"Password incorrect"});
      }
    }
    if (user) {
      //if user is found log the user to console and create the payload for the jwt
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        hash: user.password,
        balance: user.balance,
        watchlist: user.watchlist,
        profit: user.profit,
        ownedStocks: user.ownedStocks,
        transactions: user.transactions,
      };

      //sign jwt
      const token = jwt.sign(payload, "secret", {
        expiresIn: 3600,
      });

      return res.status(200).json({
        token,
        payload,
      });
    }
  });
});

// @route POST users/watchStock
// @desc edit watchlist - basically sets the users watchlist
// @access Public
router.post("/watchStock", (req, res) => {
  //validate login information
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find user in the database by email
  User.findOne({ email: req.body.email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({watch:"Email not found"});
    } else {
      // compare the inputted password to the users unhashed password
      if (req.body.password.localeCompare(user.password) != 0){
        return res.status(400).json({watch:"Password incorrect"});
      }
    }
    if (user) {
      //once user is found update the users watchlist to the watchlist in the request then save the user
      user.watchlist = req.body.newWatchlist;
      user.save();

      //create payload for jwt
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        hash: user.password,
        balance: user.balance,
        watchlist: user.watchlist,
        profit: user.profit,
        ownedStocks: user.ownedStocks,
        transactions: user.transactions,
      };

      //create signed jwt
      const token = jwt.sign(payload, "secret", {
        expiresIn: 3600,
      });

      return res.status(200).json({
        token,
        payload,
      });
    }
  });
});

// @route POST users/editBalance
// @desc Change users balance
// @access Public
router.post("/editBalance", (req, res) => {
  //validate login information
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find the user in the database
  User.findOne({ email: req.body.email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({balance:"Email not found"});
    } else {
      // compare the inputted password to the users unhashed password
      if (req.body.password.localeCompare(user.password) != 0){
        return res.status(400).json({balance:"Password incorrect"});
      }
    }
    if (user) {
      //if the user is found, update the users balance to the balance in the request then save the user
      user.balance = req.body.newBalance;
      user.save();

      //create payload for jwt
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        hash: user.password,
        balance: user.balance,
        watchlist: user.watchlist,
        profit: user.profit,
        ownedStocks: user.ownedStocks,
        transactions: user.transactions,
      };

      //sign the jwt
      const token = jwt.sign(payload, "secret", {
        expiresIn: 3600,
      });

      return res.status(200).json({
        token,
        payload,
      });
    }
  });
});

// @route POST users/transaction
// @desc Allow user to simul buy/sell stock and update transactions history, profit and owned stocks
// @access Public
router.post("/transaction", (req, res) => {
  //validate the login information
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find the user in the database
  User.findOne({ email: req.body.email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({transaction:"Email not found"});
    } else {
      // compare the inputted password to the users unhashed password
      if (req.body.password.localeCompare(user.password) != 0){
        return res.status(400).json({transaction:"Password incorrect"});
      }
    }
    if (user) {
      //if the user is found then handle simul buying/selling
      const stock_code = req.body.stock_code;
      const units = req.body.units;
      const stock_price = req.body.stock_price;
      const total_cost = units * stock_price;
      if (req.body.is_buy) {
        //if the request indicates that it is a buy transaction then we first check if the user has enough balance to make the purchase
        //if not then return an error
        if (user.balance < total_cost) {
          console.log("ERROR: insufficient balance to make purchase");
          return res
            .status(400)
            .json({transaction:"Error: Insufficient balance to make purchase"});
        } else {
          //if the user has enough balance to make the purchase then purchase the stock
          //first update the balance
          user.balance = user.balance - total_cost;

          //look for the stock code in the users ownedStocks map. If the key does not exist then set the key value pair for that stock code to defaults
          if (!user.ownedStocks.has(stock_code)) {
            user.ownedStocks.set(stock_code, {
              units_owned: 0,
              average_price: 0,
              total_investment: 0,
              total_profit: 0,
            });
          }

          //update the users owned stocks information for that stock code
          //first update new units owned by adding the purchased units
          const new_units_owned =
            user.ownedStocks.get(stock_code)["units_owned"] + units;

          //calculate new total investment by adding the cost paid for the purchase
          const new_total_investment =
            user.ownedStocks.get(stock_code)["total_investment"] + total_cost;

          //calculate new average price based on the new total investment and units owned
          const new_average_price = new_total_investment / new_units_owned;

          const new_total_profit = user.ownedStocks.get(stock_code)[
            "total_profit"
          ];

          //update the user.ownedStocks map for the stock code key with the new information
          user.ownedStocks.set(stock_code, {
            units_owned: new_units_owned,
            total_investment: new_total_investment,
            average_price: new_average_price,
            total_profit: new_total_profit,
          });

          //add this buy transaction to the users transaction array
          user.transactions.push({
            stock_code: stock_code,
            units: units,
            stock_price: stock_price,
            transaction_type: "buy",
            transaction_time: Date(),
          });
        }
      } else {
        //if the user wants to make a sell transaction first check that the user owns the stock
        if (!user.ownedStocks.has(stock_code)) {
          console.log("ERROR: Stock not owned");
          return res.status(400).json({ transaction: "Stock not owned" });
          //we then check if the user owns enough stock to make the sale
        } else if (user.ownedStocks.get(stock_code)["units_owned"] < units) {
          console.log("ERROR: Insufficient stock for sell");
          return res
            .status(400)
            .json({ transaction: "Insufficient stock owned to make sale" });
        } else {
          //once we hae verified the user can make this sale we add the sale revenue to the users balance
          user.balance = user.balance + total_cost;

          //we then update the number of units owned, total investment and the new average price
          const new_units_owned =
            user.ownedStocks.get(stock_code)["units_owned"] - units;
          const total_investment_change =
            units * user.ownedStocks.get(stock_code)["average_price"];
          const new_total_investment =
            user.ownedStocks.get(stock_code)["total_investment"] -
            total_investment_change;
          const new_average_price = new_total_investment / new_units_owned;

          //we then update the users total profit on that stock as well as the users overall profit
          const sale_profit =
            (stock_price - user.ownedStocks.get(stock_code)["average_price"]) *
            units;
          const new_total_profit =
            user.ownedStocks.get(stock_code)["total_profit"] + sale_profit;
          user.profit = user.profit + sale_profit;

          //we then update they key value pair in the users owned stocks for this stock code, with this new information
          user.ownedStocks.set(stock_code, {
            units_owned: new_units_owned,
            total_investment: new_total_investment,
            average_price: new_average_price,
            total_profit: new_total_profit,
          });

          //add the sell transaction to the users transaction array
          user.transactions.push({
            stock_code: stock_code,
            units: units,
            stock_price: stock_price,
            transaction_type: "sell",
            transaction_time: Date(),
          });
        }
      }

      //save the updates to the user
      user.save();

      //create jwt payload
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        hash: user.password,
        balance: user.balance,
        watchlist: user.watchlist,
        profit: user.profit,
        ownedStocks: user.ownedStocks,
        transactions: user.transactions,
      };

      //sign jwt
      const token = jwt.sign(payload, "secret", {
        expiresIn: 3600,
      });

      return res.status(200).json({
        token,
        payload,
      });
    }
  });
});

// @route POST users/updateUsername
// @desc Change users username
// @access Public
router.post("/update_username", (req, res) => {
  //validate login information
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const new_username = req.body.new_username;

  if (Validator.isEmpty(new_username)) {
    return res.status(400).json({username:"Username not updated - Username is empty"});
  }

  //find the user by email
  User.findOne({ email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({username:"Email not found"});
    } else {
      // compare the inputted password to the users unhashed password
      if (req.body.password.localeCompare(user.password) != 0){
        return res.status(400).json({username:"Password incorrect"});
      }
    }

    //update the users username and save it to the DB
    user.username = new_username;
    user.save();

    //create payload
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      hash: user.password,
      balance: user.balance,
      watchlist: user.watchlist,
      profit: user.profit,
      ownedStocks: user.ownedStocks,
      transactions: user.transactions,
    };

    //sign jwt
    const token = jwt.sign(payload, "secret", {
      expiresIn: 3600,
    });

    return res.status(200).json({
      token,
      payload,
    });
  });
});

// @route POST users/update_email
// @desc Change users email
// @access Public
router.post("/update_email", (req, res) => {
  //validate login information
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const new_email = req.body.new_email;

  if (Validator.isEmpty(new_email)) {
    return res.status(400).json({email:"Email not updated - Email is empty"});
  }

  if (!Validator.isEmail(new_email)) {
    return res.status(400).json({email:"Email not updated - Email is invalid"});
  }

  //find the user in the database by email
  User.findOne({ email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({email:"Email not found"});
    } else {
      // compare the inputted password to the users unhashed password
      if (req.body.password.localeCompare(user.password) != 0){
        return res.status(400).json({email:"Password incorrect"});
      }
    }

    // check that the new email also doesn't exist yet in the db
    User.findOne({ email: new_email }).then((new_user) => {
      if (new_user) {
        return res.status(400).json({
          error: "New email already exists",
        });
      }

      //update the users email to the new email and save to the db
      user.email = new_email;
      user.save();

      //create payload for jwt
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        hash: user.password,
        balance: user.balance,
        watchlist: user.watchlist,
        profit: user.profit,
        ownedStocks: user.ownedStocks,
        transactions: user.transactions,
      };

      //sign jwt
      const token = jwt.sign(payload, "secret", {
        expiresIn: 3600,
      });

      return res.status(200).json({
        token,
        payload,
      });
    });
  });
});

// @route POST users/update_password
// @desc Change users password
// @access Public
router.post("/update_password", (req, res) => {
  //validate login information
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const new_password = req.body.new_password;

  if (!Validator.isLength(new_password, { min: 6, max: 30 })) {
    return res.status(400).json({password:"Password not updated - Password must be at least 6 characters"}); 
  }

  //find the user in the DB by email
  User.findOne({ email }).then((user) => {
    //check user exists
    if (!user) {
      return res.status(400).json({password:"Email not found"});
    } else {
      // compare the inputted password to the users unhashed password
      if (req.body.password.localeCompare(user.password) != 0){
        return res.status(400).json({password:"Password incorrect"});
      }
    }

    //generate a new hash for the user by hashing the new password in the request
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(new_password, salt, (err, hash) => {
        if (err) throw err;
        //update the users password to the new hash and save to the DB
        user.password = hash;
        user.unhashedPassword = new_password;
        user.save();

        //ceate payload for jwt
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          hash: user.password,
          balance: user.balance,
          watchlist: user.watchlist,
          profit: user.profit,
          ownedStocks: user.ownedStocks,
          transactions: user.transactions,
        };

        //sign jwt
        const token = jwt.sign(payload, "secret", {
          expiresIn: 3600,
        });

        return res.status(200).json({
          token,
          payload,
        });
      });
    });
  });
});

module.exports = router;
