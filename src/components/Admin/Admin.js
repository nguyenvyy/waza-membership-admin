import React, { Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom'

import './Admin.scss'
import { NavBar } from '../NavBar/NavBar';
import { PageLoading } from '../common/PageLoading/PageLoading';
import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes';
import moment from 'moment';

const Admin = ({ routes = [], history }) => {
    useEffect(() => {
        // reload page at 23h59p59s
        const endDay = moment().endOf('day').valueOf()
        const interval = setInterval(() => {
            const curr = Date.now()
            if(curr === endDay) {
                history.push('/a')
                console.log('reload')
            }
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const navWidth = {
        maxWidth: {
            minWidth: '200px',
            maxWidth: '200px',
            width: '200px'
        },
        minWidth: {
            minWidth: '50px',
            maxWidth: '50px',
            width: '50px'
        }
    }

    return (
        <div className="d-flex container-full">
            <NavBar {...navWidth} />
            <div className="views">
            <Suspense fallback={<PageLoading />}>
                <Switch>
                    {routes.map((route, index) => (
                        <RouteWithSubRoutes key={index} {...route} />
                    ))}
                </Switch>
            </Suspense>
            </div>
        </div>
    )
}

export default Admin;