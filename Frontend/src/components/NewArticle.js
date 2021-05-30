import React, { useState } from "react";
import Axios from "axios";

export default function NewArticle() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const inputData = {
    title: title,
    description: description,
  };

  function getInputData1 (event) {
    setTitle(event.target.value);
  }

  function getInputData2 (event) {
    setDescription(event.target.value);
  }

  function uploadArticle () {
    Axios
      .post("http://localhost:5000/articles", inputData)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  return (
    <div style={{
      borderStyle: "solid",
      border: "30px 30px 30px 30px",
      margin: "10px 10px 10px 10px",
      padding: "10px 10px 10px 10px",
      borderColor: "orange",
      }}>
      <h1>New Article:</h1>
      <input type="text" placeholder="Title here" onChange={getInputData1} />
      <input type="text" placeholder="Description here" onChange={getInputData2} style={{height: "300px"}} />
      <button onChange={uploadArticle}>Create New Article</button>
    </div>
  );
}