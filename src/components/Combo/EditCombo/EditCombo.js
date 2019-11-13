import React, { useState, useEffect, useMemo, useCallback } from 'react'
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
import { objectConverttoArr, calValueTotal, checkErrorSuccess } from '../../../utils/combo'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { errorMessage, comboLimitValue } from '../../../constant/combo'
import { checkMinMax, checkIsNaN, checkIsInterge, checkDivideBy } from '../../../utils/validate'
import { formatVND, deleteformatVND } from '../../../utils'


const EditCombo = ({
    policies = [], fetchFullComboPolicy,
    combo, history, match, fetchDetailCombo, editPatchCombo, isFetching,
    isMaxPageVoucher, fetchVouchers
}) => {
    useEffect(() => {
        if (policies.length === 0)
            fetchFullComboPolicy()
        if (!isMaxPageVoucher)
            fetchVouchers({ page: 0, limit: 9999 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchVouchers, isMaxPageVoucher])

    const [selectedPolicy, setSelectedPolicy] = useState(0)
    useEffect(() => {
        if (combo.policy_id !== undefined && policies.length > 0) {
            const index = policies.findIndex(item => item._id === combo.policy_id)
            setSelectedPolicy(index)
        }
    }, [combo, policies])
    const onChangeSelectedPolicy = value => setSelectedPolicy(value)

    const [formErrors, setFormErrors] = useState({
        combo_name: true,
        value: true,
        description: true,
        voucher_array: true,
        days: true,
        count: true,
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
                // value = length 
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

    const [changedCombo, setChangedCombo] = useState({
        value: 0,
        combo_name: '',
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
            fetchDetailCombo(match.params.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combo])
    const onChange = ({ target: { name, value } }) => {
        value = value.trimStart()
        if (name === 'value') {
            value = deleteformatVND(value)
        }
        setChangedCombo({ ...changedCombo, [name]: value })
        handleValidate(name, value)
    }

    const onChangeToDate = (to) => {
        if (to && to.valueOf() >= Date.now()) {
            setChangedCombo({ ...changedCombo, to_date: to.format(formatOfDateFromDB) })
        } else {
            message.error("To date mus be greater than present")
        }
    }

    const vouchers = useVouchersDetailInCombo(combo.voucher_array)
    // manage selected voucher
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
    // handle transfer vouchersdetail to selectedVouchers
    useEffect(() => {
        if (vouchers.length > 0) {
            const initselectedVouchers = vouchers.reduce((acc, curr, index) => {
                const newValue = {
                    ...curr.value,
                    _id: curr.value.voucher_id
                }
                acc[curr.value.category] = {
                    value: newValue,
                    index: index
                }
                return acc
            }, {})
            setSelectedVouchers(selectedVouchers => ({
                ...selectedVouchers,
                ...initselectedVouchers,
                index: vouchers.length
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (formErrors.voucher_array && selectedVouchers[filter].value === null) {
            message.warn("Vouchers is maximun", 0.5)
            return
        }
        switch (length) {
            case 1:
                setSelectedVouchers({
                    ...selectedVouchers,
                    [filter]: {
                        value: selectedRows[0],
                        index: selectedVouchers.index
                    },
                    index: selectedVouchers.index + 1
                })
                break;
            case 0:
                setSelectedVouchers({
                    ...selectedVouchers,
                    [filter]: {
                        value: null,
                        index: 0
                    }
                })
                break;
            default:
                const index = selectedRows.findIndex(row => {
                    return row._id === selectedRowKeys[length - 1]
                })
                setSelectedVouchers({
                    ...selectedVouchers,
                    [filter]: {
                        value: selectedRows[index],
                        index: selectedVouchers.index
                    },
                    index: selectedVouchers.index + 1
                })
                break;
        }

    }
    const handleDeleteVoucher = (_, subcategory) => {
        setSelectedVouchers({
            ...selectedVouchers,
            [subcategory]: {
                value: null,
                index: 0
            }
        })
    }

    // handle to display voucher in table selected voucher
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
    const preCounts = useMemo(() => {
        let newPreCounts = [0, 0, 0, 0]
        if (combo.voucher_array) {
            const counts = combo.voucher_array.map(item => item.count);
            newPreCounts.splice(0, counts.length);
            newPreCounts = [...counts, ...newPreCounts]
        }
        return newPreCounts
    }, [combo.voucher_array])
    // handle calculate count and totoal value
    const countAndTotalValue = useMemo(() => {
        if (policies.length > 0) {
            const increase = policies[selectedPolicy].extra_percent
            const voucherProprotion = policies[selectedPolicy].voucher_percent
            return selectedVouchersArr.map((voucher, index) => {
                const valueVoucher = voucher.value.value
                const totalValue = calValueTotal(+changedCombo.value, increase, voucherProprotion[index])
                const count = Math.floor(totalValue / valueVoucher)
                const excess = totalValue % valueVoucher
                return {
                    count,
                    totalValue,
                    excess
                }
            })
        }
    }, [changedCombo.value, policies, selectedPolicy, selectedVouchersArr])

    const [countExtra, setCountExtra] = useState([0, 0, 0, 0]);
    useEffect(() => {
        if (countAndTotalValue !== undefined && combo.voucher_array !== undefined) {
            let canChange = false
            if (selectedVouchersArr.length === combo.voucher_array.length)
                canChange = selectedVouchersArr.every((item, index) => item.value._id === combo.voucher_array[index].voucher_id)
            let canChangePolicy = false
            if (policies.length > 0) {
                canChangePolicy = combo.policy_id === policies[selectedPolicy]._id
            }
            if (canChange && canChangePolicy) {
                const newCountExtra = countAndTotalValue.map((item, index) => preCounts[index] - item.count)
                let counts = countExtra.map((item, index) => {
                    if (newCountExtra[index]) {
                        return newCountExtra[index]
                    }
                    return 0
                })
                setCountExtra(counts)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countAndTotalValue, preCounts, combo, policies, selectedVouchersArr, selectedPolicy])

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

    useEffect(() => {
        const countArr = selectedVouchersArr.map((_, index) => countAndTotalValue[index].count + countExtra[index])
        handleValidate('count', countArr)
    }, [countAndTotalValue, countExtra, handleValidate, selectedVouchersArr])

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
            dataIndex: 'value.category',
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
            width: 200
        }
    ]

    const goBack = () => history.goBack()
    const saveChangedCombo = () => {
        const hide = message.loading('Edit combo....', 0);
        let voucher_array = selectedVouchersArr.map(({ value }, index) => ({
            voucher_id: value._id,
            count: countAndTotalValue[index].count + countExtra[index],
            value: value.value,
            category: value.category,
            voucher_name: value.voucher_name,
            discount: value.discount
        }));
        let combo = {
            ...changedCombo,
            voucher_array,
            policy_id: policies[selectedPolicy]._id
        }
        delete combo.vouchers
        delete combo.isDeleted
        delete combo.from_date
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
                                    <Form.Item label="To date" wrapperCol={{ span: 15 }}  >
                                        <DatePicker
                                            format={dateFormat}
                                            onChange={onChangeToDate}
                                            value={
                                                changedCombo.to_date !== null ? moment(changedCombo.to_date, formatOfDateFromDB) : null
                                            }
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
                                    <Form.Item label="Description" >
                                        <Input.TextArea name="description" onChange={onChange} value={changedCombo.description} rows={4} />
                                        <ErrorMessage hasError={!formErrors.description} message={errorMessage.description} />
                                    </Form.Item>
                                    <Form.Item label="Vouchers"

                                        validateStatus={checkErrorSuccess(formErrors.count)}
                                        help={!formErrors.count && errorMessage.countVoucher}>
                                        <Button onClick={handleAddVoucher}>Add Voucher</Button>
                                        <SelectVoucherContainer
                                            selectedVouchers={selectedVouchers}
                                            onChangeSelectedVouchers={onChangeSelectedVouchers}
                                            handleCloseSelectVoucherModal={handleCloseSelectVoucherModal}
                                            isOpenSelectVoucherModal={isOpenSelectVoucherModal}
                                        />
                                        <ErrorMessage hasError={!formErrors.voucher_array} message="Voucher list is not valid" />
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