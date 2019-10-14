import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'


import { PageLoading } from '../PageLoading/PageLoading'
import { RouteWithSubRoutes } from '../CustomRoute/RouteWithSubRoutes/RouteWithSubRoutes'

const Combo = ({routes}) => {

    return (
        <div className="combo">
            <Suspense fallback={<PageLoading />}>
                <Switch>
                    {routes.map((route, index) => (
                        <RouteWithSubRoutes key={index} {...route} />
                    ))}
                </Switch>
            </Suspense>
        </div>
    )
}

export default Combo