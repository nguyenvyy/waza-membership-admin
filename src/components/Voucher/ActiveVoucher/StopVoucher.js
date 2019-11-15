import React, { useState, useEffect } from 'react'
import { Table} from 'antd'
import { getVoucher } from '../../../redux/actions/voucherx-actions/services'
import moment from 'moment'
import { formatOfDateFromDB, dateFormat } from '../../../constant'

const StopVoucher = () => {
    const column = [
        {
            key: 'ID',
            title: 'ID',
            dataIndex: '_id',
            width: 150
        },
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
            width: 120
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description'
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
            key: 'from_date',
            title: 'From Date',
            dataIndex: 'from_date',
            width: 150,
            render: date => moment(date, formatOfDateFromDB).format(dateFormat)
        },
        {
            key: 'to_date',
            title: 'To Date',
            dataIndex: 'to_date',
            width: 150,
            render: date => moment(date, formatOfDateFromDB).format(dateFormat)
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


    const date = Date.now()
    const fetchDataActive = () => {
        getVoucher()
            .then(res => {
                setToggle({
                    ...toggle,
                    dataActiveVoucher: res.data.filter(item => {
                        return moment(item.to_date, formatOfDateFromDB).valueOf() < date
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