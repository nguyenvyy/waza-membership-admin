import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Table, Badge, Divider, message, Button, Icon, Input } from 'antd'
import moment from 'moment'
import { dateFormat, limitDelete } from '../../../constant'
import { comboStatus } from '../../../constant/combo'
import { checkStatusCampaign } from '../../../redux/selectors/campaign-selector'
import { requestDeleteCampaign, requestStopCampaign } from '../../../redux/actions/campaign-actions/actions'

export const ListCampaign = ({ campaigns, isFetching }) => {
    // ref dispatch to reducer
    const dispatch = useDispatch()

    // handle delete Campaign
    const deleteCampaign = (campaign, status) => {
        if (status === comboStatus.wait) {
            const hiden = message.loading('Delete campaign....');
            // send request delete
            dispatch(requestDeleteCampaign(campaign._id))
                .then(status => {
                    switch (status) {
                        case 200:
                            message.success(`${campaign.campaign_name} deleted`, 1);
                            break;
                        default:
                            message.error(`Delete failed`, 1);
                            break;
                    }
                    hiden()
                })
            return
        }
        // calculate limit delete date
        const limitDate = moment(campaign.createdAt).add(limitDelete, 'years');
        const curr = Date.now()
        if (curr >= limitDate.valueOf()) {
            // start loading effect
            const hiden = message.loading('Delete campaign....');
            // send request delete
            dispatch(requestDeleteCampaign(campaign._id))
                .then(status => {
                    switch (status) {
                        case 200:
                            message.success(`${campaign.campaign_name} deleted`, 1);
                            break;
                        default:
                            message.error(`Delete failed`, 1);
                            break;
                    }
                    hiden()
                })
        } else {
            message.warn('Current date must be gearter than ' + limitDate.format(dateFormat), 2);
        }
    }
    // handle stop Campaign
    const stopCampaign = campaign => {
        // start loading effect
        const hiden = message.loading('Stop campaign....');
        // send request stop
        dispatch(requestStopCampaign(campaign._id))
            .then(status => {
                switch (status) {
                    case 200:
                        message.success(`${campaign.campaign_name} stoped`, 1);
                        break;
                    default:
                        message.error(`Stop failed`, 1);
                        break;
                }
                hiden();
            })
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

    // table config
    const tableConfig = {
        pagination: false,
        size: 'small',
        rowKey: (record) => record._id,
        scroll: { y: 500 },
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'campaign_name',
            align: 'center',
            width: 150,
            ...getColumnSearchProps('campaign_name')
        },
        {
            title: 'Start',
            dataIndex: 'from_date',
            render: date => moment(date).format(dateFormat),
            width: 100,
            sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date)
        },
        {
            title: 'End',
            dataIndex: 'to_date',
            render: date => moment(date).format(dateFormat),
            align: 'center',
            width: 100,
            sorter: (a, b) => new Date(a.to_date) - new Date(b.to_date)
        },
        {
            title: 'Voucher count',
            dataIndex: 'vouchers',
            render: vouchers => vouchers.length,
            align: 'center',
            width: 100,
            sorter: (a, b) => a.length - b.length
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'state',
            width: 150,
            render: (_, record) => {
                const status = checkStatusCampaign(record)
                return <Badge status={status.processing} text={status.text} />
            },
            filters: [
                { text: comboStatus.active, value: comboStatus.active },
                { text: comboStatus.stop, value: comboStatus.stop },
                { text: comboStatus.deleted, value: comboStatus.deleted },
                { text: comboStatus.wait, value: comboStatus.wait }
            ],
            onFilter: (value, record) => checkStatusCampaign(record).text === value,
        },
        {
            key: 'action',
            title: 'Action',
            render: record => {
                const status = checkStatusCampaign(record)
                return (
                    <div className="action">
                        <NavLink
                            activeClassName="action--active"
                            to={{
                                pathname: `/a/campaign/manage/detail/${record._id}`,
                                state: record
                            }}>view</NavLink>
                        {(status.text === comboStatus.stop || status.text === comboStatus.wait) && (
                            <>
                                <Divider type="vertical" />
                                <NavLink
                                    activeClassName="action--active"
                                    to={{
                                        pathname: `/a/campaign/manage/edit/${record._id}`,
                                        state: record
                                    }}
                                >edit</NavLink>
                                <Divider type="vertical" />
                                <span onClick={() => deleteCampaign(record, status.text)} className="fake-link">delete</span>
                            </>)
                        }
                        {status.text === comboStatus.active ? (
                            <>
                                <Divider type="vertical" />
                                <span onClick={() => stopCampaign(record)} className="fake-link" >stop</span>
                            </>
                        ) : null}
                    </div>)
            },
            width: 150
        }
    ]
    return (
        <div className="list-campaign">
            <Table
                loading={isFetching}
                {...tableConfig}
                columns={columns}
                dataSource={campaigns.length > 0 ? campaigns : null}
            />
        </div>
    )
}