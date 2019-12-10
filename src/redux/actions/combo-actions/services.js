import Axios from "axios";
import { serverURL } from "../../../constant";

export const getComboFromAPI = (params, token, isActive = false) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/combos${isActive ? '/active' : ''}`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        params: {
            sortBy: 'createdAt:desc',
            ...params
        }
    }
)

export const getDetailComboFromAPI = (_id, token) => Axios(
    {
        method: 'GET',
        responseType: "json",
        url: `${serverURL}/combos/${_id}`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
)

export const postComboToAPI = (data, token) => Axios(
    {
        method: 'POST',
        responseType: "json",
        url: `${serverURL}/combos/new`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data
    }
)

export const editComboToAPI = (data, _id, token) => Axios(
    {
        method: 'PATCH',
        responseType: "json",
        url: `${serverURL}/combos/edit/${_id}`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data
    }
)

//delete combo by Id
export const deleteComboToAPI = (_id, token) => Axios(
    {
        method: 'PATCH',
        responseType: "json",
        url: `${serverURL}/combos/del/${_id}`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
)