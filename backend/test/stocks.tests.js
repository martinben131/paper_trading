const assert = require("assert");

const {
  createLink,
  formatDate,
  shortenDate,
} = require("../helperFunctions/stockHelper");

describe("News Article URL Test", () => {
  it("should get news article link", () => {
    const title =
      "Berkshire Hathaway likely sold $4B of Apple stock in Q3 - Business Insider";
    const id = "https://seekingalpha.com/MarketCurrent:3635569";
    const link_created = createLink(title, id);

    const link_actual =
      "https://seekingalpha.com/news/3635569Berkshire-Hathaway-likely-sold-B-of-Apple-stock-in-Q--Business-Insider";

    assert.strictEqual(link_actual, link_created);
  });
});

describe("Date Tests", () => {
  it("should format date", () => {
    const date = new Date(2020, 0, 1);
    const date_formatted = formatDate(date);

    assert.strictEqual(date_formatted, "2020-1-1");
  });
  it("should shorten date", () => {
    const date = "Thu, 29 Oct 2020 16:48:38 -0400";
    const date_shortened = shortenDate(date);

    assert.strictEqual(date_shortened, "Thu, 29 Oct 2020 16:48:38");
  });
});
