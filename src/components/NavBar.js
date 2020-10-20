import React from "react";
import Routes from "../services/Routes";

// Imports
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { getToken } from "../services/utils/getToken";
import { destroyToken } from "../services/utils/destroyToken";

const NavBar = () => {

  const handleDisconnectClick = (event) => {
    event.preventDefault()
    destroyToken()

    window.location = "http://localhost:3000/auth"
  }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Flex Office APHP</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/booking">Reserver</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/myplanning">Mon Planning</Link>
                </li>
              </ul>
              <div className="text-white">
                {getToken() ?
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/admin">Admin</Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" onClick={event => handleDisconnectClick(event)} href="#">Disconnect</a>
                    </li>
                  </ul>
                  : <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/auth">Login / Register</Link>
                    </li>
                  </ul>
                }
              </div>
            </div>
          </div>
        </nav>
        <Routes />
      </div>
    </Router>
  )
}

export default NavBar;