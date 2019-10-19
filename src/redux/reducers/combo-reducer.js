import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS, RECEIVE_EXTRA_COMBOS, RECEIVE_DETAIL_COMBO, EDIT_COMBO, ADD_COMBO } from "../actions/combo-actions/types"
// import { getComboIndexById } from "../selectors/combo-selector"

const initState = {
    items: [],
    isFetching: false,
    detailCombo: {},
    page: -1
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
        case EDIT_COMBO:
            // debugger
            // const comboIndex = getComboIndexById(state, action.comboId)
            // if(comboIndex < 0) return state
            // const newVoucherArray = state.items[comboIndex].voucher_array.slice()
            // const newCombo = {
            //     ...state.items[comboIndex],
            //     voucher_array: [
            //         ...newVoucherArray.splice(action.voucherIndex, 1)
            //     ]
            // }
            // const newCombos = state.items.slice()
            // newCombos.splice(comboIndex, 1, newCombo)
            return state
        case ADD_COMBO:
            return state
        default:
            return state
    }
}

