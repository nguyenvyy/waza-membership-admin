import Axios from "axios"

export const getVouchersFromAPI = (params) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: 'https://dnguyen-combo-manager.herokuapp.com/vouchers',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        params
    }
).then(res => {
    console.log(res)
    return res.data
})