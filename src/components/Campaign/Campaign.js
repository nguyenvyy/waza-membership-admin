import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { PageLoading } from '../common/PageLoading/PageLoading'
import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes'

const Campaign = ({ routes = [] }) => {

    return (
        <div className="campaign">
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
export default Campaign