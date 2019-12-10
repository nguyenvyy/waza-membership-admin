import Axios from "axios";
import { serverURL } from "../../../constant";

export const loginRequest = user => Axios({
    method: 'POST',
    url: `${serverURL}/admins/login`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    timeout: 30000,
    data: user
})

export const logoutRequest = token => Axios({
    method: 'POST',
    url: `${serverURL}/admins/logout`,
    responseType: 'json',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
    }
})