import React from "react";
import { Link, Route } from "react-router-dom";

export default function Login() {
  return (
    <div style={{
      borderStyle: "solid",
      border: "30px 30px 30px 30px",
      margin: "10px 10px 10px 10px",
      padding: "10px 10px 10px 10px",
      borderColor: "violet",
      }}>
      <h1>Login:</h1>
      <input type="email" placeholder="Email here" />
      <input type="password" placeholder="Password here" />
      <button>Login</button>
    </div>
  );
}
