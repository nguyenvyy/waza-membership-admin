import React, { useMemo, useEffect } from 'react'
import { Button, Icon, Descriptions, Badge } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'

import './DetailCombo.scss'
import { Header } from '../Header/Header'
import { PageLoading } from '../../common/PageLoading/PageLoading'
import { ComboNotFound } from '../CompoNotFound'
import VouchersDetail from '../VouchersInCombo/VouchersDetail'



const DetailCombo = ({
    combo, history, match, isFetching, isFetchingVoucher, featchDetailCombo,
    isMaxPageVoucher, featchVouchers }) => {
    const { _id, combo_name, description, value, state, from_date, to_date, voucher_array, isDeleted, days } = combo
    useEffect(() => {
        if (_id === undefined) featchDetailCombo(match.params.id)
    }, [_id, featchDetailCombo, match.params.id])
    const goBack = () => history.goBack()
    const goEditCombo = () => history.push(`/a/combo/edit/${_id}`)
    useEffect(() => {
        if (!isMaxPageVoucher)
            featchVouchers({ page: 0, limit: 9999 })
    }, [featchVouchers, isMaxPageVoucher])
    const status = useMemo(
        _ => {
            if (isDeleted) return { text: 'Đã xóa', processing: 'error' }
            if (state)
                return { text: 'Đang hoạt động', processing: 'processing' }
            else
                return { text: 'Đã dừng', processing: 'warning' }

        }, [isDeleted, state]
    )

    return (
        <div className="detail-combo">
            <Header title="Detail Combo" />
            {
                (combo._id === undefined) ? (
                    isFetching ? <PageLoading /> : <ComboNotFound />
                ) : (
                        <>
                            <div className="">
                                <Descriptions title={combo_name} bordered  >
                                    <Descriptions.Item label="Duration">{days} Ngày</Descriptions.Item>
                                    <Descriptions.Item label="From Date">{from_date}</Descriptions.Item>
                                    <Descriptions.Item label="To Date">{to_date}</Descriptions.Item>
                                    <Descriptions.Item label="Price" >{value}</Descriptions.Item>
                                    <Descriptions.Item label="Status" span={2}>
                                        <Badge status={status.processing} text={status.text} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Vouchers" span={3}>
                                        <VouchersDetail voucher_array={voucher_array} isFetchingVoucher={isFetchingVoucher} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Description" span={3}>
                                        {description}
                                    </Descriptions.Item>

                                </Descriptions>
                            </div>
                            <div className="d-flex-center">
                                <ButtonGroup>
                                    <Button onClick={goBack} className="go-back" type="primary">
                                        Go back
                                    <Icon type="left" />
                                    </Button>
                                    <Button onClick={goEditCombo} className="go-back" type="primary">
                                        Edit Combo
                                    <Icon type="edit" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </>)

            }
        </div>
    )
}
export default DetailCombo