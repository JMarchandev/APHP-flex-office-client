import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";

import {getCurrentUser} from "../../services/api/users/getCurrentUser";

let status;

getCurrentUser().then(response => {
    status = response.data.status
}).catch(error => {
    return null;
})

const AdminRoute = ({component: Component, ...rest}) => (
    //console.log(status)
    <Route {...rest} render={props =>

        status !== "simpleUser" ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: 'profile',
                state: {from: props.location}
            }}
            />
        )
    }/>
)

export default AdminRoute