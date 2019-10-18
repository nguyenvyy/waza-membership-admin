import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS } from "../actions/combo-actions/types"

const initState = {
    items: [],
    vouchers: [],
    isFetching: false
}

export const comboReducer = (state = initState, action) => {
    switch (action.type) {
        case REQUEST_COMBOS:
            return { ...state, isFetching: true }
        case STOP_COMBOS_REQUEST:
            return { ...state, isFetching: false }
        case RECEIVE_COMBOS:
            return {
                ...state,
                isFetching: false,
                items: action.combos,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
} 