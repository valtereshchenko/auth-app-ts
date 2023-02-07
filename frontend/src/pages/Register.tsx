import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function submitHandler(e: any) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    };
    fetch("/users/register", requestOptions).then((response) => {
      if (response.status === 200) {
        navigate("/login", { replace: true });
      }
    });
  }

  return (
    <form className="form-control">
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button variant="contained" onClick={submitHandler}>
        Add me!
      </Button>
    </form>
  );
};

export default Register;
