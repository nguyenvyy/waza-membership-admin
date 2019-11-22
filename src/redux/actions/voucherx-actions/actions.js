import { REQUEST_VOUCHER,
    STOP_VOUCHER_REQUEST,
    RECEIVE_VOUCHER,
    RECEIVE_EXTRA_VOUCHER,
    RECEIVE_DETAIL_VOUCHER, 
    RECEIVE_GIFT_VOUCHERS} from "./types";
import { getVouchersFromAPI, getVouchersGiftAPI } from "./services";


// handle combo
export const requestVouchers = () => ({ type: REQUEST_VOUCHER })
export const stopRequestVouchers = () => ({ type: STOP_VOUCHER_REQUEST })
export const receiveVouchers = (vouchers) => ({ type: RECEIVE_VOUCHER, vouchers, receiveAt: Date.now() })
export const receiveExtraVouchers = (vouchers) => ({ type: RECEIVE_EXTRA_VOUCHER, vouchers, receiveAt: Date.now() })
export const receiveDetailVouchers = vouchers => ({ type: RECEIVE_DETAIL_VOUCHER, vouchers, receiveAt: Date.now() })
export const receiveGiftVouchers = vouchers => ({type: RECEIVE_GIFT_VOUCHERS, vouchers})

export const fetchVouchers = (params) => async (dispatch, getState) => {
    dispatch(requestVouchers())
    try {
        const user = getState().user.info;
        const token = user && user.token
        const data = await getVouchersFromAPI(params, token);
        dispatch(receiveVouchers(data))
    }   
    catch (err) {
        dispatch(stopRequestVouchers())
        return err
    }
}

export const fetchGiftVouchers = (params) => async (dispatch, getState) => {
    dispatch(requestVouchers())
    try {
        const user = getState().user.info;
        const token = user && user.token
        const data = await getVouchersGiftAPI(params, token);
        dispatch(receiveGiftVouchers(data))
        dispatch(stopRequestVouchers())
    }   
    catch (err) {
        dispatch(stopRequestVouchers())
        return err
    }
}