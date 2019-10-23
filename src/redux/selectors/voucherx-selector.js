import { createSelector } from "reselect"

const getVouchers = voucherx => voucherx.items
const getIds = (_, ids) => ids

const checkVoucherValidWithIds = (id, ids) => {
    return ids.includes(id)
}

export const getVouchersDetailByIds = createSelector(
    [getVouchers, getIds],
    (vouchers, ids) => {
        console.log('re-computed')
        return vouchers.filter(voucher => checkVoucherValidWithIds(voucher._id, ids))}
)