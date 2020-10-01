import React from "react";

const RegisterForm = () => {
  return (
    <div className="col-md-6 login-form-2 bg-primary">
      <h3>Register</h3>
      <form>
        <div className="form-group d-flex">
          <input type="text" className="form-control" name="userName" placeholder="Username" value=""/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" name="email" placeholder="Email" value=""/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" name="password" placeholder="Password" value=""/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" name="verifyPassword" placeholder="Verify Password" value=""/>
        </div>
        <div className="form-group">
          <input type="submit" className="btnSubmit" value="Send"/>
        </div>
      </form>
    </div>
  )
}
export default RegisterForm;