import axios from "axios";
import { createStore, createHook } from "react-sweet-state";

// This is the store for fetching individual stock data
const StockStore = createStore({
  initialState: {
    code: "",
    name: "",
    prices: [{ date: 0, close: 0 }],
    priceChange: 0,
    priceCurr: 0,
    loading: false,
  },
  actions: {
    fetchData: (code) => async ({ setState }) => {
      setState({ code: code, loading: true });
      const res = await axios.post("/stocks/prices", { code });
      setState({
        code: res.data.code,
        name: res.data.name,
        prices: res.data.prices,
        priceChange: res.data.priceChange,
        priceCurr: res.data.priceCurr,
        loading: false,
      });
    },
  },
});

// This is the store for fetching news stories for a stock
const NewsStore = createStore({
  initialState: {
    data: [{ title: "", link: "", pubDate: "" }],
    code: "",
    loading: false,
  },
  actions: {
    fetchData: (code) => async ({ setState }) => {
      setState({ code: code, loading: true });
      const res = await axios.post("/stocks/news", { code: code });
      setState({ data: res.data, loading: false });
    },
  },
});

export const useData = createHook(StockStore);
export const useNews = createHook(NewsStore);
