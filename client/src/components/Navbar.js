import React from 'react';

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
                <a className="nav-link active" href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
