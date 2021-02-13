import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Comp, ...rest }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    return (
        <Route {...rest} component={({match}) => (
            token ?
            <Comp match={match}/>
            : <Redirect to='/'/>
        )}/>
    );
};

export default PrivateRoute;