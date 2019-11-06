import React from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Divider, Table } from 'antd';
import moment from 'moment';
import { dateFormat, formatOfDateFromDB } from '../../constant';
export const ListPolicy = ({
    isFetching,
    dispatch,
    policies = [],
    requestDeleteComboPolicy
}) => {

    const handleDeletePolicy = id => {
        dispatch(requestDeleteComboPolicy(id)).then(res => {
            console.log(res)
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'policy_name',
            key: 'policy_name',
        },
        {
            title: 'Extra',
            dataIndex: 'extra_percent',
            key: 'extra_percent',
            render: extra_percent => extra_percent + '%'
        },
        {
            title: 'Vouchers percent',
            dataIndex: 'voucher_percent',
            key: 'voucher_percent',
            render: (voucher_percent = []) => voucher_percent.join('%, ') + '%'
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: isDeleted => (
                <>
                    {!isDeleted ?
                        <Badge status="success" text="active" /> :
                        <Badge status="error" text="stop" />
                    }
                </>
            )
        },
        {
            title: 'Create',
            key: 'createAt',
            dataIndex: 'createdAt',
            render: createAt => {
                return moment(createAt, formatOfDateFromDB).format(dateFormat)}
        },
        {
            title: 'Update',
            key: 'updateAt',
            dataIndex: 'createdAt',
            render: updateAt => moment(updateAt, formatOfDateFromDB).format(dateFormat)
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {

                return (
                    <div className="action">
                        {!record.isDeleted && (
                            <>
                                <span className="action-delete"
                                onClick={() => handleDeletePolicy(record._id)}
                                >delete</span>
                                <Divider type="vertical" />
                            </>
                        )}
                        <NavLink
                            activeClassName="action--active"
                            to={`/a/policy/edit/${record._id}`}>edit</NavLink>
                    </div>
                )
            }
        }
    ];
    return (
        <div className="list-policy">
            <Table
                expandedRowRender={record => record.description}
                loading={isFetching}
                rowKey={record => record._id}
                columns={columns}
                dataSource={policies.length === 0 ? null : policies}
            />
        </div>
    )
}