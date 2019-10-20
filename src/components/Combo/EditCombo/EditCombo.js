/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group'
import { Button, Icon, Input, Form, DatePicker, Select, Table, Divider, message } from 'antd'

import { Header } from '../Header/Header'
import { ComboNotFound } from '../CompoNotFound'
import { SelectVoucherContainer } from '../../../redux/container/SelectVoucherContainer'
import { PageLoading } from '../../common/PageLoading/PageLoading'

const VouchersDetail = voucher => <p>voucher</p>

const EditCombo = ({ combo, history, match, featchDetailCombo, editPatchCombo, isFetching }) => {
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

    const onChange = ({ target: { id, value } }) => {

        setChangedCombo({ ...changedCombo, [id]: value })
    }
    const onChangeState = value => {
        setChangedCombo({ ...changedCombo, state: value === 'true' ? true : false })
    }

    const dateFormat = 'YYYY/MM/DD'
    const onChangeRangePicker = ([from, to]) => {
        setChangedCombo({ ...changedCombo, from_date: from.format(dateFormat), to_date: to.format(dateFormat) })
    }
    const disabledDate = current => current && current <= moment().endOf('day')

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
    // handle edit selected voucher 
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
                    <span className="fake-link" onClick={(e) => handleDeleteVoucher(e, record.value.subcategory)}>Delete</span>
                </span>
            ),
            width: 200
        }
    ]




    const onSubmit = e => {
        e.preventDefault();

    }
    const goBack = () => history.goBack()
    const saveChangedCombo = () => {
        const hide = message.loading('Edit combo....', 0);
        let voucher_array = selectedVouchersArr.map(({ count, value }) => ({ count, voucher_id: value._id }));
        let combo = {
            ...changedCombo,
            voucher_array
        }
        editPatchCombo(combo).then(res => {
            switch (res.status) {
                case 200:
                    setTimeout(hide, 100);
                    message.success('Edit combo success', 2)
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
                    isFetching ?  <PageLoading /> : <ComboNotFound />
                ) : (
                        <>
                            <div className="edit-from">
                                <Form layout="horizontal" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onSubmit={onSubmit}>
                                    <Form.Item label="Name" wrapperCol={{ span: 4 }}>
                                        <Input id="combo_name" onChange={onChange} value={changedCombo.combo_name} />
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
                                                changedCombo.to_date !== null ?
                                                    [moment(changedCombo.from_date, dateFormat), moment(changedCombo.to_date, dateFormat)] :
                                                    null
                                            }
                                            format={'DD/MM/YYYY'}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Price" wrapperCol={{ span: 5 }}>
                                        <Input
                                            id="value"
                                            value={changedCombo.value}
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
                                        <div>
                                            <Button onClick={handleAddVoucher}>Add Voucher</Button>
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
                            <div className="d-flex-center">
                                <ButtonGroup>
                                    <Button onClick={goBack} className="go-back" type="primary">
                                        Go back
                                        <Icon type="left" />
                                    </Button>
                                    <Button onClick={saveChangedCombo} className="go-back" type="primary">
                                        Save
                                        <Icon type="save" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default EditCombo