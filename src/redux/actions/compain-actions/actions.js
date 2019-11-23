import { SEND_COMPAIGN_REQUEST, STOP_COMPAIGN_REQUEST, RECEIVE_FULL_COMPAIGN, RECEIVE_COMPAIGN_DETAIL, ADD_COMPAIGN, DELETE_COMPAIGN, EDIT_COMPAIGN } from "./types";

export const sendRequestCompaign = () => ({type: SEND_COMPAIGN_REQUEST})
export const stopRequestCompaign = () => ({type: STOP_COMPAIGN_REQUEST})

export const receiveFullCompaign = compaigns => ({type: RECEIVE_FULL_COMPAIGN, compaigns})
export const receiveCompaignDetail = compaign => ({type: RECEIVE_COMPAIGN_DETAIL, compaign})

export const addCompaign = compaign => ({type: ADD_COMPAIGN, compaign})
export const deleteCompaign = compaign => ({type: DELETE_COMPAIGN, compaign})
export const eidtCompaign = compaign => ({type: EDIT_COMPAIGN, compaign})