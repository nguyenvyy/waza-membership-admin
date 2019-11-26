import Axios from "axios";
import { serverURL } from "../../../constant";

export const getFullCompaignListAPI = (token) => Axios({
    method: 'GET',
    url: `${serverURL}/campaigns`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const getCompaignByIdAPI = (token, _id) => Axios({
    method: 'GET',
    url: `${serverURL}/campaigns`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    params: {
        _id
    }
})

export const createCompaignAPI = (compaign, token) => Axios({
    method: 'POST',
    url: `${serverURL}/campaigns/new`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: compaign
})

export const editCompaignAPI = (updated, id, token) => Axios({
    method: 'PATCH',
    url: `${serverURL}/campaigns/edit/${id}`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: updated
})

export const deleteCompaignAPI = (id, token) => Axios({
    method: 'PATCH',
    url: `${serverURL}/campaigns/del/${id}`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
})