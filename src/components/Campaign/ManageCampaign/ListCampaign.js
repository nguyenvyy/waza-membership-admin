import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Badge, Divider, message } from 'antd'
import moment from 'moment'
import { dateFormat, limitDelete } from '../../../constant'
import { comboStatus } from '../../../constant/combo'
import { checkStatusCampaign } from '../../../redux/selectors/campaign-selector'
import { requestDeleteCampaign, requestStopCampaign } from '../../../redux/actions/campaign-actions/actions'

export const ListCampaign = ({ campaigns, isFetching }) => {
    // ref dispatch to reducer
    const dispatch = useDispatch()

    // handle delete Campaign
    const deleteCampaign = campaign => {
        // calculate limit delete date
        const limitDate = moment(campaign.createdAt).add(limitDelete, 'years');
        const curr = Date.now()
        if (curr <= limitDate.valueOf()) {
            // start loading effect
            const hide = message.loading('Delete campaign....');
            // send request delete
            dispatch(requestDeleteCampaign(campaign._id))
                .then(_ => {
                    message.success(`${campaign.campaign_name} deleted`, 1);
                })
                .catch(_ => {
                    message.error(`Delete failed`, 1);
                }) // stop loading effect
                .finally(hide)
        } else {
            message.error('Delete failed', 1)
            message.warn('Current date must be gearter than ' + limitDate.format(dateFormat), 2);
        }
    }
    // handle stop Campaign
    const stopCampaign = campaign => {
        // start loading effect
        const hide = message.loading('Stop campaign....');
        // send request stop
        dispatch(requestStopCampaign(campaign._id))
            .then(_ => {
                message.success(`${campaign.campaign_name} stoped`, 1);
            })
            .catch(_ => {
                message.error(`Stop failed`, 1);
            }) // stop loading effect
            .finally(hide)
    }
    // table config
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
            align: 'center',
            width: 100,
        },
        {
            title: 'From',
            dataIndex: 'from_date',
            render: date => moment(date).format(dateFormat),
            width: 100,
        },
        {
            title: 'To',
            dataIndex: 'to_date',
            render: date => moment(date).format(dateFormat),
            align: 'center',
            width: 100,
        },
        {
            title: 'Voucher count',
            dataIndex: 'vouchers',
            render: vouchers => vouchers.length,
            align: 'center',
            width: 100,
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
                    <span>
                        {/* <Link to={`/a/combo/detail/${record._id}`} onClick={() => receiveDetailCombo(record)}>view</Link> */}
                        {(status.text === comboStatus.stop || status.text === comboStatus.wait) && (
                            <>
                                <Divider type="vertical" />
                                {/* <Link to={`/a/combo/edit/${record._id}`} onClick={() => receiveDetailCombo(record)}>edit</Link> */}
                            </>)
                        }
                        {status.text === comboStatus.active ? (
                            <>
                                <Divider type="vertical" />
                                <span onClick={() => stopCampaign(record)} className="fake-link" >stop</span>
                            </>
                        ) : null}
                        {status.text !== comboStatus.stop && (
                            <>
                                <Divider type="vertical" />
                                <span onClick={() => deleteCampaign(record)} className="fake-link">delete</span>
                            </>
                        )}
                    </span>)
            },
            width: 200
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