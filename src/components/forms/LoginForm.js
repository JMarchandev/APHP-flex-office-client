import React from "react";

const LoginForm = () => {
  return (
    <div className="col-md-6 login-form-1">
      <h3>Login</h3>
      <form>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email" value=""/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" value=""/>
        </div>
        <div className="form-group ">
          <input type="submit" className="btnSubmit bg-primary" value="Login"/>
        </div>
        <div className="form-group">
          <a href="#" className="ForgetPwd">Forget Password?</a>
        </div>
      </form>
    </div>
  )
}
export default LoginForm;