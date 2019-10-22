import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "./types";
import { loginRequest, logoutRequest } from "./services";

export const login = () => ({type: LOGIN})
export const saveUser = user => ({type: AUTHENTICATION_SUCCEEDED, user})
export const stopLogin = () => ({type: STOP_LOGIN})
export const logout = () => ({type: LOGOUT})

export const requestLogin = user => dispatch => {
    dispatch(login())
    return loginRequest(user)
        .then(res => {
            dispatch(saveUser(res.data))
            dispatch(stopLogin())
            return res
        })
        .catch(err => {
            dispatch(stopLogin())
            return err.response
        })
}

export const requestLogout = () => (dispatch, getState) => {
    const user = getState().user.info;
    const token = user && user.token
    return logoutRequest(token)
        .then(res => {
            dispatch(logout())
            return res
        })
        .catch(err => {
            dispatch(logout())
            return err
        })
}