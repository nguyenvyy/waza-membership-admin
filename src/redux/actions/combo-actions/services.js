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
)

export const getDetailComboFromAPI = (_id) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `https://dnguyen-combo-manager.herokuapp.com/combos/${_id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }
)

export const postComboToAPI = (data) => Axios(
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
)

export const editComboToAPI = (data, _id) => Axios(
    {
        method: 'PATCH',
        responseType: "json",
        url: `https://dnguyen-combo-manager.herokuapp.com/combos/edit/${_id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data
    }
)

//delete combo by Id
export const deleteComboToAPI = (_id) => Axios(
    {
        method: 'PATCH',
        responseType: "json",
        url: `https://dnguyen-combo-manager.herokuapp.com/combos/del/${_id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }
)