import React from 'react'

const VouchersShort = ({voucher_array = []}) => {
    return (
        <ul className="voucher-in-combo">
            {voucher_array.map((voucher, index) => (
                <li key={index}>
                    {voucher.voucher_name} x {voucher.count}
                </li>
            ))}
        </ul>
    )
    
}

export default React.memo(VouchersShort)