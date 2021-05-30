import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewArticle from "./components/NewArticle";
import "./App.css";

export default function App() {
  return (
    <div style={{borderStyle: "solid", border: "30px 30px 30px 30px", borderColor: "green"}}>
      <Navigation />
      <Route exact path="/users" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/newArticle" component={NewArticle} />
    </div>
  );
}
