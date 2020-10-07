import React from "react";
import axios from "axios"
import {getToken} from "../../../services/utils/getToken"
import {pushToken} from "../../../services/utils/pushToken";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      successMessage: null,
      isLoading: true,
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
      users: []
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({error: "", successMessage: ""})

    const sendData = {
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      verifyPassword: this.state.verifyPassword
    }

    if (sendData.password === sendData.verifyPassword) {
      axios
        .post('http://localhost:1337/auth/local/register', {
          email: sendData.email,
          username: sendData.userName,
          password: sendData.password
        })
        .then(response => {
          pushToken(response.data.jwt)
          this.setState({successMessage: "You account is created ", isLoading: false})
        })
        .catch(error => {
          this.setState({error: error.response.data.data[0].messages[0].message});
        });

      this.setState({
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
      })

    } else if (sendData.password !== sendData.verifyPassword) {
      this.setState({error: "Passwords must be identical", isLoading: false, password: "", verifyPassword: ""})
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  render() {
    return (
      <div className="col-md-6 login-form-2 bg-primary">
        <h3>Register</h3>
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="form-group d-flex">
            <input onChange={event => this.handleChange(event)} type="text" className="form-control" name="username"
                   placeholder="Username" value={this.state.userName}/>
          </div>
          <div className="form-group">
            <input onChange={event => this.handleChange(event)} type="email" className="form-control" name="email"
                   placeholder="Email" value={this.state.email}/>
          </div>
          <div className="form-group">
            <input onChange={event => this.handleChange(event)} type="password" className="form-control"
                   name="password"
                   placeholder="Password" value={this.state.password}/>
          </div>
          <div className="form-group">
            <input onChange={event => this.handleChange(event)} type="password" className="form-control"
                   name="verifyPassword" placeholder="Verify Password"
                   value={this.state.verifyPassword}/>
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Send"/>
          </div>
          {this.state.error ?
            <div className="alert alert-danger mx-5 " role="alert">
              {this.state.error}
            </div>
            : null
          }
          {this.state.successMessage ?
            <div className="alert alert-success" role="alert">
              {this.state.successMessage}
            </div>
            : null
          }
        </form>
      </div>
    );
  }
}

export default RegisterForm;