import uuid from 'uuid'
import moment from 'moment'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Form, Input, DatePicker, Select, Button, Table, message, Icon, Divider } from 'antd'

import { SelectVoucherContainer } from '../../../redux/container/SelectVoucherContainer'
import { checkNoSymbolsOrSpecialChars, checkMinMax, checkIsNaN, checkIsInterge, checkDivideBy } from '../../../utils/validate'
import { comboLimitValue, errorMessage } from '../../../constant/combo'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { deleteformatVND, formatVND } from '../../../utils'
import { formatOfDateFromDB, dateFormat } from '../../../constant'
import { checkErrorSuccess, calValueTotal } from '../../../utils/combo'



export const NewComboModal = ({ isOpenNewComboModal, handleCloseNewComboModal, addPostCombo }) => {
    const { voucherProprotions, priceProprotions } = useSelector(state => state.policy.combo)
    const [voucherProprotion, setVoucherProprotion] = useState(0)
    const onChangeVoucherProprotion = e => {
        setVoucherProprotion(e)
    }
    const valueVoucherProprotion = useMemo(() => voucherProprotions[voucherProprotion], [voucherProprotion, voucherProprotions])
    const [priceProprotion, setPriceProprotion] = useState(0)
    const onChangePriceProprotion = e => {
        setPriceProprotion(e)
    }
    const valuePriceProprotion = useMemo(() => priceProprotions[priceProprotion], [priceProprotion, priceProprotions])
    //validate
    const [formErrors, setFormErrors] = useState({
        combo_name: false,
        value: false,
        description: false,
        voucher_array: false,
        count: false,
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
                isValid = checkMinMax(value, valueVoucherProprotion.value.length, valueVoucherProprotion.value.length)
                break;
            case 'count':
                // receive array is count + extra of voucher 
                isValid = value.every(ele => ele > 0)
                break
            case 'value':
                isValid = !checkIsNaN(+value) && checkIsInterge(+value) && checkDivideBy(+value, 1000) && checkMinMax(+value, comboLimitValue.value.min, comboLimitValue.value.max)
                break
            default:
                break;
        }
        setFormErrors(formErrors => ({ ...formErrors, [name]: isValid }))
    }, [valueVoucherProprotion])
    //policy


    // data new combo
    const [newCombo, setNewCombo] = useState({
        value: 0,
        combo_name: '',
        state: true,
        from_date: moment(),
        to_date: moment().add(1, "month"),
        isDeleted: false,
        description: '',
        days: 0
    })
    // selected vouchers
    const [selectedVouchers, setSelectedVouchers] = useState({
        move: {
            value: null,
            index: 0
        },
        food: {
            value: null,
            index: 0
        },
        shopping: {
            value: null,
            index: 0
        },
        bike: {
            value: null,
            index: 0
        },
        index: 0
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
        if (formErrors.voucher_array && selectedVouchers[filter].value === null) {
            message.warn("Vouchers is maximun", 1)
            return
        }
        if (length > 0) {
            const index = selectedRows.findIndex(row => row._id === selectedRowKeys[length - 1])

            setSelectedVouchers({
                ...selectedVouchers,
                [filter]: {
                    value: selectedRows[index],
                    index: selectedVouchers.index
                },
                index: selectedVouchers.index + 1
            })

        } else {
            setSelectedVouchers({
                ...selectedVouchers,
                [filter]: {
                    value: null,
                    index: 0
                }
            })
        }
    }


    const handleDeleteVoucher = (e, subcategory) => {
        setSelectedVouchers({
            ...selectedVouchers,
            [subcategory]: {
                value: null,
                index: 0
            }
        })
    }
    // handle to display voucher in table selected voucher
    const objectConverttoArr = (selectedVouchers) => {
        const keys = Object.keys(selectedVouchers);
        return keys.map(key => selectedVouchers[key])
    }
    const selectedVouchersArr = useMemo(() => {
        const result = objectConverttoArr(selectedVouchers).filter(voucher => voucher.value !== undefined && voucher.value !== null)
        return result.sort((a, b) => a.index - b.index);
        // return result
    }, [selectedVouchers])
    useEffect(() => {
        handleValidate('voucher_array', selectedVouchersArr.length)
    }, [handleValidate, selectedVouchersArr.length, valueVoucherProprotion, voucherProprotion])

    // handle calculate count and totoal value
    const countAndTotalValue = useMemo(() => {
        return selectedVouchersArr.map((voucher, index) => {
            const valueVoucher = voucher.value.value
            const totalValue = calValueTotal(+newCombo.value, valuePriceProprotion.value, valueVoucherProprotion.value[index])
            const count = Math.floor(totalValue / valueVoucher)
            const excess = totalValue % valueVoucher
            return {
                count,
                totalValue,
                excess
            }
        })
    }, [newCombo.value, selectedVouchersArr, valuePriceProprotion.value, valueVoucherProprotion.value])

    // Extra number of vouchers
    const [countExtra, setCountExtra] = useState([0, 0, 0, 0]);
    useEffect(() => {
        const length = valueVoucherProprotion.value.length
        const newCountExtra = Array.from({ length }, () => 0)
        setCountExtra(newCountExtra)
    }, [valueVoucherProprotion])
    // handle validate count of voucher
    useEffect(() => {
        const countArr = selectedVouchersArr.map((_, index) => countAndTotalValue[index].count + countExtra[index])
        handleValidate('count', countArr)
    }, [countAndTotalValue, countExtra, handleValidate, selectedVouchersArr])

    const onChangeCountExtra = (index, value) => {
        const newValue = countExtra[index] + value
        if (newValue >= 0 && newValue <= 5) {
            const newCountExtra = countExtra.slice();
            newCountExtra.splice(index, 1, newValue);
            setCountExtra(newCountExtra)
        } else {
            message.warn("Extra must be from 0 to 5")
        }
    }

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

    // handle change newcombo
    const onChange = ({ target: { name, value } }) => {
        value = value.trimStart()
        if (name === 'value') {
            value = deleteformatVND(value)
        }
        setNewCombo({ ...newCombo, [name]: value })
        handleValidate(name, value)
    }
    const onChangeRangePicker = ([from, to]) => {
        setNewCombo({ ...newCombo, from_date: from.format(formatOfDateFromDB), to_date: to.format(formatOfDateFromDB) })
    }
    const onCalendarChange = ([to]) => {
        setNewCombo({ ...newCombo, from_date: moment().format(formatOfDateFromDB), to_date: to.format(formatOfDateFromDB) })
    }
    const disabledDate = current => current && current <= moment().endOf('day')

    // handle add combo
    const handleAddCombo = () => {
        const hide = message.loading('Add combo....', 0);
        let voucher_array = selectedVouchersArr.map((voucher, index) => ({
                voucher_id: voucher.value._id,
                count: countAndTotalValue[index].count + countExtra[index]
        }));
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
            key: 'value',
            title: 'Value',
            dataIndex: 'value.value',
            width: 100
        },
        {
            key: 'valueTotal',
            title: 'Total Value',
            render: (_, record, index) => countAndTotalValue[index].totalValue,
            width: 100
        },
        {
            key: 'excess',
            title: 'Excess',
            render: (_, record, index) => countAndTotalValue[index].excess,
            width: 80
        },
        {
            key: 'count',
            title: 'Count',
            render: (_, record, index) => countAndTotalValue[index].count,
            width: 80
        },
        {
            key: 'extra',
            title: 'Extra',
            render: (_, record, index) => countExtra[index],
            width: 80
        },
        {
            key: 'action',
            title: 'Action',
            render: (_, record, index) => (
                <span>
                    <Icon type="plus-circle" className="pointer fake-link" onClick={(e) => onChangeCountExtra(index, 1)} />
                    <Divider type="vertical" />
                    <Icon type="minus-circle" className="pointer fake-link" onClick={(e) => onChangeCountExtra(index, -1)} />
                    <Divider type="vertical" />
                    <span className="fake-link" onClick={(e) => handleDeleteVoucher(e, record.value.subcategory)}>delete</span>
                </span>
            ),
            width: 150
        }
    ]


    return (
        <Modal
            title="Add new combo"
            width={1000}
            centered
            visible={isOpenNewComboModal}
            onCancel={handleCloseNewComboModal}
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
                    <Form.Item label="Name" wrapperCol={{ span: 15 }}
                        validateStatus={checkErrorSuccess(formErrors.combo_name)}
                        help={!formErrors.combo_name && errorMessage.combo_name}
                    >
                        <Input name="combo_name" onChange={onChange} value={`${newCombo.combo_name}`} />
                    </Form.Item>
                    <Form.Item label="Using duration" wrapperCol={{ span: 4 }}
                        validateStatus={checkErrorSuccess(formErrors.days)}
                        help={!formErrors.days && errorMessage.days}
                    >
                        <Input name="days" onChange={onChange} value={`${newCombo.days}`} suffix={'Ngày'} />
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
                    <Form.Item label="Price" wrapperCol={{ span: 5 }}
                        validateStatus={checkErrorSuccess(formErrors.value)}
                        help={!formErrors.value && errorMessage.value}
                    >
                        <Input
                            name="value"
                            value={formatVND(newCombo.value)}
                            onChange={onChange}
                            suffix="VNĐ" />
                    </Form.Item>
                    <Form.Item label="Value roprotion of Vouchers" wrapperCol={{ span: 5 }}
                        help={`detail: ${valueVoucherProprotion && valueVoucherProprotion.value.join('%, ')}%`}>
                        <Select
                            value={voucherProprotion}
                            onChange={onChangeVoucherProprotion}
                        >
                            {voucherProprotions.map((item, index) => (
                                <Select.Option key={index} value={index}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Price Proprotion" wrapperCol={{ span: 5 }}
                        help={`detail: ${valuePriceProprotion && valuePriceProprotion.value}%`}>
                        <Select
                            value={priceProprotion}
                            onChange={onChangePriceProprotion}
                        >
                            {priceProprotions.map((item, index) => (
                                <Select.Option key={index} value={index}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Is stop" wrapperCol={{ span: 5 }}>
                        <Select
                            value={`${newCombo.state}`}
                        >
                            <Select.Option value={`true`}>No</Select.Option>
                            <Select.Option value={`false`}>Yes</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description"
                        validateStatus={checkErrorSuccess(formErrors.description)}
                        help={!formErrors.description && errorMessage.description}
                    >
                        <Input.TextArea name="description" onChange={onChange} value={newCombo.description} rows={4} />
                    </Form.Item>
                    <Form.Item label="Vouchers" wrapperCol={{ span: 20 }}
                        validateStatus={checkErrorSuccess(formErrors.count)}
                        help={!formErrors.count && errorMessage.countVoucher}
                    >
                        <div>
                            <Button onClick={handleAddVoucher}
                                disabled={selectedVouchersArr.length >= valueVoucherProprotion.value.length ? true : false}>
                                Add Voucher
                                </Button> {'  '}
                            <ErrorMessage hasError={!formErrors.voucher_array} message={errorMessage.voucher_array(valueVoucherProprotion.value.length)} />
                        </div>
                        <SelectVoucherContainer
                            selectedVouchers={selectedVouchers}
                            onChangeSelectedVouchers={onChangeSelectedVouchers}
                            handleCloseSelectVoucherModal={handleCloseSelectVoucherModal}
                            isOpenSelectVoucherModal={isOpenSelectVoucherModal}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 25 }}>
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