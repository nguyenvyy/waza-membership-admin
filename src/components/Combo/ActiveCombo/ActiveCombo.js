import React from 'react'
import uuid from 'uuid'
import { Table, Divider } from 'antd';

import './ActiveCombo.scss'

const ActiveCombo = ({ combos }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: uuid()
        },
        {
            title: 'Name',
            dataIndex: 'id',
            key: uuid(),
            render: id => `Name ${id}`
        },
        {
            title: 'From',
            dataIndex: 'fromDate',
            key: uuid()
        },
        {
            title: 'To',
            dataIndex: 'toDate',
            key: uuid()
        },
        {
            title: 'Voucher',
            dataIndex: 'voucherIdArray',
            key: uuid(),
            render: voucherIdArray => (
                <ul>
                    {voucherIdArray.map(item => <li>{item}</li>)}
                </ul>
                )
        },
        {
            title: 'Action',
            key: uuid(),
            render: (_, record) => (
                <span>
                    <span className="fake-link" >View Detail {record.id}</span>
                    <Divider type="vertical" />
                    <span className="fake-link">Stop</span>
                </span>
            )
        }
    ]
    console.log(combos)
    return (
        <div className="active-combos">
            <h1 >Active Combos</h1>
            <hr />
            <div>
                <span>search: </span>
                <input />
            </div>
            <div className="combo-list">
                <Table rowKey={() => uuid()} dataSource={combos} columns={columns} />
            </div>
        </div>
    )
}

export default ActiveCombo