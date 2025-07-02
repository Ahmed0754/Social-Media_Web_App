import React from 'react';

const RegisterForm = () => {
  return (
    <div className="card shadow-sm p-4">
      <h4 className="text-center mb-4">Create an Account</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="registerUsername" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="registerUsername"
            name="username"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="password2"
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-outline-primary fw-bold">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
