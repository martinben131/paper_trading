// options for the chart including the range selectors and the point selectors
export const options = (chartData, code: string) => {
  return {
    rangeSelector: {
      enabled: true,
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    scrollbar: { enabled: false },
    series: [
      {
        data: chartData,
        name: code,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };
};
