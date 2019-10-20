import React from 'react'
import { Table } from 'antd';

const ActiveVoucher = () => {
    const column = [
        {
            key: 'STT',
            title: 'STT',
            dataIndex: 'stt',
            width: 80
        },
        {
            key: 'id',
            title: 'VoucherID',
            dataIndex: 'id'
        },
        {
            key: 'name',
            title: 'Voucher Name',
            dataIndex: 'name'
        },
        {
            key: 'fromDate',
            title: 'From Date',
            dataIndex: 'fromDate'
        },
        {
            key: 'toDate',
            title: 'To Date',
            dataIndex: 'toDate',
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => (
                <div className="action-acvoucher">
                    <p className="text">View</p>
                    <p className="text">Details</p>
                    <p className="text">Disable</p>
                </div>
            )
          }
    ]
    const dataVoucher = [
        {
            stt: '1',
            id: 'A1',
            name: 'Voucher 1',
            fromDate: '5/10/2019',
            toDate: '8/10/2019',
            description: 'This is Voucher 1',
            key: '1'
        }
    ]
    return (
        <div>
            <h1>
              Active Voucher
            </h1>
            <Table columns={column} dataSource={dataVoucher}></Table>
        </div>      
    )
}
export default ActiveVoucher