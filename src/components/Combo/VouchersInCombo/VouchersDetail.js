import React from 'react'
import { Link } from 'react-router-dom'
import { useVouchersDetailInCombo } from '../../../hooks/useVouchersDetailInCombo'
import { Divider } from 'antd'
import { formatVND } from '../../../utils'

const VouchersDetail = ({voucher_array = [], isFetchingVoucher = true}) => {
    const vouchers =  useVouchersDetailInCombo(voucher_array)
    return  isFetchingVoucher ? (
        'loading...'
    ) : (
        <ul className="voucher-in-combo">
            {vouchers.map(({value, count}, index) => (
                <li key={index}>
                    {`${count} x ${value.voucher_name}, service: ${value.subcategory}, value: ${formatVND(value.value)}, discount: ${value.discount} %`}
                    <Divider type="vertical"/>
                    <span>
                        <Link to={`/a/voucher/detail/${value._id}`}>view</Link>
                    </span>
                </li>
            ))}
        </ul>
    )
    
}

export default React.memo(VouchersDetail)