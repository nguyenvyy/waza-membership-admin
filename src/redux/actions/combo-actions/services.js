import Axios from "axios";


export const getComboFromAPI = (params) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: 'https://dnguyen-combo-manager.herokuapp.com/combos',
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

export const PostComboToAPI = (data) => Axios(
    {
        method: 'POST',
        responseType: "json",
        url: 'https://dnguyen-combo-manager.herokuapp.com/combos/new',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data
    }
).then(res => {
    return { data: res.data, status: res.status}
})

export const PathComboToAPI = (data) => Axios(
    {
        method: 'POST',
        responseType: "json",
        url: `https://dnguyen-combo-manager.herokuapp.com//combos/edit/${data._id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data
    }
).then(res => {
    return { data: res.data, status: res.status}
})