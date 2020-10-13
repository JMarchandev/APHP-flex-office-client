import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "../containers/PrivateRoute/PrivateRoute"

//Imports
import Home from "../containers/home/Home";
import Profile from "../containers/profile/Profile";
import Booking from "../containers/booking/Booking";
import Planning from '../components/myPlanning/Planning';
import Auth from "../containers/auth/Auth";
import ErrorPage from "../containers/404/ErrorPage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home}/>
      <PrivateRoute exact path="/profile" component={Profile}/>
      <PrivateRoute exact path="/booking" component={Booking}/>
      <PrivateRoute exact path="/myplanning" component={Planning}/>
      <Route exact path="/auth" component={Auth}/>
      <Route path="" component={ErrorPage}/>
    </Switch>
  )
}

export default Routes;