import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "./types";
import { loginRequest } from "./services";

export const requestLogin = () => ({type: LOGIN})
export const saveUser = user => ({type: AUTHENTICATION_SUCCEEDED, user})
export const stopLogin = () => ({type: STOP_LOGIN})
export const logout = () => ({type: LOGOUT})

export const login = user => dispatch => {
    dispatch(requestLogin())
    loginRequest(user)
        .then(res => {
            saveUser(res.data)
            stopLogin()
            return res
        })
        .catch(err => {
            stopLogin()
            return err
        })
}