import Axios from "axios";
import { serverURL } from "../../../constant";

export const loginRequest = user => Axios({
    method: 'POST',
    url: `${serverURL}/admin/login`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    data: user
})

export const logoutRequest = token => Axios({
    method: 'POST',
    url: `${serverURL}/admin/logout`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
    }
})