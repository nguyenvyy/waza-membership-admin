import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "../actions/auth-actions/types"

const initState = {
    user: null,
    isLoggedIn: false,
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
                user: action.user,
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