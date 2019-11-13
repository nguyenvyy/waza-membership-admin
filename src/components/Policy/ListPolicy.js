import React from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Divider, Table, message } from 'antd';
import moment from 'moment';
import { dateFormat, formatOfDateFromDB } from '../../constant';
import { comboStatus } from '../../constant/combo';
export const ListPolicy = ({
    isFetching,
    dispatch,
    policies = [],
    requestDeleteComboPolicy
}) => {

    const handleDeletePolicy = id => {
        dispatch(requestDeleteComboPolicy(id)).then(res => {
            switch (res && res.status) {
                case 201:
                    message.success(`Delete success`)
                    break;
                case 400:
                    message.error(`Delete failed`)
                    break;
                default:
                    message.error(`Delete failed`)
                    break;
            }
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
            render: extra_percent => extra_percent + '%',
            sorter: (a, b) => a.extra_percent - b.extra_percent

        },
        {
            title: 'Vouchers percent',
            dataIndex: 'voucher_percent',
            key: 'voucher_percent',
            render: (voucher_percent = []) => voucher_percent.join('%, ') + '%',
            sorter: (a, b) => a.voucher_percent.length - b.voucher_percent.length
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: isDeleted => (
                <>
                    {!isDeleted ?
                        <Badge status="success" text={comboStatus.active} /> :
                        <Badge status="error" text={comboStatus.deleted} />
                    }
                </>
            ),
            filters: [
                { text: comboStatus.active, value: false },
                { text: comboStatus.deleted, value: true },
            ],
            onFilter: (value, record) => record.isDeleted === value,
        },
        {
            title: 'Create',
            key: 'createAt',
            dataIndex: 'createdAt',
            render: createAt => moment(createAt, formatOfDateFromDB).format(dateFormat),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        },
        {
            title: 'Update',
            key: 'updateAt',
            dataIndex: 'createdAt',
            render: updateAt => moment(updateAt, formatOfDateFromDB).format(dateFormat),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
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
                                <NavLink
                                    activeClassName="action--active"
                                    to={`/a/policy/edit/${record._id}`}>edit</NavLink>
                            </>
                        )}
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