import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'

import './Combo.scss'
import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes'
import { PageLoading } from '../common/PageLoading/PageLoading'

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