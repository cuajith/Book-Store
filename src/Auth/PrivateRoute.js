import React from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const PrivateRoute = ({component: Component, ...rest}) => {
    const history = useNavigate();
    const token = localStorage.getItem("auth");
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            (token) ?
                <Component {...props} />
            : history(<Login/>)
        )} />
    );
};

export default PrivateRoute;