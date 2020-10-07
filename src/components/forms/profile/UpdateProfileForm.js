import React from "react";
import axios from "axios";
import qs from "querystring"
import {getToken} from "../../../services/utils/getToken";

class updateProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      successMessage: null,
      isLoading: true,
      id: "",
      aph: "",
      username: "",
      firstName: "",
      lastName: "",
      email: ""
    };
  }

  getCurrentUser = () => {
    console.log(this.state.user)
    this.setState({isLoading: true});
    return axios.get(
      `http://localhost:1337/users/me`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    ).then(result => {
      this.setState({
        id: result.data.id,
        aph: result.data.aph || "",
        username: result.data.username,
        firstName: result.data.firstName || "",
        lastName: result.data.lastName || "",
        email: result.data.email,
        isLoading: false,
        error: false
      })
    }).catch(error => {
      this.setState({
        error: `${error}`,
        isLoading: false
      });
    })
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault()

    const requestBody = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }

    const config = {
      headers:
        {'Authorization': `Bearer ${getToken()}`}
    }
    axios.put(`http://localhost:1337/users/${this.state.id}`, qs.stringify(requestBody), config)
      .then(response => {
        console.log(response)
        this.setState({
          isLoading: false,
          error: false
        })
      })
      .catch(error => {
        this.setState({
          error: `${error}`,
          isLoading: false
        });
      })
  }

  componentDidMount() {
    this.getCurrentUser();
  }


  render() {
    console.log(this.state)
    const {isLoading, error} = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="my-3">
        {error ?
          <div className="alert alert-danger d-flex" role="alert">
            <p>{this.state.error}</p>
          </div>
          : null
        }
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="d-flex justify-content-between">
            <div className="form-group w-50 mr-2">
              <label>APH</label>
              <input type="text" name="email" disabled value={this.state.aph} className="form-control"/>
            </div>
            <div className="form-group w-50 ml-2">
              <label>Username</label>
              <input type="text" name="username" disabled value={this.state.username}
                     className="form-control"/>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-group w-50 mr-2">
              <label>Nom de famille</label>
              <input type="text" name="firstName" onChange={event => this.handleChange(event)}
                     value={this.state.firstName}
                     className="form-control"/>
            </div>
            <div className="form-group w-50 ml-2">
              <label>Prénom</label>
              <input type="text" name="lastName" onChange={event => this.handleChange(event)}
                     value={this.state.lastName} className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label>Adresse Email</label>
            <input type="email" name="email" disabled value={this.state.email} className="form-control"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default updateProfileForm;