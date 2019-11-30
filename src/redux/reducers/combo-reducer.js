import { REQUEST_COMBOS, STOP_COMBOS_REQUEST, RECEIVE_COMBOS, RECEIVE_EXTRA_COMBOS, RECEIVE_DETAIL_COMBO, EDIT_COMBO, ADD_COMBO, DELETE_COMBO } from "../actions/combo-actions/types"
import { getComboIndexById } from "../selectors/combo-selector"

const initState = {
    items: [],
    isFetching: false,
    detailCombo: {},
    page: -1,
    maxPage: 0
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
                page: 9999,
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
                detailCombo: { ...action.combo },
                lastUpdated: action.receivedAt
            }
        case EDIT_COMBO:
            const comboIndex = getComboIndexById(state, action.combo._id)
            if (comboIndex < 0) {
                return { ...state, detailCombo: { ...action.combo } }
            } else {
                let newCombos = state.items.slice();
                newCombos.splice(comboIndex, 1, action.combo);
                return {
                    ...state,
                    items: newCombos,
                    detailCombo: { ...action.combo }
                }
            }
        case DELETE_COMBO:
            const deletedComboIndex = getComboIndexById(state, action.combo._id)
            if (deletedComboIndex < 0) {
                return { ...state, detailCombo: { ...action.combo } }
            } else {
                let newCombos = state.items.slice();
                newCombos.splice(deletedComboIndex, 1, action.combo);
                return {
                    ...state,
                    items: newCombos,
                    detailCombo: { ...action.combo }
                }
            }
        case ADD_COMBO:
            return {
                ...state,
                isFetching: false,
                items: [action.combo, ...state.items],
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

