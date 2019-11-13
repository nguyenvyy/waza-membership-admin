import uuid from 'uuid'
import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import { getVoucherActive } from '../../../redux/actions/voucherx-actions/services'

const ActiveVoucher = () => {
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
            dataIndex: 'value'
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
            width: 250
        },
        {
            key: 'to_date',
            title: 'To Date',
            dataIndex: 'to_date',
            width: 250
        },
        {
            key: 'subcategoty',
            title: 'Sub Type',
            dataIndex: 'subcategory'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => (
                <div className="action-acvoucher">
                    <p className="text">Disable</p>
                </div>
            )
        }
    ]

    const intitalState = {
        dataActiveVoucher: []
    }

    const [toggle, setToggle] = useState(intitalState)

    useEffect(() => {
        getVoucherActive()
            .then(res => {
                setToggle({
                    ...toggle,
                    dataActiveVoucher: res.data
                })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <h1>
                Active Voucher
            </h1>
            <Table rowKey={() => uuid()} columns={column} loading={toggle.dataActiveVoucher.length === 0 ? true: false} dataSource={toggle.dataActiveVoucher}></Table>
        </div>
    )
}
export default ActiveVoucher