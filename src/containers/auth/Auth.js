import React from "react";

// Imports
import "./auth.css"
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

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