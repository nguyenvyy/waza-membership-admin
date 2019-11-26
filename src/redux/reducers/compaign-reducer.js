import { SEND_COMPAIGN_REQUEST, STOP_COMPAIGN_REQUEST, RECEIVE_FULL_COMPAIGN, RECEIVE_COMPAIGN_DETAIL, ADD_COMPAIGN, EDIT_COMPAIGN, DELETE_COMPAIGN } from "../actions/compain-actions/types"
import { getCompaignIndexById } from "../selectors/compaign-selector"

const initState = {
    items: [],
    isFetching: false,
    detail: null
}
export const compaignReducer = (state = initState, action) => {
    switch (action.type) {
        case SEND_COMPAIGN_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case STOP_COMPAIGN_REQUEST:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_FULL_COMPAIGN:
            return {
                ...state,
                items: [...action.compaigns]
            }
        case RECEIVE_COMPAIGN_DETAIL:
            return {
                ...state,
                detail: action.compaign
            }
        case ADD_COMPAIGN:
            return {
                ...state,
                items: [action.compaign, ...state.items]
            }
        case EDIT_COMPAIGN: {
            const itemsClone = [...state.items]
            const indexEdit = getCompaignIndexById(state.items, action.compaign._id)
            itemsClone.splice(indexEdit, 1, action.compaign)
            return {
                ...state,
                items: itemsClone
            }
        }
        case DELETE_COMPAIGN:{
            const itemsClone = [...state.items]
            const indexDelete = getCompaignIndexById(state.items, action.compaign._id)
            itemsClone.splice(indexDelete, 1, action.compaign)
            return {
                ...state,
                items: itemsClone
            }
        }
        default:
            return state
    }
}