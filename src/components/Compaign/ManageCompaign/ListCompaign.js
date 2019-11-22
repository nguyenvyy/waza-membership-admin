import React from 'react'
import { Table } from 'antd'

export const ListCompaign = ({ compaigns }) => {


    const tableConfig = {
        pagination: false,
        size: 'small',
        rowKey: (record) => record._id,
        scroll: { y: 650 },
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'campaign_name',
            width: 100,
        },
        {
            title: 'From',
            dataIndex: 'from_date',
            width: 100,
        },
        {
            title: 'To',
            dataIndex: 'to_date',
            width: 100,
        },
        {
            title: 'Vouchers',
            dataIndex: 'vouchers',
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            width: 100,
        }
    ]
    return (
        <div className="list-compaign">
            <Table
                {...tableConfig}
                columns={columns}
                dataSource={compaigns.length > 0 ? compaigns : null}
            />
        </div>
    )
}