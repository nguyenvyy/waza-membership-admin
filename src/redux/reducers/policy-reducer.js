import { REQUEST_COMBO_POLICY, STOP_REQUEST_COMBO_POLICY, RECEIVE_FULL_COMBO_POLICY, RECEIVE_EXTRA_COMBO_POLICY, ADD_COMBO_POLICY, EDIT_COMBO_POLICY, DELETE_COMBO_POLICY } from "../actions/policy-actions/types"

const initState = {
    isFetching: false,
    page: -1,
    maxPage: 0,
    combo: [
        {
            name: 'CB01',
            increase: 30,
            voucherProprotion: [30, 30, 20],
            description: '...'

        },
        {
            name: 'CB02',
            increase: 30,
            voucherProprotion: [40, 60],
            description: '...'

        },
        {
            name: 'CB03',
            increase: 30,
            voucherProprotion: [25, 25, 25, 25],
            description: '...'

        },
        {
            name: 'CB04',
            increase: 30,
            voucherProprotion: [30, 30, 20],
            description: '...'

        },
        {
            name: 'CB05',
            increase: 35,
            voucherProprotion: [40, 60],
            description: '...'

        },
        {
            name: 'CB06',
            increase: 40,
            voucherProprotion: [25, 25, 25, 25],
            description: '...'

        }
    ],

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
            //incompleted
            return {
                state
            }
        case DELETE_COMBO_POLICY:
            //incompleted
            return {
                state
            }
        default:
            return state
    }
}