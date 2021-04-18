const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Setup application and connect to database
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

require("./config/passport")(passport);
app.use(passport.initialize());

// importing the endpoints for both the user and stock routes
app.use("/users", require("./routes/users"));
app.use("/stocks", require("./routes/stocks"));

app.listen(PORT, () => {
  console.log(`Stonks app listening at http://localhost:${PORT}`);
});
