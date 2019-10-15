import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../components/CustomRoute/PrivateRoute/PrivateRoute';
// import { PrivateRoute } from "../components/CustomRoute/PrivateRoute/PrivateRoute";

const Admin = lazy(() => import('../components/Admin/Admin'))
const Login = lazy(() => import('../components/Login/Login'))

const Combo = lazy(() => import('../components/Combo/Combo'))
const ActiveComboContainer = lazy(() => import('../redux/container/ActiveComboContainer'))

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
                        component: ActiveComboContainer
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