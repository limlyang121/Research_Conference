import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginUser } from "./Axios";
import { storeTokenData } from "./Axios";


import "./Login.css";
import LoginSessionCheck from "./LoginSessionCheck";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    try {
      let tokenData = await LoginUser(data)
      storeTokenData(tokenData)
      navigate("/home")
    } catch (error) {
      const errorMessage = error.response.data.message
      setErrorMessages(errorMessage)
    }

  };

  const renderErrorMessage = () => {
    return (
      <div className="error">
        {errorMessages}
      </div>
    );
  };
  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {renderErrorMessage()}

        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
        </div>

        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>

      </form>
    </div>
  );

  return (
    <div className="app">
      <LoginSessionCheck />

      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;