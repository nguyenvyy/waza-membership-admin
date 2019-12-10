import Axios from "axios"
import { serverURL, RankURL } from "../../../constant"
export const getVouchersFromAPI = (params, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/vouchers/active?search=category:buy`,
        timeout: 30000,
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

export const getVouchersGiftAPI = (params, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/vouchers/active?search=category:gift`,
        timeout: 30000,
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


export const createVoucherToAPI = (data, token) => Axios(
    {
        method: 'POST',
        responseType: "json",
        url: `${serverURL}/vouchers/new`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data
    }
)

export const getVoucher = (token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/vouchers`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            page: 0,
            limit: 9999
        }
    }
)

export const getVoucherActive = (token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/vouchers/active`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            page: 0,
            limit: 9999
        }
    }
)

export const getVoucherById = (id, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/vouchers/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
)

export const editVoucherByID = (data, id, token) => Axios(
    {
        method: 'PATCH',
        responseType: "json",
        url: `${serverURL}/vouchers/edit/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data
    }
)

export const deleteVoucherByID = (id, token) => Axios(
    {
        method: 'patch',
        responseType: "json",
        url: `${serverURL}/vouchers/del/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getAllRank = (token) => Axios(
    {
        method: 'get',
        responseType: "json",
        url: `${RankURL}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
)



