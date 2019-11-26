import { SEND_COMPAIGN_REQUEST, STOP_COMPAIGN_REQUEST, RECEIVE_FULL_COMPAIGN, RECEIVE_COMPAIGN_DETAIL, ADD_COMPAIGN, DELETE_COMPAIGN, EDIT_COMPAIGN } from "./types";
import { createCompaignAPI, getFullCompaignListAPI, editCompaignAPI, deleteCompaignAPI } from "./services";

export const sendRequestCompaign = () => ({type: SEND_COMPAIGN_REQUEST})
export const stopRequestCompaign = () => ({type: STOP_COMPAIGN_REQUEST})

export const receiveFullCompaign = compaigns => ({type: RECEIVE_FULL_COMPAIGN, compaigns})
export const receiveCompaignDetail = compaign => ({type: RECEIVE_COMPAIGN_DETAIL, compaign})

export const addCompaign = compaign => ({type: ADD_COMPAIGN, compaign})
export const deleteCompaign = compaign => ({type: DELETE_COMPAIGN, compaign})
export const eidtCompaign = compaign => ({type: EDIT_COMPAIGN, compaign})

export const fetchFullCompaign = () => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCompaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await getFullCompaignListAPI(token)
        dispatch(receiveFullCompaign(res.data))
        dispatch(stopRequestCompaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCompaign())
        return 400
    }
}

export const requestAddCompaign = compaign => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCompaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await createCompaignAPI(compaign, token)
        dispatch(addCompaign(res.data))
        dispatch(stopRequestCompaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCompaign())
        return 400
    }
}

export const requestEditCompaign = (updated, id) => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCompaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await editCompaignAPI(updated, token, token)
        dispatch(eidtCompaign(res.data))
        dispatch(stopRequestCompaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCompaign())
        return 400
    }
} 

export const requestDeleteCompaign = id => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCompaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await deleteCompaignAPI(id, token)
        dispatch(deleteCompaign(res.data))
        dispatch(stopRequestCompaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCompaign())
        return 400
    }

}

export const requestStopCompaign = id => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCompaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await editCompaignAPI({from_date: new Date()}, id, token)
        debugger
        dispatch(eidtCompaign(res.data))
        dispatch(stopRequestCompaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCompaign())
        return 400
    }

}