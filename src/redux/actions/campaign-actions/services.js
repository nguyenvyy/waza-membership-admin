import Axios from "axios";
import { serverURL } from "../../../constant";

export const getFullCampaignListAPI = (token) => Axios({
    method: 'GET',
    url: `${serverURL}/campaigns`,
    responseType: 'json',
    timeout: 30000,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const getCampaignByIdAPI = (token, _id) => Axios({
    method: 'GET',
    url: `${serverURL}/campaigns`,
    responseType: 'json',
    timeout: 30000,
    headers: {
        'Authorization': `Bearer ${token}`
    },
    params: {
        _id
    }
})

export const createCampaignAPI = (campaign, token) => Axios({
    method: 'POST',
    url: `${serverURL}/campaigns/new`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: campaign
})

export const editCampaignAPI = (updated, id, token) => Axios({
    method: 'PATCH',
    url: `${serverURL}/campaigns/edit/${id}`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: updated
})

export const deleteCampaignAPI = (id, token) => Axios({
    method: 'PATCH',
    url: `${serverURL}/campaigns/del/${id}`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
})