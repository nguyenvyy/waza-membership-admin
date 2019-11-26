import { SEND_Campaign_REQUEST, STOP_Campaign_REQUEST, RECEIVE_FULL_Campaign, RECEIVE_Campaign_DETAIL, ADD_Campaign, EDIT_Campaign, DELETE_Campaign } from "../actions/campaign-actions/types"
import { getCampaignIndexById } from "../selectors/campaign-selector"

const initState = {
    items: [],
    isFetching: false,
    detail: null
}
export const campaignReducer = (state = initState, action) => {
    switch (action.type) {
        case SEND_Campaign_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case STOP_Campaign_REQUEST:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_FULL_Campaign:
            return {
                ...state,
                items: [...action.campaigns]
            }
        case RECEIVE_Campaign_DETAIL:
            return {
                ...state,
                detail: action.campaign
            }
        case ADD_Campaign:
            return {
                ...state,
                items: [action.campaign, ...state.items]
            }
        case EDIT_Campaign: {
            const itemsClone = [...state.items]
            const indexEdit = getCampaignIndexById(state.items, action.campaign._id)
            itemsClone.splice(indexEdit, 1, action.campaign)
            return {
                ...state,
                items: itemsClone
            }
        }
        case DELETE_Campaign:{
            const itemsClone = [...state.items]
            const indexDelete = getCampaignIndexById(state.items, action.campaign._id)
            itemsClone.splice(indexDelete, 1, action.campaign)
            return {
                ...state,
                items: itemsClone
            }
        }
        default:
            return state
    }
}