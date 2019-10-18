import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS, RECEIVE_EXTRA_COMBOS, RECEIVE_DETAIL_COMBO } from "../actions/combo-actions/types"

const initState = {
    items: [],
    vouchersByCombo: [],
    isFetching: false,
    detailCombo: {},
    page: 0
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
        case RECEIVE_EXTRA_COMBOS:
            return {
                ...state,
                isFetching: false,
                items: [...state.items, ...action.combos],
                lastUpdated: action.receivedAt
            }
        case RECEIVE_DETAIL_COMBO: 
            return {
                ...state,
                isFetching: false,
                detailCombo: {...action.combo},
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
} 