import React from "react";

// Imports
import "./auth.css"
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";

const Auth = () => {
  return(
    <div className="container login-container">
      <div className="row">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}

export default Auth;