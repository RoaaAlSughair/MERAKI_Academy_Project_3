import React, { useState } from "react";
import Axios from "axios";

export default function Register() {
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

  function getInputData1(event) {
    setFirstName(event.target.value);
  }

  function getInputData2(event) {
    setLastName(event.target.value);
  }

  function getInputData3(event) {
    setAge(event.target.value);
  }

  function getInputData4(event) {
    setCountry(event.target.value);
  }

  function getInputData5(event) {
    setEmail(event.target.value);
  }

  function getInputData6(event) {
    setPassword(event.target.value);
  }

  function createNewUser() {
    console.log(inputData);
    Axios
      .post("http://localhost:5000/users", inputData)
      .then((response) => {
        console.log(response);
        return (
          <div>
            <p>User has been created successfully</p>
          </div>
        );
      })
      .catch((error) => {
        console.log(error);
        return (
          <div>
            <p>Error happened while register, please try again</p>
          </div>
        );
      });
  }

  return (
    <div
      style={{
        borderStyle: "solid",
        border: "10px 10px 10px 10px",
        margin: "10px 10px 10px 10px",
        padding: "10px 10px 10px 10px",
        borderColor: "red",
      }}
    >
      <h1>Register:</h1>
      <input
        type="text"
        placeholder="First name here"
        onChange={getInputData1}
      />
      <input
        type="text"
        placeholder="Last name here"
        onChange={getInputData2}
      />
      <input type="number" placeholder="Age here" onChange={getInputData3} />
      <input type="text" placeholder="Country here" onChange={getInputData4} />
      <input type="email" placeholder="Email here" onChange={getInputData5} />
      <input type="password" placeholder="Password here" onChange={getInputData6} />
      <button onClick={createNewUser} >Register</button>
    </div>
  );
}
