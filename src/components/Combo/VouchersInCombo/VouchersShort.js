import React from 'react'
import { useVouchersDetailInCombo } from '../../../hooks/useVouchersDetailInCombo'

const VouchersShort = ({voucher_array = [], isFetchingVoucher}) => {
    const vouchers =  useVouchersDetailInCombo(voucher_array)
    return  isFetchingVoucher ? (
        'loading...'
    ) : (
        <ul>
            {vouchers.map((voucher, index) => (
                <li key={index}>
                    {voucher.value.voucher_name} x {voucher.count}
                </li>
            ))}
        </ul>
    )
    
}

export default React.memo(VouchersShort)