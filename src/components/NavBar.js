import React from "react";
import Routes from "../../services/Routes";

// Imports
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const NavBar = () => {

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Flex Office APHP</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/planning">Planning</Link>
                </li>
              </ul>
              <div className="text-white">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/auth">Login / Register</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <Routes/>
      </div>
    </Router>
  )
}

export default NavBar;