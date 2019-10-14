import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../components/CustomRoute/PrivateRoute/PrivateRoute';
// import { PrivateRoute } from "../components/CustomRoute/PrivateRoute/PrivateRoute";

const Admin = lazy(() => import('../components/Admin/Admin'));
const Login = lazy(() => import('../components/Login/Login'));

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
        items: [
        ]
    },
    {
        path: '/login',
        component: Login,
    }
]