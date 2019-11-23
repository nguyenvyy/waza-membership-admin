import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "../actions/auth-actions/types"

const initState = {
    info: {
        isDeleted: false,
        _id: '5dac3ad4645b72001790ce47',
        username: 'admin',
        createdAt: '2019-10-20T10:45:40.205Z',
        updatedAt: '2019-11-23T00:24:12.182Z',
        __v: 255,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzQ0Njg2NTJ9.ZtiHsJ6YFBMHo1pROaVsw8snmQRQDozJOEGsFUlUcgo'
    },
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
