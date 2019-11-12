import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "../actions/auth-actions/types"

const initState = {
    info: null,
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