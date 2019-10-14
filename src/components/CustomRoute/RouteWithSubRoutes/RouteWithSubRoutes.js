import React from 'react';
import { Route } from 'react-router-dom';

export const RouteWithSubRoutes = (
    {
        customRoute: CustomRoute,
        component: Component,
        path,
        routes,
        ...rest
    }) => CustomRoute ? (
        <CustomRoute
            component={Component}
            path={path}
            routes={routes}
            {...rest} />
    ) : (
            <Route
                path={path}
                routes={routes}
                {...rest}
                render={routeProps => <Component {...routeProps} routes={routes} />}
            />
        )
