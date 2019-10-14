import React from 'react';
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); 
    return (
        <Route 
            {...rest}
            render={routeProps => isLoggedIn ? (
                <Component  {...routeProps} />
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