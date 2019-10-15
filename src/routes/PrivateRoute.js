import React from 'react';
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, routes, ...rest}) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); 
    return (
        <Route 
            {...rest}
            render={routeProps => isLoggedIn ? (
                <Component  {...routeProps} routes={routes} />
            ): (
                <Redirect  
                    to={{
                        pathname: '/login',
                        state: {from : routeProps.location}
                    }}
                />
            )}
        />
    )
}