import Axios from "axios";
import { serverURL } from "../../../constant";

export const loginRequest = user => Axios({
    method: 'POST',
    url: `${serverURL}/users/login`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    data: user
})

export const logoutRequest = token => Axios({
    method: 'POST',
    url: `${serverURL}/users/logout`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
    }
})