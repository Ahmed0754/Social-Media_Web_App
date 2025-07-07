import React from 'react';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;
  const navigate = useNavigate();

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    fetchData("/user/login",
      {
        username,
        password
      },
      "POST"
    )
      .then((data) => {
        if (!data.message) {
          localStorage.setItem("user", JSON.stringify(data));
          console.log("Login successful:", data);
          navigate("/profile");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("❌ Login error:", error); // ADD THIS
        alert("An error occurred during login.");
      });
  };

  return (
    <div className="card shadow-sm p-4 mb-5">
      <h4 className="text-center mb-4">Login to Your Account</h4>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <label htmlFor="loginUsername" className="col-sm-4 col-form-label">Username</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="loginUsername"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="loginPassword" className="col-sm-4 col-form-label">Password</label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
