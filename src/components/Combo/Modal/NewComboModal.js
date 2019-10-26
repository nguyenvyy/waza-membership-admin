/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import uuid from 'uuid'
import moment from 'moment'
import { Modal, Form, Input, DatePicker, Select, Button, Table, Divider, message, Icon } from 'antd'

import { SelectVoucherContainer } from '../../../redux/container/SelectVoucherContainer'
import { checkNoSymbolsOrSpecialChars, checkMinMax, checkIsNaN, checkIsInterge, checkDivideBy } from '../../../utils/validate'
import { comboLimitValue, errorMessage } from '../../../constant/combo'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { deleteformatVND, formatVND } from '../../../utils'
import { formatOfDateFromDB, dateFormat } from '../../../constant'


export const NewComboModal = ({ isOpenNewComboModal, handleCloseNewComboModal, addPostCombo }) => {

    const [formErrors, setFormErrors] = useState({
        combo_name: false,
        value: false,
        description: false,
        voucher_array: false,
        days: false
    })
    const formValid = useMemo(() => {
        return Object.values(formErrors).every(item => item === true)
    }, [formErrors])

    const handleValidate = useCallback((name, value) => {
        let isValid = false
        switch (name) {
            case 'combo_name':
                isValid = checkNoSymbolsOrSpecialChars(value) && checkMinMax(value.length, comboLimitValue.combo_name.min, comboLimitValue.combo_name.max)
                break;
            case 'days':
                isValid = !checkIsNaN(+value) && checkIsInterge(+value) && checkMinMax(+value, comboLimitValue.days.min, comboLimitValue.days.max)
                break;
            case 'description':
                isValid = checkMinMax(value.length, comboLimitValue.description.min, comboLimitValue.description.max)
                break;
            case 'voucher_array':
                // value = length 
                isValid = checkMinMax(value, comboLimitValue.voucher_array.min, 4)
                break;
            case 'value':
                isValid = !checkIsNaN(+value) && checkIsInterge(+value) && checkDivideBy(+value, 1000) && checkMinMax(+value, comboLimitValue.value.min, comboLimitValue.value.max)
                break
            default:
                break;
        }
        setFormErrors(formErrors => ({ ...formErrors, [name]: isValid }))
    }, [formErrors])
    // data new combo
    const [newCombo, setNewCombo] = useState({
        value: 0,
        combo_name: '',
        state: true,
        from_date: moment(),
        to_date: moment().add(1,"month"),
        isDeleted: false,
        description: '',
        days: 0
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
        setFormErrors({ ...formErrors })
        setNewCombo({ ...newCombo })
        setSelectedVouchers({ ...selectedVouchers })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //handle change select voucher with select in table

    const onChangeSelectedVouchers = (selectedRowKeys, selectedRows, filter) => {
        let length = selectedRows.length;
        if (length > 0) {
            const index = selectedRows.findIndex(row => row._id === selectedRowKeys[length - 1])
            setSelectedVouchers({
                ...selectedVouchers,
                [filter]: {
                    count: 1,
                    value: selectedRows[index]
                }
            })
        } else {
            setSelectedVouchers({
                ...selectedVouchers,
                [filter]: {
                    count: 0,
                    value: null
                }
            })
        }
    }

    const onChangeCount = (e, subcategory, directive) => {
        let count
        count = +e.target.value > 50 ? 50 : +e.target.value
        if (directive) {
            const newCount = selectedVouchers[subcategory].count + directive
            count = newCount > 50 ? 50 : newCount
        }
        if (count < 1) {
            count = 1
            message.warning('number of vouchers must be greater than 1', 1)
        }
        setSelectedVouchers({
            ...selectedVouchers,
            [subcategory]: {
                ...selectedVouchers[subcategory],
                count
            }
        })
    }
    const handleDeleteVoucher = (e, subcategory) => {
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
    useEffect(() => {
        handleValidate('voucher_array', selectedVouchersArr.length)
    }, [selectedVouchersArr.length])
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


    const onChange = ({ target: { name, value } }) => {
        value = value.trimStart()
        if (name === 'value') {
            value = deleteformatVND(value)
        }
        setNewCombo({ ...newCombo, [name]: value })
        handleValidate(name, value)
    }
    const onChangeState = value => {
        setNewCombo({ ...newCombo, state: value === 'true' ? true : false })
    }
    const onChangeRangePicker = ([from, to]) => {
        setNewCombo({ ...newCombo, from_date: from.format(formatOfDateFromDB), to_date: to.format(formatOfDateFromDB) })
    }
    const onCalendarChange = ([to]) => {
        setNewCombo({ ...newCombo, from_date: moment().format(formatOfDateFromDB), to_date:  to.format(formatOfDateFromDB) })
    }
    const disabledDate = current => current && current <= moment().endOf('day')

    const handleAddCombo = () => {
        const hide = message.loading('Add combo....', 0);
        let voucher_array = selectedVouchersArr.map(({ count, value }) => ({ count, voucher_id: value._id }));
        let combo = {
            voucher_array,
            ...newCombo
        }
        addPostCombo(combo).then(res => {
            switch (res && res.status) {
                case 201:
                    setTimeout(hide, 100);
                    message.success(`${combo.combo_name} added`, 2)
                    resetNewCombo();
                    break;
                case 400:
                    setTimeout(hide, 100);
                    message.error('Add combo fail', 2);
                    message.warning(`${res.data.message}`, 3);
                    break;
                default:
                    message.error('Unknown Error', 2);
                    setTimeout(hide, 50);
                    break;
            }
        })

    }


    //config table vouchers
    const tableConfig = {
        pagination: false,
        size: 'small',
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
                    <Icon type="plus-circle" className="pointer fake-link" onClick={(e) => onChangeCount(e, record.value.subcategory, 1)} />
                    <Divider type="vertical" />
                    <Icon type="minus-circle" className="pointer fake-link" onClick={(e) => onChangeCount(e, record.value.subcategory, -1)} />
                    <Divider type="vertical" />
                    <span className="fake-link" onClick={(e) => handleDeleteVoucher(e, record.value.subcategory)}>delete</span>
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
            footer={[
                <Button key="cancel" onClick={handleCloseNewComboModal} className="go-back" type="primary">
                    Cancel
                </Button>,
                <Button key="save" onClick={handleAddCombo} disabled={!formValid} className="go-back" type="primary">
                    Save
                    <Icon type="save" />
                </Button>
            ]}
        >
            <div className="edit-from">
                <Form layout="horizontal" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item label="Name" wrapperCol={{ span: 15 }}>
                        <Input name="combo_name" onChange={onChange} value={`${newCombo.combo_name}`} />
                        <ErrorMessage hasError={!formErrors.combo_name} message={errorMessage.combo_name} />
                    </Form.Item>
                    <Form.Item label="Using duration" >
                        <Form.Item wrapperCol={{ span: 4 }}  >
                            <Input name="days" onChange={onChange} value={`${newCombo.days}`} suffix="Ngày" />
                        </Form.Item>
                        <ErrorMessage hasError={!formErrors.days} message={errorMessage.days} />
                    </Form.Item>
                    <Form.Item label="Sell duration" wrapperCol={{ span: 15 }}  >
                        <DatePicker.RangePicker
                            onChange={onChangeRangePicker}
                            disabledDate={disabledDate}
                            onCalendarChange={onCalendarChange}
                            value={
                                newCombo.from_date !== null ?
                                    [moment(newCombo.from_date, formatOfDateFromDB), moment(newCombo.to_date, formatOfDateFromDB)] :
                                    null
                            }
                            format={dateFormat}
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Form.Item wrapperCol={{ span: 8 }}  >
                        <Input
                            name="value"
                            value={formatVND(newCombo.value)}
                            onChange={onChange}
                            suffix="VNĐ" />
                        </Form.Item>
                        <ErrorMessage hasError={!formErrors.value} message={errorMessage.value} />
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
                    <Form.Item label="Description"   >
                        <Input.TextArea name="description" onChange={onChange} value={newCombo.description} rows={4}/>
                        <ErrorMessage hasError={!formErrors.description} message={errorMessage.description} />
                    </Form.Item>
                    <Form.Item label="Vouchers" wrapperCol={{ span: 20 }}>
                        <div>
                            <Button onClick={handleAddVoucher} >Add Voucher</Button> {'  '}
                            <ErrorMessage hasError={!formErrors.voucher_array} message={errorMessage.voucher_array} />
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