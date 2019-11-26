import React, { useState, useMemo, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Table, Descriptions, Badge } from 'antd'
import moment from 'moment'

import { Header } from '../../common/Header/Header'
import { getVoucherById } from '../../../redux/actions/voucherx-actions/services'
import { checkStatusCampaign } from '../../../redux/selectors/campaign-selector'
import { dateFormat } from '../../../constant'

export const CampaignDetail = ({ location: { state } }) => {
    const [campaign, setCampaign] = useState({
        campaign_name: '',
        from_date: undefined,
        to_date: undefined,
        description: '',
        vouchers: [],
    })
    useEffect(() => {
        if (state !== undefined) {
            setCampaign({ ...state, from_date: moment(state.from_date), to_date: moment(state.to_date) })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])
    const [displayVouchers, setDisplayVouchers] = useState({})
    const [loadingVouchers, setLoadingVouchers] = useState(false)
    useEffect(() => {
        // check state
        if (state !== undefined) {
            //start loading effect
            setLoadingVouchers(true)
            // fetch list voucher when not select  voucher
            Promise.all(state.vouchers.map(id => getVoucherById(id).then(res => res.data)))
                .then(vouchers => {
                    setDisplayVouchers(vouchers)
                    //top loading effect
                    setLoadingVouchers(false)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const vouchersDetail = useMemo(() => {
        return Object.values(displayVouchers).flat()
    }, [displayVouchers])



    // config table
    const tableConfig = {
        pagination: false,
        size: 'small',
        rowKey: (record) => record._id,
        scroll: { y: 350 },
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'voucher_name',
            key: 'voucher_name',
            width: 100,
        },
        {
            title: 'Service',
            dataIndex: 'subcategory',
            key: 'subcategory',
            width: 100,
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            width: 60,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: 100,
            sorter: (a, b) => a.value - b.value
        },
        {
            title: '%',
            dataIndex: 'discount',
            key: 'discount',
            width: 40,
            sorter: (a, b) => a.discount - b.discount
        }
    ]
    const status = checkStatusCampaign(campaign)
    return state === undefined ? (
        <Redirect to="/a/campaign/manage" />
    ) : (
            <div className="add-campaign">
                <Header className="add-campaign__title" title="Campaign Detail" />
                <div className="add-campaign__form">
                    <Descriptions layout="vertical" title={campaign.campaign_name} bordered>
                        <Descriptions.Item label="Status">
                            <Badge status={status.processing} text={status.text} />
                        </Descriptions.Item>
                        <Descriptions.Item label="From date">
                            {moment(campaign.from_date).format(dateFormat)}
                        </Descriptions.Item>
                        <Descriptions.Item label="To date">
                            {moment(campaign.to_date).format(dateFormat)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={3}>
                            {campaign.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Vouchers" span={3}>
                            <Table
                                loading={loadingVouchers}
                                {...tableConfig}
                                dataSource={vouchersDetail.length > 0 ? vouchersDetail : null}
                                columns={columns} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        )
}