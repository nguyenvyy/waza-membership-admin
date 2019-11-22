import React, { useState, useMemo, useEffect } from 'react'
import { Header } from '../../common/Header/Header'
import { Form, Input, DatePicker, Button } from 'antd'
import { checkMinMax } from '../../../utils/validate'
import { dateFormat } from '../../../constant'
import moment from 'moment'

export const AddCompaign = () => {


    const [compaign, setCompaign] = useState({
        campaign_name: '',
        from_date: undefined,
        to_date: undefined,
        description: '',
        vouchers: [],
    })

    const [visibleSelectVoucherModal, setVisibleSelectVoucherModal] = useState(false)
    const open = () => setVisibleSelectVoucherModal(true)
    const close = () => setVisibleSelectVoucherModal(false)
    const hasError = useMemo(() => {
        const errors = {
            campaign_name: checkMinMax(compaign.campaign_name.length, 5, 50) === true ? false : true,
            from_to: (compaign.from_date !== undefined && compaign.to_date !== undefined) ? false : true,
            description: checkMinMax(compaign.description.length, 20, 200) === true ? false : true,
            vouchers: checkMinMax(compaign.vouchers.length, 5, 20)
        }
        const noErrors = Object.values(errors).every(item => item === false)
        return {
            ...errors,
            noErrors
        }
    }, [compaign])

    const onChangeCompaign = ({ target: { name, value } }) => {
        setCompaign({
            ...compaign,
            [name]: value
        })
    }

    const disabledDate = current => current && current <= moment().endOf('day')
    const onChangeRangePicker = ([from, to]) => {
        setCompaign({
            ...compaign,
            from_date: from,
            to_date: to
        })
    }

    const onCalendarChange = ([to]) => {
        if(to) {
            setCompaign({
                ...compaign,
                from_date: moment(),
                to_date: to
            })
        }
    }

    return (
        <div className="add-compaign">
            <Header className="add-compaign__title" title="Add new compaign" />
            <div className="add-compaign__form">
                <Form layout="vertical">
                    <Form.Item label="Name"
                        help={hasError.campaign_name && "Name must be from 5 to 50 character"}
                        hasFeedback
                        validateStatus={hasError.campaign_name ? 'error' : 'success'}
                    >
                        <Input name="campaign_name" onChange={onChangeCompaign} value={compaign.campaign_name} />
                    </Form.Item>
                    <Form.Item label="Description"
                        help={hasError.description && "Description must be from 20 to 200 character"}
                        validateStatus={hasError.description ? 'error' : 'success'}
                    >
                        <Input.TextArea rows={3} name="description" onChange={onChangeCompaign} value={compaign.description} />
                    </Form.Item>
                    <Form.Item label="From date - To date"
                    help={hasError.from_to && "From date, to date must be not null"}
                    validateStatus={hasError.from_to ? 'error' : 'success'}
                    >
                        <DatePicker.RangePicker
                            disabledDate={disabledDate}
                            onCalendarChange={onCalendarChange}
                            format={dateFormat}
                            onChange={onChangeRangePicker}
                            value={[compaign.from_date, compaign.to_date]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button>add vouchers</Button>
                        
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}