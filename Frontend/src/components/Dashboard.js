import React, { useState } from "react";
import Axios from "axios";

export default function Dashboard() {
  function displayArticle(article) {
    article.map((element, index) => {
      return <p key={index}>{element}</p>;
    });
  }

  function fetchArticles(props) {
    Axios.get("http://localhost:5000/articles")
      .then((response) => {
        console.log(response);
        response.data.map((element) => {
          return <div key={element._id}>{displayArticle(element)}</div>;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        borderStyle: "solid",
        border: "30px 30px 30px 30px",
        margin: "10px 10px 10px 10px",
        padding: "10px 10px 10px 10px",
        borderColor: "violet",
      }}
    >
      <h1>Dashboard:</h1>
      <button onChange={fetchArticles}>Get All Articles</button>
    </div>
  );
}
