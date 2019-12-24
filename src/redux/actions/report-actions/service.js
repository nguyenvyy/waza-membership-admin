import Axios from "axios"
import { serverURL } from "../../../constant"
export const comboSalesDaily = (comboId,start,end, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/report/combo/sales/daily`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            comboId: comboId,
            start: start,
            end: end
        }
    }
).then(res => {
    return res.data
})

export const comboSalesMonthly = (comboId,start,end, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/report/combo/sales/monthly`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            comboId: comboId,
            start: start,
            end: end
        }
    }
).then(res => {
    return res.data
})

export const comboSalesYearly = (comboId,start,end, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/report/combo/sales/yearly`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            comboId: comboId,
            start: start,
            end: end
        }
    }
).then(res => {
    return res.data
})


export const comboRevenueDaily = (comboId,start,end, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/report/combo/revenue/daily`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            comboId: comboId,
            start: start,
            end: end
        }
    }
).then(res => {
    return res.data
})

export const comboRevenueMonthly = (comboId,start,end, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/report/combo/revenue/monthly`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            comboId: comboId,
            start: start,
            end: end
        }
    }
).then(res => {
    return res.data
})

export const comboRevenueYearly = (comboId,start,end, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/report/combo/revenue/yearly`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            comboId: comboId,
            start: start,
            end: end
        }
    }
).then(res => {
    return res.data
})