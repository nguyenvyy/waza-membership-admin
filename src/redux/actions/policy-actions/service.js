import Axios from "axios";
import { serverURL } from "../../../constant";

const headersConfig = token => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
})

export const getComboPoliciesAPI = (params, token) => Axios({
    method: 'GET',
    responseType: 'json',
    url: `${serverURL}/policies`,
    headers: headersConfig(token),
    params
})

export const getComboPolicyByIdAPI = (id, token) => Axios({
    method: 'GET',
    responseType: 'json',
    url: `${serverURL}/policies/${id}`,
    headers: headersConfig(token)
})

export const createPolicyAPI = (data, token) => Axios({
    method: 'POST',
    responseType: 'json',
    url: `${serverURL}/policies/new`,
    headers: headersConfig(token),
    data
})

export const editComboPolicyAPI = (id, data, token) => Axios({
    method: 'PATCH',
    responseType: 'json',
    url: `${serverURL}/policies/edit/${id}`,
    headers: headersConfig(token),
    data
})

export const deleteComboPolicyAPI = (id, token) => Axios({
    method: 'PATCH',
    responseType: 'json',
    url: `${serverURL}/policies/del/${id}`,
    headers: headersConfig(token),
})