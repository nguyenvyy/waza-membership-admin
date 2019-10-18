import React, { useState, useEffect } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group'
import { Button, Icon, Input, Form, DatePicker, Select, Table, Divider } from 'antd'

import { Header } from '../Header/Header'
import { formatVND } from '../../../utils'
import { checkPositiveNumber, checkDivideBy } from '../../../utils/validate'

const VouchersDetail = voucher => <p>voucher</p>

const EditCombo = ({ combo, history }) => {
    const [changedCombo, setChangedCombo] = useState({
        id: '',
        value: 0,
        combo_name: '',
        state: true,
        from_date: null,
        to_date: null,
        isDeleted: false,
        voucher_array: [],
        description: '',
        days: 30
    })
    useEffect(() => {
        combo && setChangedCombo({ ...combo, days: 3000 })
    }, [combo])

    const tableConfig = {
        pagination: false,
        size: 'small',
        expandedRowRender: VouchersDetail,
        rowKey: () => uuid()
    }
    const columns = [
        {
            key: 'id',
            title: 'ID',
            render: (_, record) => <p>{record.count}</p>,
            width: 50
        },
        {
            key: 'name',
            title: 'Name',
            render: (_, record) => <p>{record.count}</p>,
            width: 100
        },
        {
            key: 'service',
            title: 'Service',
            render: (_, record) => <p>{record.count}</p>,
            width: 100
        },
        {
            key: 'count',
            title: 'Count',
            render: (_, record) => <p>{record.count}</p>,
            width: 100
        },
        {
            key: 'action',
            title: 'Action',
            render: (_) => (
                <span>
                    <Link to={`/a/voucher/detail/1`}>View Detail</Link>
                    <Divider type="vertical" />
                    <span className="fake-link">Delete</span>
                </span>
            ),
            width: 200
        }
    ]


    const onSubmit = e => {
        e.preventDefault();

    }
    const goBack = () => history.goBack()
    const disabledDate = current => current && current <= moment().endOf('day')
    const onChange = ({target: {id, value}}) => {

        setChangedCombo({...changedCombo, [id]: value})
    }
    const onChangeState = value => {
        setChangedCombo({...changedCombo, state: value === 'true' ? true : false})
    }

    const validateForm = () => {
        let result = checkPositiveNumber(changedCombo.days)
        let result2 = checkPositiveNumber(changedCombo.value)
        let result3 = checkDivideBy(+changedCombo.value, 1000)
        console.log(result, result2, result3,changedCombo.value)
    }
    
    const dateFormat = 'DD/MM/YYYY' 
    const onChangeRangePicker  = ([from, to]) => {
        setChangedCombo({...changedCombo, from_date: from.format(dateFormat), to_date: to.format(dateFormat)})
    }
    return (
        <div className="edit-combo">
            <Header title="Edit Combo" />
            <div className="edit-from">
                <Form layout="horizontal" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onSubmit={onSubmit}>
                    <Form.Item label="ID" wrapperCol={{ span: 4 }}>
                        <Input disabled value={changedCombo.id} />
                    </Form.Item>
                    <Form.Item label="Using duration" wrapperCol={{ span: 4 }}>
                        <Input id="days" onChange={onChange} value={`${changedCombo.days}`} suffix="Ngày" />
                    </Form.Item>
                    <Form.Item label="Sell duration" wrapperCol={{ span: 15 }}  >
                        <DatePicker.RangePicker
                            showTime={{
                                hideDisabledOptions: true
                            }}
                            onChange={onChangeRangePicker}
                            disabledDate={disabledDate}
                            value={
                                changedCombo.from_date !== null ?
                                    [moment(changedCombo.from_date, dateFormat), moment(changedCombo.to_date, dateFormat)] :
                                    null
                            }
                            format={'DD/MM/YYYY'}
                        />
                    </Form.Item>
                    <Form.Item label="Price" wrapperCol={{ span: 5 }}>
                        <Input
                            id="value"
                            value={formatVND(`${changedCombo.value}`)}
                            onChange={onChange}
                            suffix="VNĐ" />
                    </Form.Item>
                    <Form.Item label="Status" wrapperCol={{ span: 5 }}>
                        <Select
                            onChange={onChangeState}
                            value={`${changedCombo.state}`}
                        >
                            <Select.Option value={`true`}>Đang hoạt động</Select.Option>
                            <Select.Option value={`false`}>Dừng</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description" wrapperCol={{ span: 18 }}>
                        <Input.TextArea id="description" onChange={onChange} value={changedCombo.description} rows={3} />
                    </Form.Item>
                    <Form.Item label="Vouchers" wrapperCol={{ span: 20 }}>
                        <Button>Add Voucher</Button>
                        <Table
                            {...tableConfig}
                            dataSource={changedCombo.voucher_array.length > 0 ? changedCombo.voucher_array : null}
                            columns={columns} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="d-flex-center">
                <ButtonGroup>
                    <Button onClick={goBack} className="go-back" type="primary">
                        Go back
                        <Icon type="left" />
                    </Button>
                    <Button onClick={validateForm} className="go-back" type="primary">
                        Save
                        <Icon type="save" />
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default EditCombo