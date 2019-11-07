import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS, RECEIVE_EXTRA_COMBOS, RECEIVE_DETAIL_COMBO, ADD_COMBO, EDIT_COMBO, DELETE_COMBO } from "./types";
import { getComboFromAPI, postComboToAPI, editComboToAPI, deleteComboToAPI, getDetailComboFromAPI } from "./services";

// handle get combo
export const requestCombos = () => ({ type: REQUEST_COMBOS })
export const stopRequestCombos = () => ({ type: STOP_COMBOS_REQUEST })
export const receiveCombos = (combos) => ({ type: RECEIVE_COMBOS, combos, receiveAt: Date.now() })
export const receiveExtraCombos = (combos) => ({ type: RECEIVE_EXTRA_COMBOS, combos, receiveAt: Date.now() })
export const receiveDetailCombo = combo => ({ type: RECEIVE_DETAIL_COMBO, combo, receiveAt: Date.now() })

export const fetchCombos = (params, ) => async (dispatch, getState) => {
    dispatch(requestCombos())
    try {
        const user = getState().user.info;
        const token = user && user.token
        const res = await getComboFromAPI(params, token);
        dispatch(receiveCombos(res.data));
    }
    catch (err) {
        dispatch(stopRequestCombos())
        return err;
    }
}

export const fetchExtraCombos = (params, isActive) => async (dispatch, getState) => {
    dispatch(requestCombos())
    try {
        const user = getState().user.info;
        const token = user && user.token
        const res = await getComboFromAPI(params, token, isActive);
        dispatch(receiveExtraCombos(res.data));
    }
    catch (err) {
        dispatch(stopRequestCombos())
        return err;
    }
}

export const fetchDetailCombo = (_id) => async (dispatch, getState) => {
    dispatch(requestCombos())
    try {
        const user = getState().user.info;
        const token = user && user.token
        const res = await getDetailComboFromAPI(_id);
        dispatch(receiveDetailCombo(res.data, token));
    }
    catch (err) {
        dispatch(stopRequestCombos())

        return err;
    }
}


export const addCombo = combo => ({ type: ADD_COMBO, combo, receiveAt: Date.now() })
export const editCombo = combo => ({ type: EDIT_COMBO, combo, receiveAt: Date.now() })
export const deleteCombo = combo => ({ type: DELETE_COMBO, combo, receiveAt: Date.now() })

export const addPostCombo = combo => (dispatch, getState) => {
    const user = getState().user.info;
    const token = user && user.token
    return postComboToAPI(combo, token)
        .then(res => {
            dispatch(addCombo(res.data))
            return res
        })
        .catch(err => {
            dispatch(stopRequestCombos())
            return err.response
        })
}

export const editPatchCombo = (combo) => (dispatch, getState) => {
    const allowedUpdates = ['combo_name', 'description', 'value', 'state', 'from_date', 'to_date', 'voucher_array', 'days']
    const updates = allowedUpdates.reduce((acc, curr) => {
        acc[curr] = combo[curr]
        return acc
    }, {})
    const user = getState().user.info;
    const token = user && user.token
    return editComboToAPI(updates, combo._id, token)
        .then(res => {
            dispatch(editCombo(res.data))
            return res
        })
        .catch(err => {
            dispatch(stopRequestCombos())
            return err.response
        })
}

export const stopPatchCombo = (combo) => (dispatch, getState) => {
    const user = getState().user.info;
    const token = user && user.token
    const allowedUpdates = ['state', 'to_date']
    const updates = allowedUpdates.reduce((acc, curr) => {
        acc[curr] = combo[curr]
        return acc
    }, {})
    return editComboToAPI(updates, combo._id, token)
        .then(res => {
            dispatch(editCombo(res.data))
            return res
        })
        .catch(err => {
            dispatch(stopRequestCombos())
            return err.response
        })
}

export const deletePatchCombo = _id => (dispatch, getState) => {
    const user = getState().user.info;
    const token = user && user.token
    return deleteComboToAPI(_id, token)
        .then(res => {
            dispatch(deleteCombo(res.data))
            return res
        })
        .catch(err => {
            // debugger
            dispatch(stopRequestCombos())
            return err.response
        })
}

