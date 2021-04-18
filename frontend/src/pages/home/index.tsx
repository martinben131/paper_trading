import React from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { useProfile } from "../../store";

import stonksImage from "./assets/stonks.jpg";
import laptopImage from "./assets/laptop.png";
import makeAccount from "./assets/makeAccount.jpg";
import searchStock from "./assets/searchStock.jpg";
import watchList from "./assets/watchList.jpg";
import dashboard from "./assets/dashboard.jpg";

import "./index.css";

// This is the home page detailing information about the program
export function Home() {
  const history = useHistory();
  const [state] = useProfile();

  return (
    <>
      <div className="flex-container">
        <div className="col">
          <h1 className="title">
            Stonks is a trading website that lets you experience the stock
            market before you jump in for good.
          </h1>
          <h2 className="top-line">
            Practice buying and selling stocks with your own predetermined
            budget. We use real time data from hundreds of stocks. Sign up now
            for free.
          </h2>
          {/* Create Account/Login buttons are present if the user is not logged in */}
          {!state.id && (
            <ButtonGroup className="buttons">
              <Button
                rightIcon="arrow-right"
                intent="success"
                text="Create an account"
                large
                onClick={() => history.push("/register")}
              />
              <Button
                rightIcon="log-in"
                intent="primary"
                text="Login"
                large
                onClick={() => history.push("/login")}
              />
            </ButtonGroup>
          )}
        </div>
        <div className="image-wrapper">
          <img src={stonksImage} alt="Stonks man" />
        </div>
      </div>

      <div className="flex-container-light">
        <img
          src={laptopImage}
          className="laptopPicture"
          alt="Stonks website on laptop"
        />
        <div className="col">
          <h1>
            Whether you are a beginner who is looking for an introduction or an
            advanced trader looking to innovate, practice buying and selling
            stocks your own way.
          </h1>
          <br />
          <h3>Experiment with your trades</h3>
          <p>
            Whether you're an advanced trader or just starting out, you can use
            stonks to experiment with new strategies or reinforce existing ones.
          </p>
          <br />
          <h3>Loaded with functionality</h3>
          <p>
            Contains all functionality from buying/selling, having a watchlist,
            being able to search for stocks, and view transaction history.
          </p>
          <br />
          <h3>Simple Interface</h3>
          <p>Extremely easy to use and understand for all levels.</p>
          <br />
          <h3>Finally... It's absolutely free!</h3>
          <p>No cost to you as a consumer.</p>
          <br />
        </div>
      </div>

      <div className="flex-container">
        <div className="container">
          <div className="secondHeading">
            <h1>Workflow</h1>
          </div>
          <div className="row">
            <div className="card">
              <div className="card-header">
                <h1>Step 1</h1>
              </div>
              <img
                src={makeAccount}
                className="cardPic"
                alt="Create account buttons"
              />
              <p className="cardText">
                Create an account free of charge and login with the details that
                you registered with.
              </p>
            </div>
            <div className="card">
              <div className="card-header">
                <h1>Step 2</h1>
              </div>
              <img src={searchStock} className="cardPic" alt="List of stocks" />
              <p className="cardText">
                Search for any of your desired stocks in the S&P500, or browse
                through our simple list.
              </p>
            </div>
            <div className="card">
              <div className="card-header">
                <h1>Step 3</h1>
              </div>
              <img src={watchList} className="cardPic" alt="Watchlist" />
              <p className="cardText">
                Add your desired stocks to the watchlist and observe the
                movements
              </p>
            </div>
            <div className="card">
              <div className="card-header">
                <h1>Step 4</h1>
              </div>
              <img src={dashboard} className="cardPic" alt="Dashboard" />
              <p className="cardText">
                Buy or sell your desired stock regardless of whether it is on
                your watchlist and watch your profits grow!
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="footer">
        Investment Simulator - UNSW COMP3900 Project - T3 2020 - H17A - stonks
      </p>
    </>
  );
}

export default Home;
