import { SEND_REQUEST_LOGIN, AUTHENTICATION_SUCCEEDED, STOP_REQUEST_LOGIN, LOGOUT } from "../actions/auth-actions/types"

const initState = {
    info: null,
    isLoggedIn: false,
    isLoadingUser: false,
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SEND_REQUEST_LOGIN:
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
        case STOP_REQUEST_LOGIN:
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
