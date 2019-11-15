import uuid from 'uuid'
import React, { useState, useEffect } from 'react'
import { Table, message, Button } from 'antd'
import { getVoucherActive } from '../../../redux/actions/voucherx-actions/services'
import moment from 'moment'
import { formatOfDateFromDB, dateFormat } from '../../../constant'
import {editVoucherByID} from '../../../redux/actions/voucherx-actions/services'
import {
    Link
} from "react-router-dom";

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
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div className="action-acvoucher">
                    <p onClick={() => stopActive(record._id, record.voucher_name)} className="text">Stop</p>
                </div>
            )
        }
    ]

    const dataStop = {
        to_date: new Date()
    }
    const stopActive = (id, name) => {
        editVoucherByID(dataStop, id)
        .then(() => {
            message.success(`${name} stopped`)
            fetchDataActive()
        })
    }

    const intitalState = {
        dataActiveVoucher: []
    }

    const [toggle, setToggle] = useState(intitalState)

    useEffect(() => {
        fetchDataActive()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchDataActive = () => {
        getVoucherActive()
            .then(res => {
                setToggle({
                    ...toggle,
                    dataActiveVoucher: res.data
                })
            })
    }

    return (
        <div>
            <h1 className="title-voucher">
                Active Voucher
            </h1>
            <Button type="dashed" size='large' className="go-stop-voucher">
                <Link to='/a/voucher/stop'>
                    Go to list stop Voucher
                </Link>
            </Button>
            <Table rowKey={() => uuid()} columns={column} loading={toggle.dataActiveVoucher.length === 0 ? true: false} dataSource={toggle.dataActiveVoucher}></Table>
        </div>
    )
}
export default ActiveVoucher