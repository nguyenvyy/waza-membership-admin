import { SEND_Campaign_REQUEST, STOP_Campaign_REQUEST, RECEIVE_FULL_Campaign, RECEIVE_Campaign_DETAIL, ADD_Campaign, DELETE_Campaign, EDIT_Campaign } from "./types";
import { createCampaignAPI, getFullCampaignListAPI, editCampaignAPI, deleteCampaignAPI } from "./services";

export const sendRequestCampaign = () => ({ type: SEND_Campaign_REQUEST })
export const stopRequestCampaign = () => ({ type: STOP_Campaign_REQUEST })

export const receiveFullCampaign = campaigns => ({ type: RECEIVE_FULL_Campaign, campaigns })
export const receiveCampaignDetail = campaign => ({ type: RECEIVE_Campaign_DETAIL, campaign })

export const addCampaign = campaign => ({ type: ADD_Campaign, campaign })
export const deleteCampaign = campaign => ({ type: DELETE_Campaign, campaign })
export const eidtCampaign = campaign => ({ type: EDIT_Campaign, campaign })

export const fetchFullCampaign = () => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCampaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await getFullCampaignListAPI(token)
        dispatch(receiveFullCampaign(res.data))
        dispatch(stopRequestCampaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCampaign())
        return 400
    }
}

export const requestAddCampaign = campaign => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCampaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await createCampaignAPI(campaign, token)
        dispatch(addCampaign(res.data))
        dispatch(stopRequestCampaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCampaign())
        if (error.response && error.response.data && error.response.data.code === 11000)
            return 11000
        return 400
    }
}


export const requestEditCampaign = (updated, id) => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCampaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await editCampaignAPI(updated, id, token)
        dispatch(eidtCampaign(res.data))
        dispatch(stopRequestCampaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCampaign())
        if (error.response && error.response.data && error.response.data.code === 11000)
            return 11000
        return 400
    }
}


export const requestDeleteCampaign = id => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCampaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await deleteCampaignAPI(id, token)
        dispatch(deleteCampaign(res.data))
        dispatch(stopRequestCampaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCampaign())
        return 400
    }

}

export const requestStopCampaign = id => async (dispatch, getState) => {
    try {
        dispatch(sendRequestCampaign())
        const user = getState().user.info;
        const token = user && user.token
        const res = await editCampaignAPI({ to_date: new Date() }, id, token)
        dispatch(eidtCampaign(res.data))
        dispatch(stopRequestCampaign())
        return 200
    } catch (error) {
        dispatch(stopRequestCampaign())
        return 400
    }

}
