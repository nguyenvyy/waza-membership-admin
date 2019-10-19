import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'

import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes'
import { PageLoading } from '../common/PageLoading/PageLoading'

const Voucher = ({routes}) => {

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

export default Voucher