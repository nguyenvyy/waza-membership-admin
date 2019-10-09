import { lazy } from 'react'

// import { PrivateRoute } from "../components/CustomRoute/PrivateRoute/PrivateRoute";

const Admin = lazy(() => import('../components/Admin/Admin'));
const Login = lazy(() => import('../components/Login/Login'));

export const routes = [
    {
        path: '/',
        component: Admin,
        exact: true
        // customRoute: PrivateRoute
    },
    {
        path: '/login',
        component: Login
    }
]