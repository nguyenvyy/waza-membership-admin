import { REQUEST_COMBO_POLICY, STOP_REQUEST_COMBO_POLICY, RECEIVE_FULL_COMBO_POLICY, RECEIVE_EXTRA_COMBO_POLICY, ADD_COMBO_POLICY, EDIT_COMBO_POLICY, DELETE_COMBO_POLICY } from "../actions/policy-actions/types"
import { getPolicyIndexById } from "../selectors/policy-selector"

const initState = {
    isFetching: false,
    page: -1,
    maxPage: 0,
    combo: [],

}

export const policyReducer = (state = initState, action) => {
    switch (action.type) {
        case REQUEST_COMBO_POLICY:
            return {
                ...state,
                isFetching: true
            }
        case STOP_REQUEST_COMBO_POLICY:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_FULL_COMBO_POLICY:
            return {
                ...state,
                page: 9999,
                combo: [...action.policies]
            }
        case RECEIVE_EXTRA_COMBO_POLICY:
            return {
                ...state,
                page: action.page,
                combo: [...state.combo, ...action.extraPolicies]
            }
        case ADD_COMBO_POLICY:
            return {
                ...state,
                combo: [...state.combo, action.policy]
            }
        case EDIT_COMBO_POLICY:
            const index = getPolicyIndexById(state.combo, action.policy._id);
            if(index === -1) return state
            const newPolicies = state.combo.slice()
            newPolicies.splice(index, 1, action.policy)
            return {
                ...state,
                combo: newPolicies
            }
        case DELETE_COMBO_POLICY:{
            const index = getPolicyIndexById(state.combo, action.policy._id);
            if(index === -1) return state
            const newPolicies = state.combo.slice()
            newPolicies.splice(index, 1, action.policy)
            return {
                ...state,
                combo: newPolicies
            }}
        default:
            return state
    }
}