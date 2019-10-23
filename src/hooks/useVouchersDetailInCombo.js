import { useSelector } from 'react-redux'
import { getVouchersDetailByIds } from '../redux/selectors/voucherx-selector';


export const useVouchersDetailInCombo = (voucher_array = []) => {
    let result = [];
    const ids = voucher_array.map(voucher => voucher.voucher_id)
    const vouchers = useSelector(state => getVouchersDetailByIds(state.voucherx, ids))
    result = vouchers.map(voucher => {
        let index = ids.findIndex(id => id === voucher._id)
        return {
            value: voucher,
            count: voucher_array[index].count
        }
    })
    result = voucher_array.map(voucher => {
        return {
            value: vouchers.find(item => item._id === voucher.voucher_id),
            count: voucher.count
        }
    })
    return result
}