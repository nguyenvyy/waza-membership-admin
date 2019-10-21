import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "./types";
import { loginRequest } from "./services";

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