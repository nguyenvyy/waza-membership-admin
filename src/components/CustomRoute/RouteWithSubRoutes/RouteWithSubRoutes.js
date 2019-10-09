import React from 'react';
import { Route } from 'react-router-dom';

export const RouteWithSubRoutes = (
    {
        customRoute: CustomRoute, 
        component: Componet,
        path, 
        routes,
        ...rest
    }) => CustomRoute ? (
        <CustomRoute 
            path={path} 
            routes={routes} 
            {...rest} />
    ) : (
        <Route 
            path={path} 
            routes={routes}
            render={routeProps => <Componet {...routeProps} routes={routes} />} 
            {...rest}   />
    )
