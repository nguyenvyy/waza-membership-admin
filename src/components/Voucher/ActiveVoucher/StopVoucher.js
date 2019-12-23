import React, { useState, useEffect } from 'react'
import { Table} from 'antd'
import { getVoucher } from '../../../redux/actions/voucherx-actions/services'
// import moment from 'moment'
// import { formatOfDateFromDB, dateFormat } from '../../../constant'

const StopVoucher = () => {
    const column = [
        {
            key: 'voucher_name',
            title: 'Voucher Name',
            dataIndex: 'voucher_name',
            width: 100
        },
        {
            key: 'category',
            title: 'Category',
            dataIndex: 'category',
            width: 90
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            width: 300
        },
        {
            key: 'value',
            title: 'Value',
            dataIndex: 'value',
            sorter: (a, b) => a.value - b.value
        },
        {
            key: 'discount',
            title: 'Discount',
            dataIndex: 'discount'
        },
        {
            key: 'times_to_use',
            title: 'Times to use',
            dataIndex: 'times_to_use',
            width: 140,
            sorter: (a, b) => a.value - b.value,
        },
        {
            key: 'subcategoty',
            title: 'Sub Type',
            dataIndex: 'subcategory'
        },
    ]

    const intitalState = {
        dataActiveVoucher: [],
        dataStopVoucher: []
    }

    const [toggle, setToggle] = useState(intitalState)

    useEffect(() => {
        fetchDataActive()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // const date = Date.now()
    const fetchDataActive = () => {
        getVoucher()
            .then(res => {
                setToggle({
                    ...toggle,
                    dataActiveVoucher: res.data.filter(item => {
                        return item.state === false
                    })
                })
            }
        )
    }


    return (
        <div>
            <h1 className="title-voucher">
                Stop Voucher
            </h1>
            <Table columns={column} loading={toggle.dataActiveVoucher.length === 0 ? true: false} dataSource={toggle.dataActiveVoucher}></Table>
        </div>
    )
}
export default StopVoucher