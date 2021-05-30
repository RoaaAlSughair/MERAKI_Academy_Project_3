import { findByLabelText } from "@testing-library/dom";
import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div style={{ 
        display: "flex",
        gap: "20px",
        borderStyle: "solid",
        border: "30px 30px 30px 30px",
        margin: "10px 10px 10px 10px",
        padding: "10px 10px 10px 10px",
        borderColor: "blue"}}>
      {<Link to="/users">Register</Link>}
      {<Link to="/login">Login</Link>}
      {<Link to="/dashboard">Dashboard</Link>}
      {<Link to="/newArticle">New Article</Link>}
    </div>
  );
}
