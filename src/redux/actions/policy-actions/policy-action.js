import { REQUEST_COMBO_POLICY, STOP_REQUEST_COMBO_POLICY, RECEIVE_FULL_COMBO_POLICY, RECEIVE_EXTRA_COMBO_POLICY, ADD_COMBO_POLICY, EDIT_COMBO_POLICY } from "./types";
import { getComboPoliciesAPI, createPolicyAPI, editComboPolicyAPI, deleteComboPolicyAPI } from "./service";
import { stopRequestCombos } from "../combo-actions/actions";

export const requestComboPolicy = () => ({type: REQUEST_COMBO_POLICY})
export const stopRequestComboPolicy = () => ({type: STOP_REQUEST_COMBO_POLICY})
export const receiveFullComboPolicy = policies => ({type: RECEIVE_FULL_COMBO_POLICY, policies})
export const receiveExtraComboPolicy = policies => ({type: RECEIVE_EXTRA_COMBO_POLICY, extraPolicies: policies})
export const addComboPolicy = policy => ({type: ADD_COMBO_POLICY, policy})
export const deleteComboPolicy = policyId => ({type: ADD_COMBO_POLICY, policyId})
export const editComboPolicy = policy => ({type: EDIT_COMBO_POLICY, policy})

export const featchFullComboPolicy = () => (dispatch, getState) => {
    dispatch(requestComboPolicy())
    const token = getState().user.info.token
    return getComboPoliciesAPI(null, token)
        .then(res => {
            dispatch(stopRequestComboPolicy())
            dispatch(receiveFullComboPolicy(res.data))
            return res.status
        })
        .catch(err => {
            dispatch(stopRequestComboPolicy())
            if (err.response !== undefined) {
                return err.response.status
            }
            return undefined
        })
}

export const requestAddComboPolicy = policy => (dispatch, getState) => {
    dispatch(requestComboPolicy())
    const token = getState().user.infor.token
    return createPolicyAPI(policy, token)
        .then(res => {
            dispatch(stopRequestCombos())
            dispatch(addComboPolicy(res.data))
            return res.status
        })
        .catch(err => {
            dispatch(stopRequestComboPolicy())
            if (err.response !== undefined) {
                return err.response.status
            }
            return undefined
        })
}

export const requestEditComboPolicy = policy => (dispatch, getState) => {
    dispatch(requestComboPolicy())
    const token = getState().user.infor.token
    return editComboPolicyAPI(policy._id, policy, token)
        .then(res => {
            dispatch(stopRequestCombos())
            dispatch(editComboPolicy(res.data))
            return res.status
        })
        .catch(err => {
            dispatch(stopRequestComboPolicy())
            if (err.response !== undefined) {
                return err.response.status
            }
            return undefined
        })
}

export const requestDeleteComboPolicy = id => (dispatch, getState) => {
    dispatch(requestComboPolicy())
    const token = getState().user.infor.token
    return deleteComboPolicyAPI(id, token)
        .then(res => {
            dispatch(stopRequestCombos())
            dispatch(deleteComboPolicy(res.data))
            return res.status
        })
        .catch(err => {
            dispatch(stopRequestComboPolicy())
            if (err.response !== undefined) {
                return err.response.status
            }
            return undefined
        })
}