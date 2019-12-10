import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Divider, Table, message, Icon, Button, Input } from 'antd';
import moment from 'moment';
import { dateFormat, limitDelete } from '../../constant';
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

    // search with property
    const [search, setSearch] = useState('');
    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearch({ searchText: selectedKeys[0] });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearch({ searchText: '' });
    };
    // handle search
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        setSearch(node);
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => search.select());
            }
        }
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'policy_name',
            key: 'policy_name',
            ...getColumnSearchProps('policy_name')
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
            render: createAt => moment(createAt).format(dateFormat),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        },
        {
            title: 'Update',
            key: 'updateAt',
            dataIndex: 'createdAt',
            render: updateAt => moment(updateAt).format(dateFormat),
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