import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputData = {
    email: email,
    password: password,
  };

  function getInputData1 (event) {
    setEmail(event.target.value);
  }

  function getInputData2 (event) {
    setPassword(event.target.value);
  }

  function userLogin () {
    Axios
      .post("http://localhost:5000/login", inputData)
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
      borderColor: "violet",
      }}>
      <h1>Login:</h1>
      <input type="email" placeholder="Email here" onChange={getInputData1} />
      <input type="password" placeholder="Password here" onChange={getInputData2} />
      <button onChange={userLogin}>Login</button>
    </div>
  );
}