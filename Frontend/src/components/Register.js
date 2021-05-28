import React, {useState} from "react";
import Axios from "axios";
import { Link, Route } from "react-router-dom";

export default function Register(props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const inputData = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    country: country,
    email: email,
    password: password,
  };

  function getInputData1 (event) {
    setFirstName(event.target.value);
  }

  function getInputData2 (event) {
    setLastName(event.target.value);
  }

  function getInputData3 (event) {
    setAge(event.target.value);
  }

  function getInputData4 (event) {
    setCountry(event.target.value);
  }

  function getInputData5 (event) {
    setEmail(event.target.value);
  }

  function getInputData6 (event) {
    setPassword(event.target.value);
  }

  function createNewUser () {
    console.log(inputData);
    Axios
      .post("/users", inputData)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div style={{
      display: "block",
      gap: "20px",
      borderStyle: "solid",
      border: "10px 10px 10px 10px",
      margin: "10px 10px 10px 10px",
      padding: "10px 10px 10px 10px",
      borderColor: "red",
      }}>
      <h1>Register:</h1>
      <input type="text" placeholder="First name here" onChange={getInputData1} />
      <input type="text" placeholder="Last name here" onChange={getInputData2} />
      <input type="number" placeholder="Age here" onChange={getInputData3} />
      <input type="text" placeholder="Country here" onChange={getInputData4} />
      <input type="email" placeholder="Email here" onChange={getInputData5} />
      <input type="password" placeholder="Password here" onChange={getInputData6} />
      <button onClick={createNewUser}>Register</button>
    </div>
  );
}
