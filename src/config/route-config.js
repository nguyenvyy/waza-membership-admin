import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

import { PrivateRoute } from '../routes/PrivateRoute'

const Admin = lazy(() => import('../components/Admin/Admin'))
const Login = lazy(() => import('../components/Login/Login'))
const Combo = lazy(() => import('../components/Combo/Combo'))
const ActiveCombo = lazy(() => import('../components/Combo/ActiveCombo/ActiveCombo'))

export const routes = [
    {
        path: '/',
        customRoute: Redirect,
        to: '/a',
        exact: true,
    },
    {
        path: '/a',
        component: Admin,
        customRoute: PrivateRoute,
        routes: [
            {
                path: '/a/combo',
                component: Combo,
                routes: [
                    {
                        from: '/a/combo',
                        customRoute: Redirect,
                        to: '/a/combo/active',
                        exact: true,
                    },
                    {
                        path: '/a/combo/active',
                        component: ActiveCombo
                    }
                ]
            },
            
        ]
    },
    {
        path: '/login',
        component: Login,
    }
]