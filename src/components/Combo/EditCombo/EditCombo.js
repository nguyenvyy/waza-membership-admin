/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react'
import uuid from 'uuid'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group'
import { Button, Icon, Input, Form, DatePicker, Select, Table, Divider, message } from 'antd'

import './EditCombo.scss'
import { Header } from '../Header/Header'
import { ComboNotFound } from '../CompoNotFound'
import { SelectVoucherContainer } from '../../../redux/container/SelectVoucherContainer'
import { PageLoading } from '../../common/PageLoading/PageLoading'
import { formatOfDateFromDB, dateFormat } from '../../../constant'
import { useVouchersDetailInCombo } from '../../../hooks/useVouchersDetailInCombo'
import { objectConverttoArr } from '../../../utils/combo'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { errorMessage, comboLimitValue } from '../../../constant/combo'
import { checkNoSymbolsOrSpecialChars, checkMinMax, checkIsNaN, checkIsInterge, checkDivideBy } from '../../../utils/validate'
import { formatVND, deleteformatVND } from '../../../utils'


const EditCombo = ({
    combo, history, match, featchDetailCombo, editPatchCombo, isFetching,
    isMaxPageVoucher, featchVouchers
}) => {
    useEffect(() => {
        if (!isMaxPageVoucher)
            featchVouchers({ page: 0, limit: 9999 })
    }, [featchVouchers, isMaxPageVoucher])

    const [formErrors, setFormErrors] = useState({
        combo_name: true,
        value: true,
        description: true,
        voucher_array: true,
        days: true
    })
    const formValid = useMemo(() => {
        return Object.values(formErrors).every(item => item === true)
    }, [formErrors])

    const handleValidate = (name, value) => {
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
    }

    const [changedCombo, setChangedCombo] = useState({
        value: 0,
        combo_name: '',
        state: true,
        from_date: null,
        to_date: null,
        isDeleted: false,
        description: '',
        voucher_array: [],
        days: 30
    })
    useEffect(() => {
        if (combo._id !== undefined) {
            setChangedCombo({ ...combo })
        } else {
            featchDetailCombo(match.params.id)
        }
    }, [combo])
    const onChange = ({ target: { name, value } }) => {
        value = value.trimStart()
        if (name === 'value') {
            value = deleteformatVND(value)
        }
        setChangedCombo({ ...changedCombo, [name]: value })
        handleValidate(name, value)
    }
    const onChangeState = value => {
        setChangedCombo({ ...changedCombo, state: value === 'true' ? true : false })

    }
    const onChangeRangePicker = ([from, to]) => {
        setChangedCombo({ ...changedCombo, from_date: from.format(formatOfDateFromDB), to_date: to.format(formatOfDateFromDB) })
    }
    const onCalendarChange = ([to]) => {
        setChangedCombo({ ...changedCombo, from_date: moment().format(formatOfDateFromDB), to_date:  to.format(formatOfDateFromDB) })
    }
    const disabledDate = current => {
        return current && current <= moment().endOf('day')
    }
    const vouchers = useVouchersDetailInCombo(combo.voucher_array)
    // manage selected voucher
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
    // handle transfer vouchersdetail to selectedVouchers
    useEffect(() => {
        if (vouchers.length > 0) {
            const initselectedVouchers = vouchers.reduce((acc, curr) => {
                acc[curr.value.subcategory] = {
                    value: curr.value,
                    count: curr.count
                }
                return acc
            }, {})
            setSelectedVouchers({
                ...selectedVouchers,
                ...initselectedVouchers
            })
        }
    }, [combo.voucher_array, isMaxPageVoucher])

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
    // handle edit selected voucher 
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
    const handleDeleteVoucher = (_, subcategory) => {
        setSelectedVouchers({
            ...selectedVouchers,
            [subcategory]: {
                value: null,
                count: 0
            }
        })
    }

    // handle to display voucher in table selected voucher
    const selectedVouchersArr = useMemo(() => {
        return objectConverttoArr(selectedVouchers).filter(voucher => voucher.value !== null && voucher.count > 0)
    }, [selectedVouchers])
    useEffect(() => {
        handleValidate('voucher_array', selectedVouchersArr.length)
    }, [selectedVouchersArr.length])

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

    const goBack = () => history.goBack()
    const saveChangedCombo = () => {
        const hide = message.loading('Edit combo....', 0);
        let voucher_array = selectedVouchersArr.map(({ count, value }) => ({ count, voucher_id: value._id }));
        let combo = {
            ...changedCombo,
            voucher_array
        }
        editPatchCombo(combo).then(res => {
            switch (res && res.status) {
                case 200:
                    setTimeout(hide, 100);
                    message.success(`${combo.combo_name} edited`, 2)
                    break;
                case 400:
                    setTimeout(hide, 100);
                    message.error('edit combo fail', 2);
                    message.warning(`${res.data.message}`, 5);
                    break;
                case 404:
                    setTimeout(hide, 100);
                    message.error('combo not found', 2);
                    message.warning(`${res.data.message}`, 5);
                    break;
                default:
                    message.error('Unknown Error', 2);
                    setTimeout(hide, 100);
                    break;
            }
        })
    }


    return (
        <div className="edit-combo">
            <Header title="Edit Combo" />
            {
                (combo._id === undefined) ? (
                    isFetching ? <PageLoading /> : <ComboNotFound />
                ) : (
                        <div className="body">
                            <div className="edit-from">
                                <Form layout="horizontal" labelAlign="left" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} >
                                    <Form.Item label="Name" >
                                        <Input name="combo_name" onChange={onChange} value={changedCombo.combo_name} />
                                        <ErrorMessage hasError={!formErrors.combo_name} message={errorMessage.combo_name} />
                                    </Form.Item>
                                    <Form.Item label="Using duration">
                                        <Form.Item wrapperCol={{ span: 5 }}  >
                                            <Input name="days" onChange={onChange} value={`${changedCombo.days}`} suffix="Ngày" />
                                        </Form.Item>
                                        <ErrorMessage hasError={!formErrors.days} message={errorMessage.days} />
                                    </Form.Item>
                                    <Form.Item label="Sell duration" wrapperCol={{ span: 15 }}  >
                                        <DatePicker.RangePicker
                                            onChange={onChangeRangePicker}
                                            disabledDate={disabledDate}
                                            onCalendarChange={onCalendarChange}
                                            value={
                                                changedCombo.to_date !== null ?
                                                    [moment(changedCombo.from_date, formatOfDateFromDB), moment(changedCombo.to_date, formatOfDateFromDB)] :
                                                    null
                                            }
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Price" >
                                        <Form.Item wrapperCol={{ span: 10 }}>
                                            <Input
                                                name="value"
                                                value={formatVND(changedCombo.value)}
                                                onChange={onChange}
                                                suffix="VNĐ" />
                                        </Form.Item>
                                        <ErrorMessage hasError={!formErrors.value} message={errorMessage.value} />
                                    </Form.Item>
                                    <Form.Item label="Status" wrapperCol={{ span: 5 }}>
                                        <Select
                                            onChange={onChangeState}
                                            value={`${changedCombo.state}`}
                                        >
                                            <Select.Option value={`true`}>true</Select.Option>
                                            <Select.Option value={`false`}>false</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Description" >
                                        <Input.TextArea name="description" onChange={onChange} value={changedCombo.description} rows={4} />
                                        <ErrorMessage hasError={!formErrors.description} message={errorMessage.description} />
                                    </Form.Item>
                                    <Form.Item label="Vouchers" >
                                        <div>
                                            <Button onClick={handleAddVoucher}>Add Voucher</Button> 
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
                            <div className="d-flex-center panel">
                                <ButtonGroup>
                                    <Button onClick={goBack} className="go-back" type="primary">
                                        Go back
                                        <Icon type="left" />
                                    </Button>
                                    <Button onClick={saveChangedCombo} disabled={!formValid} className="go-back" type="primary">
                                        Save
                                        <Icon type="save" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default EditCombo