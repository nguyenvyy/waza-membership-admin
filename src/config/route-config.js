import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'
import ActiveVoucher from '../components/Voucher/ActiveVoucher/ActiveVoucher'
import ManageVoucher from '../components/Voucher/ManageVoucher/ManageVoucher'
import CreateVoucher from '../components/Voucher/CreateVoucher/CreateVoucher'

const Admin = lazy(() => import('../components/Admin/Admin'))
const Login = lazy(() => import('../components/Login/Login'))
const Combo = lazy(() => import('../components/Combo/Combo'))
const ActiveComboContainer = lazy(() => import('../redux/container/ActiveComboContainer'))
const DetailComboContainer = lazy(() => import('../redux/container/DetailComboContainer'))
const EditComboContainer = lazy(() => import('../redux/container/EditComboContainer'))
const Voucher = lazy(() => import('../components/Voucher/Voucher'))
const ManageComboContainer = lazy(() => import('../redux/container/ManageComboContainer'))
const Policy = lazy(() => import('../components/Policy/Policy'))

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
                    },
                    {
                        path: '/a/combo/manage',
                        component: ManageComboContainer
                    },
                    {
                        path: '/a/combo/detail/:id',
                        component: DetailComboContainer
                    },
                    {
                        path: '/a/combo/edit/:id',
                        component: EditComboContainer
                    }
                ]
            },
            {
                path: '/a/voucher',
                component: Voucher,
                routes: [
                    {
                        path: '/a/voucher/active',
                        component: ActiveVoucher
                    },
                    {
                        path: '/a/voucher/manage',
                        component: ManageVoucher
                    },
                    {
                        path: '/a/voucher/create',
                        component: CreateVoucher
                    }
                ]
            },
            {
                path: '/a/policy',
                component: Policy
            }
        ]
    },
    {
        path: '/login',
        component: Login,
    },
]