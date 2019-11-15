import React from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Divider, Table, message } from 'antd';
import moment from 'moment';
import { dateFormat, formatOfDateFromDB, limitDelete } from '../../constant';
import { comboStatus } from '../../constant/combo';
export const ListPolicy = ({
    isFetching,
    dispatch,
    policies = [],
    requestDeleteComboPolicy
}) => {

    const handleDeletePolicy = record => {
        const limitDate = moment(record.createdAt).add(limitDelete, 'years');
        const curr = Date.now()
        if(curr >= limitDate.valueOf()) {
        dispatch(requestDeleteComboPolicy(record._id)).then(res => {
            switch (res) {
                case 201:
                    message.success(`Delete success`)
                    break;
                default:
                    message.error(`Delete failed`)
                    break;
            }
        })
    } else {
        message.error('Delete failed',1)
        message.warn('Current date must be gearter than '+ limitDate.format(dateFormat), 2);
    }
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
                                    onClick={() => handleDeletePolicy(record)}
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