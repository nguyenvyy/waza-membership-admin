import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS } from "./types";
import { getDataFromAPI } from "./services";


export const requestCombos = () => ({ type: REQUEST_COMBOS })
export const stopRequestCombos = () => ({ type: STOP_COMBOS_REQUEST })
export const receiveCombos = (combos) => ({ type: RECEIVE_COMBOS, combos, receiveAt: Date.now() })
export const featchCombos = () => dispatch => {
    dispatch(requestCombos())
    return getDataFromAPI('https://my.api.mockaroo.com/combo.json?key=6feeccd0')
            .then(data => {
                dispatch(receiveCombos(data))
            })
            .catch(err => {throw new Error(err)})
}