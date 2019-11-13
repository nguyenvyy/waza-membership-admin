export const useVouchersDetailInCombo = (voucher_array = []) => {
    let result = [];
    result = voucher_array.map(voucher => {
        return {
            value: voucher,
            count: voucher.count
        }
    })
    return result
}