import React from 'react';
import {Outlet, Link} from "react-router-dom"

const Navbar = () => {
  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark px-4 py-2 rounded-bottom">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">Social Media App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet/>
    </header>
  );
};

export default Navbar;
