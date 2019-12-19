import { SEND_REQUEST_LOGIN, AUTHENTICATION_SUCCEEDED, STOP_REQUEST_LOGIN, LOGOUT } from "./types";
import { loginAPI } from "./services";

export const sendLoginRequest = () => ({ type: SEND_REQUEST_LOGIN })
export const saveUser = user => ({ type: AUTHENTICATION_SUCCEEDED, user })
export const stopLoginRequest = () => ({ type: STOP_REQUEST_LOGIN })
export const logout = () => ({ type: LOGOUT })

// login action
export const requestLogin = user => async dispatch => {
    dispatch(sendLoginRequest())
    const userRes = await loginAPI(user)
    dispatch(stopLoginRequest())
    if(userRes === 400) {
        return userRes
    }
    dispatch(saveUser(userRes))
    return 200;
}

