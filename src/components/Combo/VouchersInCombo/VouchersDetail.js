import React from 'react'
import { Link } from 'react-router-dom'
import { useVouchersDetailInCombo } from '../../../hooks/useVouchersDetailInCombo'
import { Divider } from 'antd'

const VouchersDetail = ({voucher_array = [], isFetchingVoucher = true}) => {
    const vouchers =  useVouchersDetailInCombo(voucher_array)
    const discountDetail = (value, maxValue, persent) => {
        const discountValue = value > 0 ? `${value} ` : ''
        const discountPersent = (persent > 0 && maxValue === 0) ? `${persent}% ` : ''
        const discountCombine = (persent > 0 && maxValue > 0) ? `${persent}% - max: ${maxValue} ` : ''
        return `${discountValue}${discountPersent}${discountCombine}`
    }
    return  isFetchingVoucher ? (
        'loading...'
    ) : (
        <ul className="voucher-in-combo">
            {vouchers.map(({value, count}, index) => (
                <li key={index}>
                    {`${count} x name:  ${value.voucher_name}, type: ${value.category}, service: ${value.subcategory}, discount: ${discountDetail(value.value, value.max_value, value.discount)}`}
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