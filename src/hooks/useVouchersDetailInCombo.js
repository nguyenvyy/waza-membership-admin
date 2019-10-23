import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { featchVouchers } from '../redux/actions/voucherx-actions/actions';
import { getVouchersDetailByIds } from '../redux/selectors/voucherx-selector';


export const useVouchersDetailInCombo = (voucher_array = []) => {
    let result = [];
    const dispatch = useDispatch()
    const isMaxPage = useSelector(state => state.voucherx.page >= state.voucherx.maxPage)
    useEffect(() => {
        if(!isMaxPage) {
            dispatch(featchVouchers())
        }
    }, [dispatch, isMaxPage])
    const ids = voucher_array.map(voucher => voucher.voucher_id)
    const idx = ['5daabb145973f00017b55cbc', '5daa91a3c8ab900017af87ed', '5daaba115973f00017b55cb9']
    const vouchers = useSelector(state => getVouchersDetailByIds(state.voucherx, idx))

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