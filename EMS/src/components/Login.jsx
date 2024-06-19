import React from "react";
import "../styles/Login.css";



const Login = () => {
  return (
    <>
      <div id="header">
        <nav>
          <div id="logo-img">
            <img src="../Images/mainlogo.png" alt="logo" />
          </div>
        </nav>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded border loginForm">
          <h2 className="center-align text-white">LogIn As</h2>
          <div className="d-flex justify-content-between mt-5 mb-2 buttonGroup">
            <button type="button" className="btn btn-primary">
              <a className="buttonlink" href="loginforma">
                Admin
              </a>
            </button>
            <button type="button" className="btn btn-danger">
              <a className="buttonlink" href="loginforme">
                Employee
              </a>
            </button>
            <button type="button" className="btn btn-success">
              <a className="buttonlink" href="loginformc">
                Client
              </a>
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-secondary">
              <a className="buttonlink" href="/">
                BACK
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
