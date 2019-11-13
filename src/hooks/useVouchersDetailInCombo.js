import { useSelector } from 'react-redux'
import { getVouchersDetailByIds } from '../redux/selectors/voucherx-selector';


export const useVouchersDetailInCombo = (voucher_array = []) => {
    let result = [];
    // const ids = voucher_array.map(voucher => voucher.voucher_id)
    // const vouchers = useSelector(state => getVouchersDetailByIds(state.voucherx, ids))
    // if(vouchers.length === 0) return result
    result = voucher_array.map(voucher => {
        return {
            value: voucher,
            count: voucher.count
        }
    })
    return result
}