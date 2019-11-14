import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'
import { formatVND } from '../../../utils'

const VouchersDetail = ({voucher_array = [], isFetchingVoucher = true}) =>  {
    return  isFetchingVoucher ? (
        'loading...'
    ) : (
        <ul className="voucher-in-combo">
            {voucher_array.map((value, index) => (
                <li key={index}>
                    {`${value.count} x ${value.voucher_name}, service: ${value.category}, value: ${formatVND(value.value)}, discount: ${value.discount} %`}
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