import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

// Utils
import {getToken} from '../../services/utils/getToken';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        getToken() !== null ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: 'auth',
                state: {from: props.location}
            }}
            />
        )
    )}/>
);

export default PrivateRoute;