import { createSelector } from "reselect"
import moment from "moment"

const getVouchers = voucherx => voucherx.items
const getIds = (_, ids) => ids

const checkVoucherValidWithIds = (id, ids) => {
    return ids.includes(id)
}

    
export const getVouchersDetailByIds = createSelector(
    [getVouchers, getIds],
    (vouchers, ids) => {
        return vouchers.filter(voucher => checkVoucherValidWithIds(voucher._id, ids))}
)
export const checkIsActiveVoucher = voucher => {
    if (voucher.isDeleted) return false
    if (!voucher.state) return false
    const presentTime = Date.now();
    const fromDate = moment(voucher.from_date).valueOf()
    const toDate = moment(voucher.to_date).valueOf()
    if(presentTime <= toDate && presentTime >= fromDate) {
        return true
    }
    return false
}
