import React from 'react';

const LoginForm = () => {
  return (
    <div className="card shadow-sm p-4 mb-5">
      <h4 className="text-center mb-4">Login to Your Account</h4>
      <form>
        <div className="row mb-3">
          <label htmlFor="loginUsername" className="col-sm-4 col-form-label">Username</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="loginUsername"
              name="username"
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
