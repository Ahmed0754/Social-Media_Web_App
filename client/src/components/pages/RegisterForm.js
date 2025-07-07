import React, { useState } from 'react';
import { fetchData } from "../../main.js";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Passwords must match
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const data = await fetchData('/user/register', {
        username: user.username,
        password: user.password
      }, 'POST');

      if (!data.message) {
        alert("Registration successful! Please log in.");
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Registration failed.");
      console.error(error);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-5">
      <h4 className="text-center mb-4">Register</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
