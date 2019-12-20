import uuid from 'uuid'
import moment from 'moment'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Input, DatePicker, Select, Button, Table, message, Icon } from 'antd'

import { SelectVoucherContainer } from '../../../redux/container/SelectVoucherContainer'
import { checkMinMax, checkIsNaN, checkIsInterge, checkDivideBy } from '../../../utils/validate'
import { comboLimitValue, errorMessage } from '../../../constant/combo'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { deleteformatVND, formatVND } from '../../../utils'
import { dateFormat, services, persentList } from '../../../constant'
import { checkErrorSuccess, calValueTotal, objectConverttoArr } from '../../../utils/combo'
import { fetchFullComboPolicy } from '../../../redux/actions/policy-actions/action'
import { getActivePolicySelector } from '../../../redux/selectors/policy-selector'
import { createVoucherToAPI } from '../../../redux/actions/voucherx-actions/services'



export const NewComboModal = ({ isOpenNewComboModal, handleCloseNewComboModal, addPostCombo }) => {
    // handle policy
    const dispatch = useDispatch()
    const policies = useSelector(state => getActivePolicySelector(state.policy.combo))
    const vouchers = useSelector(state => state.voucherx.items)
    useEffect(() => {
        if (policies.length === 0)
            dispatch(fetchFullComboPolicy())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [selectedPolicy, setSelectedPolicy] = useState(0)
    const onChangeSelectedPolicy = value => setSelectedPolicy(value)
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

    const handleValidate = useCallback((name, value, minmax = 0) => {
        let isValid = false
        switch (name) {
            case 'combo_name':
                isValid = checkMinMax(value.length, comboLimitValue.combo_name.min, comboLimitValue.combo_name.max)
                break;
            case 'days':
                isValid = !checkIsNaN(+value) && checkIsInterge(+value) && checkMinMax(+value, comboLimitValue.days.min, comboLimitValue.days.max)
                break;
            case 'description':
                isValid = checkMinMax(value.length, comboLimitValue.description.min, comboLimitValue.description.max)
                break;
            case 'voucher_array':
                isValid = checkMinMax(value, minmax, minmax)
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
    }, [])
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
            message.warn("Vouchers is maximun", 0.5)
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
    const selectedVouchersArr = useMemo(() => {
        const result = objectConverttoArr(selectedVouchers).filter(voucher => voucher.value !== undefined && voucher.value !== null)
        return result.sort((a, b) => a.index - b.index);
        // return result
    }, [selectedVouchers])




    useEffect(() => {
        if (policies.length > 0) {
            handleValidate('voucher_array', selectedVouchersArr.length, policies[selectedPolicy].voucher_percent.length)
        }
    }, [handleValidate, policies, selectedPolicy, selectedVouchersArr.length])

    // handle calculate count and totoal value
    const countAndTotalValue = useMemo(() => {
        if (policies.length > 0) {
            const increase = policies[selectedPolicy].extra_percent
            const voucherProprotion = policies[selectedPolicy].voucher_percent
            return selectedVouchersArr.map((voucher, index) => {
                const valueVoucher = voucher.value.value
                const totalValue = calValueTotal(+newCombo.value, increase, voucherProprotion[index])
                if (isNaN(totalValue)) {
                    setSelectedVouchers({
                        ...selectedVouchers,
                        [voucher.value.subcategory]: {
                            value: null,
                            index: 0
                        }
                    })
                }
                const count = Math.floor(totalValue / valueVoucher)
                const excess = totalValue % valueVoucher
                return {
                    count,
                    totalValue,
                    excess
                }
            })
        }
        return []
    }, [newCombo.value, policies, selectedPolicy, selectedVouchers, selectedVouchersArr])

    // handle auto generate  voucher
    const residualValue = useMemo(() => {
        if (countAndTotalValue.length > 0) {
            return countAndTotalValue.reduce((acc, curr) => acc + curr.excess, 0)
        }
        return -1
    }, [countAndTotalValue])
    //  auto voucher 

    const [autoVoucher, setAutoVoucher] = useState({
        voucher_name: 'Voucher food' + Date.now(),
        description: 'Voucher food trị giá 0đ',
        discount: 0,
        value: 0,
        category: 'buy',
        subcategory: 'food',
        times_to_use: 0,
    })
    useEffect(() => {
        setAutoVoucher(autoVoucher => ({ ...autoVoucher, value: residualValue }))
    }, [residualValue]) 
    useEffect(() => {
        setAutoVoucher((autoVoucher) => ({
            ...autoVoucher,
            voucher_name: `Voucher ${autoVoucher.subcategory}- ${Date.now()}`,
            description: `Voucher ${autoVoucher.value} trị giá ${formatVND(residualValue)}đ`
        }))
    }, [newCombo, residualValue])
    const onChangeVoucher = (value, name) => {

        setAutoVoucher({ ...autoVoucher, [name]: value })
    }


    // Extra number of vouchers
    const [countExtra, setCountExtra] = useState([0, 0, 0, 0]);
    useEffect(() => {
        if (policies.length > 0) {
            const length = policies[selectedPolicy].voucher_percent.length
            const newCountExtra = Array.from({ length }, () => 0)
            setCountExtra(newCountExtra)
        }
    }, [policies, selectedPolicy])
    // handle validate count of voucher
    useEffect(() => {
        const countArr = selectedVouchersArr.map((_, index) => countAndTotalValue[index].count + countExtra[index])
        handleValidate('count', countArr)
    }, [countAndTotalValue, countExtra, handleValidate, selectedVouchersArr])

    // const onChangeCountExtra = (index, value) => {
    //     const newValue = countExtra[index] + value
    //     if (newValue >= 0 && newValue <= 5) {
    //         const newCountExtra = countExtra.slice();
    //         newCountExtra.splice(index, 1, newValue);
    //         setCountExtra(newCountExtra)
    //     } else {
    //         message.warn("Extra must be from 0 to 5")
    //     }
    // }

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
        if (from && to) {
            setNewCombo({ ...newCombo, from_date: from.format(), to_date: to.format() })
        }
    }
    const onCalendarChange = ([to]) => {
        if (to) {
            setNewCombo({ ...newCombo, from_date: moment().format(), to_date: to.format() })
        }
    }
    const disabledDate = current => current && current <= moment().endOf('day')

    // handle add combo
    const handleAddCombo = async () => {
        const hide = message.loading('Add combo....', 0);
        try {
            // handle create auto voucher when residualValue > 0 

            let voucher_array = selectedVouchersArr.map(({ value }, index) => ({
                voucher_id: value._id,
                count: countAndTotalValue[index].count + countExtra[index],
                value: value.value,
                category: value.subcategory,
                voucher_name: value.voucher_name,
                discount: value.discount ? value.discount : 0
            }));
            if (residualValue > 0) {
                const from_date = new Date()
                let to_date = moment(from_date).add(1, 'month').toDate()
                to_date.setHours(23, 59, 59)
                let findedVoucher = vouchers.find(voucher => {
                    if( voucher.value === residualValue && 
                        voucher.subcategory === autoVoucher.subcategory && 
                        voucher.discount === autoVoucher.discount) {
                        return true
                    } else {
                        return false
                    }
                })
                if(findedVoucher === undefined) {
                    findedVoucher = await createVoucherToAPI({ ...autoVoucher, to_date, from_date }).then(res => res.data).catch(_ => undefined)
                }
                if (findedVoucher !== undefined) {
                    voucher_array.push({
                        voucher_id: findedVoucher._id,
                        count: 1,
                        value: findedVoucher.value,
                        category: findedVoucher.subcategory,
                        voucher_name: findedVoucher.voucher_name,
                        discount: findedVoucher.discount
                    })
                } else {
                    throw new Error()
                }
            }
            let from_date = new Date(newCombo.from_date)
            from_date.setHours(0, 0, 1)
            let to_date = new Date(newCombo.to_date)
            to_date.setHours(23, 59, 59)
            let combo = {
                voucher_array,
                ...newCombo,
                from_date,
                to_date,
                policy_id: policies[selectedPolicy]._id
            }
            addPostCombo(combo).then(res => {
                switch (res && res.status) {
                    case 201:
                        hide()
                        message.success(`${combo.combo_name} added`, 2)
                        resetNewCombo();
                        break;
                    case 400:
                        hide()
                        message.error('Add combo failed', 2);
                        if (res.data.code === 11000) {
                            message.warning("Combo name is existed", 5);
                        }
                        break;
                    default:
                        message.error('Unknown Error', 2);
                        hide()
                        break;
                }
            })
        } catch (error) {
            message.error('Add combo failed', 2)
            hide()
        }


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
            render: (_, record) => {
                const { value } = record.value
                return value
            },
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
        // {
        //     key: 'extra',
        //     title: 'Extra',
        //     render: (_, record, index) => countExtra[index],
        //     width: 80
        // },
        {
            key: 'action',
            title: 'Action',
            render: (_, record, index) => (
                <span>
                    {/* <Icon type="plus-circle" className="pointer fake-link" onClick={(e) => onChangeCountExtra(index, 1)} />
                    <Divider type="vertical" />
                    <Icon type="minus-circle" className="pointer fake-link" onClick={(e) => onChangeCountExtra(index, -1)} />
                    <Divider type="vertical" /> */}
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
                                    [moment(newCombo.from_date), moment(newCombo.to_date)] :
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
                    <Form.Item label="Policy" wrapperCol={{ span: 10 }}
                    >
                        <Select
                            value={selectedPolicy}
                            onChange={onChangeSelectedPolicy}
                            loading={policies.length === 0 ? true : false}
                        >
                            {policies.map((item, index) => (
                                <Select.Option key={index} value={index}>{`${item.policy_name}: ${item.extra_percent}% - [${item.voucher_percent.join('%, ')}%]`}</Select.Option>
                            ))}
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
                        <Button onClick={handleAddVoucher}>
                            Add Voucher
                                </Button>
                        <SelectVoucherContainer
                            selectedVouchers={selectedVouchers}
                            onChangeSelectedVouchers={onChangeSelectedVouchers}
                            handleCloseSelectVoucherModal={handleCloseSelectVoucherModal}
                            isOpenSelectVoucherModal={isOpenSelectVoucherModal}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 25 }}
                    >
                        <ErrorMessage hasError={!formErrors.voucher_array} message={`Number of vouchers must be ${policies[selectedPolicy] ? policies[selectedPolicy].voucher_percent.length : ''}`} />
                        <Table
                            {...tableConfig}
                            dataSource={selectedVouchersArr.length > 0 ? selectedVouchersArr : null}
                            columns={columns} />
                    </Form.Item>
                    {
                        residualValue > 0 && (
                            <Form.Item label={`Auto generate voucher fit real value of Combo with value is ${formatVND(autoVoucher.value)}`} labelCol={{ span: 20 }}>
                                <div className="d-flex align-items-center">
                                    <span  >Service:</span>
                                    <Select

                                        style={{ width: '100px', margin: '0 10px' }}
                                        value={autoVoucher.subcategory}
                                        onChange={value => onChangeVoucher(value, 'subcategory')}
                                    >
                                        {services.map(service => <Select.Option key={service} value={service}>{service}</Select.Option>)}
                                    </Select>
                                    <span>Persent:</span>
                                    <Select
                                        style={{ width: '100px', margin: '0 10px' }}
                                        value={autoVoucher.discount}
                                        onChange={value => onChangeVoucher(value, 'discount')}
                                    >
                                        {persentList.map(item => <Select.Option key={item} value={item}>{item}%</Select.Option>)}
                                    </Select>
                                </div>
                            </Form.Item>
                        )
                    }
                </Form>
            </div>
        </Modal>
    )
}