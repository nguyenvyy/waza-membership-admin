import Axios from 'axios'

export const getAllVouchers = (token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `http://localhost:4004/API/vouchers`,
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
        url: `http://localhost:4005/vouchers/${id}`,
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
        url: `http://localhost:4005/vouchers/edit/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data
    }
)

export const getAllRank = () => Axios(
    {
        method: 'get',
        responseType: "json",
        url: `http://localhost:4006/API/Rank/GetAllRank`
    }
)

