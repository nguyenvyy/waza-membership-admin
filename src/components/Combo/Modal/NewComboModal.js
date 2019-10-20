import React, { useState, useMemo, useCallback } from 'react'
import uuid from 'uuid'
import moment from 'moment'
import { Modal, Form, Input, DatePicker, Select, Button, Table, Divider, message } from 'antd'
import { Link } from 'react-router-dom'

import { SelectVoucherContainer } from '../../../redux/container/SelectVoucherContainer'

const VouchersDetail = ({ value: voucher }) => (
    <p>
        value: {voucher.value}, max value: {voucher.max_value}, persent: {voucher.discount}
    </p>
)

export const NewComboModal = ({ isOpenNewComboModal, handleCloseNewComboModal, addPostCombo }) => {
    // data new combo
    const [newCombo, setNewCombo] = useState({
        value: 0,
        combo_name: '',
        state: true,
        from_date: null,
        to_date: null,
        isDeleted: false,
        description: '',
        days: 30
    })
    // selected vouchers
    const [selectedVouchers, setSelectedVouchers] = useState({
        move: {
            value: null,
            count: 0
        },
        food: {
            value: null,
            count: 0
        },
        shopping: {
            value: null,
            count: 0
        },
    })

    const resetNewCombo = useCallback(() => {
        setNewCombo({...newCombo})
        setSelectedVouchers({...selectedVouchers})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //handle change select voucher with select in table
    const onChangeSelectedVouchers = (selectedRowKeys, selectedRows) => {
        let length = selectedRows.length;
        if (length > 0) {
            let subcategory = selectedRows[0].subcategory
            const index = selectedRows.findIndex(row => row._id === selectedRowKeys[length - 1])
            setSelectedVouchers({
                ...selectedVouchers,
                [subcategory]: {
                    count: 1,
                    value: selectedRows[index]
                }
            })
        }
    }

    const onChangeCount = (e, subcategory) => {
        const count = +e.target.value > 50 ? 50 : +e.target.value
        setSelectedVouchers({
            ...selectedVouchers,
            [subcategory]: {
                ...selectedVouchers[subcategory],
                count
            }
        })
    }
    const deleteVoucher = (e, subcategory) => {
        setSelectedVouchers({
            ...selectedVouchers,
            [subcategory]: {
                value: null,
                count: 0
            }
        })
    }
    // handle to display voucher in table selected voucher
    const objectConverttoArr = (selectedVouchers) => {
        const keys = Object.keys(selectedVouchers);
        return keys.map(key => selectedVouchers[key])
    }
    const selectedVouchersArr = useMemo(() => {
        return objectConverttoArr(selectedVouchers).filter(voucher => voucher.value !== null && voucher.count > 0)
    }, [selectedVouchers])

    // handle close/open  SelectVoucherModal
    const [isOpenSelectVoucherModal, setIsOpenSelectVoucherModal] = useState(false);
    const handleOpenSelectVoucherModal = () => {
        setIsOpenSelectVoucherModal(true);
    }
    const handleCloseSelectVoucherModal = (memoSelectVouchers) => {
        if (memoSelectVouchers !== undefined) {
            setSelectedVouchers({
                ...memoSelectVouchers
            })
        }
        setIsOpenSelectVoucherModal(false);
    }

    const handleAddVoucher = () => {
        handleOpenSelectVoucherModal()
    }


    const dateFormat = 'YYYY/MM/DD'
    const onChange = ({ target: { id, value } }) => {

        setNewCombo({ ...newCombo, [id]: value })
    }
    const onChangeState = value => {
        setNewCombo({ ...newCombo, state: value === 'true' ? true : false })
    }
    const onChangeRangePicker = ([from, to]) => {
        setNewCombo({ ...newCombo, from_date: from.format(dateFormat), to_date: to.format(dateFormat) })
    }
    const disabledDate = current => current && current <= moment().endOf('day')

    const handleAddCombo = () => {
        const hide = message.loading('Add combo....', 0);
        let voucher_array = selectedVouchersArr.map(({count, value}) => ({count, voucher_id: value._id}));
        let combo = {
            voucher_array,
            ...newCombo
        }
        addPostCombo(combo).then(res => {
            switch (res.status) {
                case 201:
                    setTimeout(hide, 100);
                    message.success('Add commo success',2)
                    resetNewCombo();
                    break;
                case 400:
                    setTimeout(hide, 100);
                    message.error('Add combo fail',2);
                    message.warning(`${res.data.message}`,3);
                    break;
                default:
                    break;
            }
        })
        
    }


    //config table vouchers
    const tableConfig = {
        pagination: false,
        size: 'small',
        expandedRowRender: VouchersDetail,
        rowKey: () => uuid()
    }
    const columns = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'value.voucher_name',
            width: 150
        },
        {
            key: 'service',
            title: 'Service',
            dataIndex: 'value.subcategory',
            width: 100
        },
        {
            key: 'count',
            title: 'Count',
            dataIndex: 'count',
            render: (count, record) => <Input type="number" value={count} onChange={(e) => onChangeCount(e, record.value.subcategory)} />,
            width: 80
        },
        {
            key: 'action',
            title: 'Action',
            render: (_, record) => (
                <span>
                    <Link className="fake-link" to={`/a/voucher/detail/${record.value._id}`}>ViewDetal</Link>
                    <Divider type="vertical" />
                    <span className="fake-link" onClick={(e) => deleteVoucher(e, record.value.subcategory)}>Delete</span>
                </span>
            ),
            width: 200
        }
    ]


    return (
        <Modal
            title="Add new combo"
            width={800}
            centered
            visible={isOpenNewComboModal}
            onOk={handleAddCombo}
            onCancel={handleCloseNewComboModal}
        >
            <div className="edit-from">
                <Form layout="horizontal" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item label="Name" wrapperCol={{ span: 4 }}>
                        <Input id="combo_name" onChange={onChange} value={`${newCombo.combo_name}`} />
                    </Form.Item>
                    <Form.Item label="Using duration" wrapperCol={{ span: 4 }}>
                        <Input id="days" onChange={onChange} value={`${newCombo.days}`} suffix="Ngày" />
                    </Form.Item>
                    <Form.Item label="Sell duration" wrapperCol={{ span: 15 }}  >
                        <DatePicker.RangePicker
                            showTime={{
                                hideDisabledOptions: true
                            }}
                            onChange={onChangeRangePicker}
                            disabledDate={disabledDate}
                            value={
                                newCombo.from_date !== null ?
                                    [moment(newCombo.from_date, dateFormat), moment(newCombo.to_date, dateFormat)] :
                                    null
                            }
                            format={'DD/MM/YYYY'}
                        />
                    </Form.Item>
                    <Form.Item label="Price" wrapperCol={{ span: 5 }}>
                        <Input
                            id="value"
                            value={newCombo.value}
                            onChange={onChange}
                            suffix="VNĐ" />
                    </Form.Item>
                    <Form.Item label="Status" wrapperCol={{ span: 5 }}>
                        <Select
                            onChange={onChangeState}
                            value="true"
                        >
                            <Select.Option value={`true`}>Đang hoạt động</Select.Option>
                            <Select.Option value={`false`}>Dừng</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description" wrapperCol={{ span: 18 }}>
                        <Input.TextArea id="description" onChange={onChange} value={newCombo.description} rows={3} />
                    </Form.Item>
                    <Form.Item label="Vouchers" wrapperCol={{ span: 20 }}>
                        <div>
                            <Button onClick={handleAddVoucher} >Add Voucher</Button>
                            {/* <span style={messages.addVoucher.style}> {messages.addVoucher.message} </span> */}
                        </div>
                        <SelectVoucherContainer
                            selectedVouchers={selectedVouchers}
                            onChangeSelectedVouchers={onChangeSelectedVouchers}
                            handleCloseSelectVoucherModal={handleCloseSelectVoucherModal}
                            isOpenSelectVoucherModal={isOpenSelectVoucherModal}
                        />
                        <Table
                            {...tableConfig}
                            dataSource={selectedVouchersArr.length > 0 ? selectedVouchersArr : null}
                            columns={columns} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}