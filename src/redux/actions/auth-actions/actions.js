import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "./types";
import { loginRequest, logoutRequest } from "./services";

export const login = () => ({ type: LOGIN })
export const saveUser = user => ({ type: AUTHENTICATION_SUCCEEDED, user })
export const stopLogin = () => ({ type: STOP_LOGIN })
export const logout = () => ({ type: LOGOUT })

export const requestLogin = user => dispatch => {
    dispatch(login())
    return loginRequest(user)
        .then(res => {
            dispatch(stopLogin())
            dispatch(saveUser(res.data))
            return res.status
        })
        .catch(err => {
            dispatch(stopLogin())
            if (err.response !== undefined) {
                return err.response.status
            }
            return undefined
        })
}

export const requestLogout = () => (dispatch, getState) => {
    const token = getState().user.info.token;
    return logoutRequest(token)
        .then(res => {
            dispatch(logout())
            return res.status
        })
        .catch(err => {
            dispatch(logout())
            if (err.response !== undefined) {
                return err.response.status
            }
            return undefined
        })
}