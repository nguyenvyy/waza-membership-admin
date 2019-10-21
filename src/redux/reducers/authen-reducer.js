import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "../actions/auth-actions/types"
const user = {
    isDeleted: false,
    _id: '5dada510e10f660017c254df',
    username: 'nguyenvy',
    createdAt: '2019-10-21T12:31:12.650Z',
    updatedAt: '2019-10-21T16:48:15.543Z',
    __v: 33,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFkYTUxMGUxMGY2NjAwMTdjMjU0ZGYiLCJpYXQiOjE1NzE2Nzc3Njd9.fZ4E21dIvgMDq15ehxfi07bCujGtQGtgEoM813UNq50'
}

const initState = {
    info: user,
    isLoggedIn: true,
    isLoadingUser: false,
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoadingUser: true
            }
        case AUTHENTICATION_SUCCEEDED:
            return {
                ...state,
                info: {
                    ...action.user.user,
                    token: action.user.token
                },
                isLoggedIn: true,
            }
        case STOP_LOGIN:
            return {
                ...state,
                isLoadingUser: false
            }
        case LOGOUT:
            return initState
        default:
            return state
    }
} 