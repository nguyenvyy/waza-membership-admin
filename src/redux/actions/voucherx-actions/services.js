import Axios from "axios"
import { serverURL } from "../../../constant"

export const getVouchersFromAPI = (params, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/vouchers/active?search=category:buy`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params,
    }
).then(res => {
    return res.data
})