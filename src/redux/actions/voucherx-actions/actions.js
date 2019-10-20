import { REQUEST_VOUCHER,
    STOP_VOUCHER_REQUEST,
    RECEIVE_VOUCHER,
    RECEIVE_EXTRA_VOUCHER,
    RECEIVE_DETAIL_VOUCHER } from "./types";
import { getVouchersFromAPI } from "./services";


// handle combo
export const requestVouchers = () => ({ type: REQUEST_VOUCHER })
export const stopRequestVouchers = () => ({ type: STOP_VOUCHER_REQUEST })
export const receiveVouchers = (vouchers) => ({ type: RECEIVE_VOUCHER, vouchers, receiveAt: Date.now() })
export const receiveExtraVouchers = (vouchers) => ({ type: RECEIVE_EXTRA_VOUCHER, vouchers, receiveAt: Date.now() })
export const receiveDetailVouchers = vouchers => ({ type: RECEIVE_DETAIL_VOUCHER, vouchers, receiveAt: Date.now() })


export const featchVouchers = (params) => async dispatch => {
    dispatch(requestVouchers())
    try {
        const data = await getVouchersFromAPI(params);
        dispatch(receiveVouchers(data))
    }   
    catch (err) {
        dispatch(stopRequestVouchers())
        return err
    }
}