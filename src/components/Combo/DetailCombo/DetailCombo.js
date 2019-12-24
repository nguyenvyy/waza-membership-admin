import React, { useEffect } from 'react'
import { Button, Icon, Descriptions, Badge, Tag, Table } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import uuid from 'uuid'

import './DetailCombo.scss'
import { Header } from '../Header/Header'
import { PageLoading } from '../../common/PageLoading/PageLoading'
import { ComboNotFound } from '../CompoNotFound'
import { checkStatusCombo } from '../../../utils/combo'
import moment from 'moment'
import { dateFormat } from '../../../constant'
import { comboStatus } from '../../../constant/combo'
import { useState } from 'react'
import { getComboPolicyByIdAPI } from '../../../redux/actions/policy-actions/service'
import { formatVND } from '../../../utils'
import { Link } from 'react-router-dom'
import { getQuantitySoldOfComboAPI } from '../../../redux/actions/combo-actions/services'




const DetailCombo = ({
    combo, history, match, isFetching, isFetchingVoucher, fetchDetailCombo,
    isMaxPageVoucher, fetchVouchers }) => {
    const { _id, combo_name, description, value, from_date, to_date, voucher_array, days, policy_id } = combo
    useEffect(() => {
        if (_id === undefined) fetchDetailCombo(match.params.id)
    }, [_id, fetchDetailCombo, match.params.id])
    const [policy, setPolicy] = useState(null)
    useEffect(() => {
        if (policy_id !== undefined) {
            getComboPolicyByIdAPI(policy_id).then(res => {
                setPolicy({ ...res.data })
            })
        }
    }, [policy_id])
    const [quantitySold, setQuantitySold] = useState(null)
    useEffect(() => {
        if (_id !== undefined) {
            getQuantitySoldOfComboAPI(_id).then(res => {
                setQuantitySold(res)
            })
        }
    }, [_id])
    const goBack = () => history.goBack()
    const goEditCombo = () => history.push(`/a/combo/edit/${_id}`)
    useEffect(() => {
        if (!isMaxPageVoucher)
            fetchVouchers({ page: 0, limit: 9999 })
    }, [fetchVouchers, isMaxPageVoucher])
    const status = checkStatusCombo(combo)
    const canEdit = status.text === comboStatus.wait || status.text === comboStatus.stop

    const tableConfig = {
        pagination: false,
        size: 'small',
        rowKey: () => uuid()
    }

    const columns = [
        {
            key: 'voucher_name',
            title: 'Name',
            dataIndex: 'voucher_name',
            render: (_, record) => <Link to={`/a/voucher/detail/${record._id}`}>{record.voucher_name}</Link>
        },
        {
            key: 'category',
            title: 'Service',
            dataIndex: 'category',
        },
        {
            key: 'value',
            title: 'Value',
            dataIndex: 'value',
            render: value => formatVND(value),
        },
        {
            key: 'discount',
            title: 'Persent',
            dataIndex: 'discount',
            render: discount => `${discount}%`,
        },
        {
            key: 'count',
            title: 'Count',
            dataIndex: 'count',
            render: (count) => count,
        }
    ]

    return (
        <div className="detail-combo">
            <Header title="Detail Combo" />
            {
                (combo._id === undefined) ? (
                    isFetching ? <PageLoading /> : <ComboNotFound />
                ) : (
                        <div className="body">
                            <div className="">
                                <Descriptions title={combo_name} bordered  >
                                    <Descriptions.Item label="Duration">{days} Ngày</Descriptions.Item>
                                    <Descriptions.Item label="Start">{moment(from_date).format(dateFormat)}</Descriptions.Item>
                                    <Descriptions.Item label="End">{moment(to_date).format(dateFormat)}</Descriptions.Item>
                                    <Descriptions.Item label="Price" span={1} >{formatVND(value)}</Descriptions.Item>
                                    <Descriptions.Item label="Status" span={2} >
                                        <Badge status={status.processing} text={status.text} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Policy" span={3}>{policy !== null ? (
                                        `Extra persent: ${policy.extra_percent}, voucher persent: [${policy.voucher_percent.join('%, ')}%]`
                                    ) : (
                                            <Tag color="blue">loading...</Tag>
                                        )}</Descriptions.Item>
                                    <Descriptions.Item label="Vouchers" span={3}>
                                        <Table
                                            {...tableConfig}
                                            columns={columns}
                                            dataSource={voucher_array} loading={isFetchingVoucher} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Description" span={3}>
                                        <p className="description">
                                            {description}
                                        </p>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Quantity sold" span={3}>
                                        {quantitySold !== null ? quantitySold : <Tag color="blue">loading...</Tag>}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className="panel d-flex-center">
                                <ButtonGroup>
                                    <Button onClick={goBack} className="go-back" type="primary">
                                        Go back
                                    <Icon type="left" />
                                    </Button>
                                    <Button onClick={goEditCombo} disabled={!canEdit} className="go-back" type="primary">
                                        Edit Combo
                                    <Icon type="edit" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    )

            }
        </div>
    )
}
export default DetailCombo