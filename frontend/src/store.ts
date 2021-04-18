import axios from "axios";
import jwt_decode from "jwt-decode";
import { createStore, createHook } from "react-sweet-state";

import setAuthToken from "./utils/setAuthToken";
import { AppToaster } from "./utils/toaster";

// We are using react-sweet-state for state management.
// All global state stores are stored here (useProfile and useStocks)
// useProfile handles all user actions like logging in, balance, watchlist and trading stocks
// useStocks handles the fetching of the full stock price list
// All global endpoint calls are also done in this file.

// This function updates local state once a response returns from the server
const setUser = (decoded) => ({ setState }) => {
  const {
    email,
    id,
    username,
    exp,
    iat,
    hash,
    balance,
    watchlist,
    profit,
    ownedStocks,
    transactions,
  } = decoded;
  setState({
    email: email,
    id: id,
    username: username,
    exp: exp,
    iat: iat,
    hash: hash,
    balance: balance,
    watchlist: watchlist,
    profit: profit,
    ownedStocks: ownedStocks,
    transactions: transactions,
  });
};

// This function processes logins
const processRes = (res) => ({ dispatch }) => {
  const { token } = res.data;
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);
  const decoded = jwt_decode(token);
  dispatch(setUser(decoded));
};

const ProfileStore = createStore({
  // value of the store on initialisation
  initialState: {
    email: "",
    id: null,
    username: "",
    exp: null,
    iat: null,
    balance: 0,
    hash: null,
    watchlist: [] as string[],
    profit: 0,
    ownedStocks: {} as any,
    transactions: [] as string[],
    registerErrorMessage: {} as any,
    loginErrorMessage: {} as any,
    profileErrorMessage: {} as any,
  },
  // actions that trigger store mutation
  actions: {
    register: (
      email: string,
      password: string,
      username: string,
      password2: string,
      balance: number,
      history: any
    ) => async ({ getState, setState }) => {
      try {
        setState({ registerErrorMessage: {} });
        await axios.post("/users/register", {
          email,
          password,
          username,
          password2,
          balance,
        });
      } catch (e) {
        setState({ registerErrorMessage: e.response.data });
      } finally {
        const { registerErrorMessage } = getState();
        if (Object.keys(registerErrorMessage).length === 0) {
          history.push("/login");
        }
      }
    },
    login: (email: string, password: string) => async ({
      dispatch,
      setState,
    }) => {
      try {
        setState({ loginErrorMessage: {}, registerErrorMessage: {} });
        const res = await axios.post("/users/login", { email, password });
        dispatch(processRes(res));
      } catch (e) {
        setState({ loginErrorMessage: e.response.data });
      }
    },
    setUser: (decoded) => ({ dispatch }) => {
      dispatch(setUser(decoded));
    },
    logout: () => ({ setState }) => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      setState({
        email: "",
        id: null,
        username: "",
        exp: null,
        iat: null,
        balance: 0,
        hash: null,
        watchlist: [],
        profit: 0,
        ownedStocks: {} as any,
        transactions: [],
      });
    },
    setBalance: (newBalance: number) => async ({
      getState,
      setState,
      dispatch,
    }) => {
      const { email, hash } = getState();
      setState({ balance: newBalance });
      const res = await axios.post("/users/editBalance", {
        email,
        password: hash,
        newBalance,
      });
      dispatch(processRes(res));
    },
    setUsername: (new_username: string) => async ({
      getState,
      setState,
      dispatch,
    }) => {
      const { email, hash } = getState();
      try {
        setState({ profileErrorMessage: {} });
        const res = await axios.post("/users/update_username", {
          email,
          password: hash,
          new_username,
        });
        dispatch(processRes(res));
      } catch (e) {
        setState({ profileErrorMessage: e.response.data });
      }
    },
    setEmail: (new_email: string) => async ({
      getState,
      setState,
      dispatch,
    }) => {
      const { email, hash } = getState();
      try {
        setState({ profileErrorMessage: {} });
        const res = await axios.post("/users/update_email", {
          email,
          password: hash,
          new_email,
        });
        dispatch(processRes(res));
      } catch (e) {
        setState({ profileErrorMessage: e.response.data });
      }
    },
    setPassword: (new_password: string) => async ({
      getState,
      setState,
      dispatch,
    }) => {
      const { email, hash } = getState();
      try {
        setState({ profileErrorMessage: {} });
        const res = await axios.post("/users/update_password", {
          email,
          password: hash,
          new_password,
        });
        dispatch(processRes(res));
      } catch (e) {
        setState({ profileErrorMessage: e.response.data });
      }
    },
    addWatchlist: (code: string) => async ({
      getState,
      setState,
      dispatch,
    }) => {
      if (!getState().watchlist.includes(code)) {
        const { email, hash } = getState();
        const newWatchlist = [...getState().watchlist, code];

        setState({ watchlist: newWatchlist });

        const res = await axios.post("/users/watchStock", {
          email,
          password: hash,
          newWatchlist,
        });
        dispatch(processRes(res));
      }
    },
    removeWatchlist: (code: string) => async ({
      getState,
      setState,
      dispatch,
    }) => {
      if (getState().watchlist.includes(code)) {
        const { email, hash } = getState();
        const newWatchlist = [
          ...getState().watchlist.filter((c) => c !== code),
        ];

        setState({ watchlist: newWatchlist });

        const res = await axios.post("/users/watchStock", {
          email,
          password: hash,
          newWatchlist,
        });
        dispatch(processRes(res));
      }
    },
    tradeStock: (
      stock_code: string,
      units: number,
      stock_price: number,
      is_buy: boolean
    ) => async ({ getState, dispatch }) => {
      const { email, hash } = getState();
      const res = await axios.post("/users/transaction", {
        email,
        password: hash,
        stock_code,
        units,
        stock_price,
        is_buy,
      });
      AppToaster.show({
        intent: "primary",
        icon: "chart",
        message: `Trade Conformation: ${units} ${
          units === 1 ? "unit" : "units"
        } of ${stock_code} ${is_buy ? "bought" : "sold"} at $${stock_price}`,
      });
      dispatch(processRes(res));
    },
  },
});

// This calls the endpoint to fetch all basic stock data
const StocksStore = createStore({
  initialState: {
    data: [] as {
      code: string;
      name: string;
      priceCurr: number;
      priceChange: number;
    }[],
    haveStocksBeenFetched: false,
  },
  actions: {
    fetchStocks: () => async ({ setState }) => {
      setState({ haveStocksBeenFetched: true });
      const res = await axios.get("/stocks/all");
      setState({ data: res.data });
    },
  },
});

// This store changes the theme from light to dark
const ThemeStore = createStore({
  initialState: {
    isDark: false,
  },
  actions: {
    swap: () => ({ setState, getState }) => {
      const { isDark } = getState();
      const newState = !isDark;
      // store the setting in the browser
      localStorage.setItem("dark", newState ? "dark" : "light");
      setState({ isDark: newState });
    },
    setDark: () => ({ setState }) => {
      setState({ isDark: true });
    },
  },
});

export const useProfile = createHook(ProfileStore);
export const useStocks = createHook(StocksStore);
export const useTheme = createHook(ThemeStore);
