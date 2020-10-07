import React from "react";
import axios from "axios";

import {pushToken} from "../../../services/utils/pushToken";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      successMessage: null,
      isLoading: true,
      email: "",
      password: "",
      users: []
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({error: "", successMessage: ""})

    const sendData = {
      email: this.state.email,
      password: this.state.password,
    }

    axios
      .post('http://localhost:1337/auth/local', {
        identifier: sendData.email,
        password: sendData.password
      })
      .then(response => {
        pushToken(response.data.jwt)
        window.location.href = '/profile'
      })
      .catch(error => {
        this.setState({error});
      });
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="col-md-6 login-form-1">
        <h3>Login</h3>
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="form-group">
            <input type="email" onChange={event => this.handleChange(event)} name="email" className="form-control"
                   placeholder="Email" value={this.state.email}/>
          </div>
          <div className="form-group">
            <input type="password" onChange={event => this.handleChange(event)} name="password" className="form-control"
                   placeholder="Password" value={this.state.password}/>
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit bg-primary" value="Login"/>
          </div>
          <div className="form-group">
            <a href="#" className="ForgetPwd">Forget Password?</a>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;