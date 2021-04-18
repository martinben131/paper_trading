import React from "react";
import { Spinner } from "@blueprintjs/core";
import { useNews } from "../store";
import { useParams } from "react-router-dom";

import "./index.css";

function News() {
  //hooks
  const [news, actions] = useNews();
  const params = useParams();

  //get data if don't have already
  if (news.code !== params["code"]) {
    actions.fetchData(params["code"]);
  }

  if (news.loading) {
    return (
      <>
        <div className="newsTitle">News Articles</div>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <div className="newsTitle">News Articles</div>
      {news.data.map((article) => {
        return (
          <div className="articleSection" key={article.pubDate}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <div className="newsArticle">{article.title}</div>
            </a>
            <div className="articleDate">{article.pubDate}</div>
          </div>
        );
      })}
    </>
  );
}

export default News;
