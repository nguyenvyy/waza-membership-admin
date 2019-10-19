import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS, RECEIVE_EXTRA_COMBOS, RECEIVE_DETAIL_COMBO } from "./types";
import { getComboFromAPI } from "./services";

// handle combo
export const requestCombos = () => ({ type: REQUEST_COMBOS })
export const stopRequestCombos = () => ({ type: STOP_COMBOS_REQUEST })
export const receiveCombos = (combos) => ({ type: RECEIVE_COMBOS, combos, receiveAt: Date.now() })
export const receiveExtraCombos = (combos) => ({ type: RECEIVE_EXTRA_COMBOS, combos, receiveAt: Date.now() })
export const receiveDetailCombo = combo => ({ type: RECEIVE_DETAIL_COMBO, combo, receiveAt: Date.now() })

export const featchCombos = (params) => async dispatch => {
    dispatch(requestCombos())
    try {
        const data = await getComboFromAPI(params);
        dispatch(receiveCombos(data));
    }   
    catch (err) {
        dispatch(stopRequestCombos())
        throw new Error(err);
    }
}

export const featchExtraCombos = (params) => async dispatch => {
    dispatch(requestCombos())
    try {
        const data = await getComboFromAPI(params);
        dispatch(receiveExtraCombos(data));
    }
    catch (err) {
        dispatch(stopRequestCombos())
        throw new Error(err);
    }
}

export const featchDetailCombo = (params) => async dispatch => {
    dispatch(requestCombos())
    try {
        const data = await getComboFromAPI(params);
        dispatch(receiveDetailCombo(data[0]));
    }
    catch (err) {
        dispatch(stopRequestCombos())
        throw new Error(err);
    }
}

