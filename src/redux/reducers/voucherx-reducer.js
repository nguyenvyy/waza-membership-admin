import { REQUEST_VOUCHER, STOP_VOUCHER_REQUEST, RECEIVE_VOUCHER, RECEIVE_EXTRA_VOUCHER, RECEIVE_DETAIL_VOUCHER } from "../actions/voucherx-actions/types"

const initStateVoucher = {
    items: [],
    detailVouchers: [],
    isFetching: false,
    page: -1
}


export const voucherxReducer = (state = initStateVoucher, action) => {
    switch (action.type) {
        case REQUEST_VOUCHER:
            return { ...state, isFetching: true }
        case STOP_VOUCHER_REQUEST:
            return { ...state, isFetching: false }
        case RECEIVE_VOUCHER:
            return {
                page: 9999,
                isFetching: false,
                items: action.vouchers,
                lastUpdated: action.receivedAt
            }
        case RECEIVE_EXTRA_VOUCHER:
            return {
                ...state,
                isFetching: false,
                items: [...state.items, ...action.vouchers],
                lastUpdated: action.receivedAt
            }
        case RECEIVE_DETAIL_VOUCHER: 
            return {
                ...state,
                isFetching: false,
                detailCombo: [...action.vouchers],
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}