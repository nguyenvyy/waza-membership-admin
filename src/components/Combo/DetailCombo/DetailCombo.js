import React, { useMemo } from 'react'
import { Button, Icon, Descriptions, Badge } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'

import './DetailCombo.scss'
import { Header } from '../Header/Header'
import { PageLoading } from '../../common/PageLoading/PageLoading'
import { ComboNotFound } from './CompoNotFound'



const DetailCombo = ({ combo = {}, history, isFetching }) => {
    const { id, combo_name, description, value, state, from_date, to_date, voucher_array, isDeleted, days} = combo
    const goBack = () => history.goBack()
    const goEditCombo = () => history.push(`/a/combo/edit/${id}`)

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
                (isFetching === false) ? (
                    (id === undefined) ? <ComboNotFound /> :(
                    <>
                        <div className="">
                            <Descriptions title={combo_name} bordered  >
                                <Descriptions.Item label="Id" span={3}>{id}</Descriptions.Item>
                                <Descriptions.Item label="Duration">{days} Ngày</Descriptions.Item>
                                <Descriptions.Item label="From Date">{from_date}</Descriptions.Item>
                                <Descriptions.Item label="To Date">{to_date}</Descriptions.Item>
                                <Descriptions.Item label="Price" >{value}</Descriptions.Item>
                                <Descriptions.Item label="Status" span={2}>
                                    <Badge status={status.processing} text={status.text} />
                                </Descriptions.Item>
                                <Descriptions.Item label="Vouchers" span={3}>
                                    <ul>
                                        {voucher_array.map((voucher, index) => <li key={index}> {voucher.voucher_id} x {voucher.count}  </li>)}
                                    </ul>
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
                ) : (<PageLoading />)
            }
        </div>
    )
}
export default DetailCombo