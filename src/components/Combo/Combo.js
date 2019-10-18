import React, { Suspense, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes'
import { PageLoading } from '../common/PageLoading/PageLoading'
import { featchCombos } from '../../redux/actions/combo-actions/actions'

const Combo = ({routes, featchCombos}) => {
    useEffect(() =>{
        featchCombos()
    }, [featchCombos])
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

export default connect(undefined, {featchCombos})(Combo)