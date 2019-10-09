import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => {
    const fakeAuthen = true;
    return (
        <Route 
            {...rest}
            render={routeProps => fakeAuthen ? (
                <Component {...routeProps} />
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