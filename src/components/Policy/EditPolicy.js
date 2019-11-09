import React, { useState, useEffect, useMemo } from 'react'
import { Header } from '../common/Header/Header'
import { Spin, Form, message, Input, Select, Button } from 'antd'
export const EditPolicy = ({
    dispatch,
    policy,
    requestEditComboPolicy
}) => {
    const [editedPolicy, setEditedPolicy] = useState({
        policy_name: '',
        description: '',
        extra_percent: 30,
        voucher_percent: [100]
    })
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        if (policy !== false) {
            setEditedPolicy({ ...policy })
        }
    }, [policy])

    const [formValid, setFormValid] = useState({
        policy_name: true,
        description: true,
        voucher_percent: true
    })
    const noError = useMemo(() => {
        return Object.values(formValid).every(i => i === true)
    }, [formValid])

    const handleValidate = (name, value) => {
        let isValid = false
        switch (name) {
            case 'policy_name':
                isValid = value !== '' ? true : false
                break;
            case 'description':
                isValid = value !== '' ? true : false
                break;
            case 'voucher_percent':
                isValid = value
                break;
            default:
                break;
        }
        setFormValid(formValid => ({ ...formValid, [name]: isValid }))
    }
    useEffect(() => {
        if (policy !== false) {
            const valid = editedPolicy.voucher_percent.every(item => item >= 10)
            handleValidate('voucher_percent', valid)
        }
    }, [policy, editedPolicy.voucher_percent])
    let extraArray = useMemo(() => {
        let arr = []
        for (let i = editedPolicy.extra_percent; i <= 100; i += 5)  arr.push(i)
        return arr
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let countArray = useMemo(() => {
        return [1, 2, 3, 4]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [, setVoucherCount] = useState(1);
    const onChangeCount = value => {
        setVoucherCount(value)
        let newVoucherPersent
        if (value === 1) {
            newVoucherPersent = [100]
        } else {
            newVoucherPersent = Array.from({ length: value }, () => 10)
            newVoucherPersent[newVoucherPersent.length - 1] = 100 - newVoucherPersent.slice(0, value - 1).reduce((acc, curr) => acc + curr)
        }
        setEditedPolicy({
            ...editedPolicy,
            voucher_percent: newVoucherPersent
        })
    }
    const onChangeSelectExtra = value => {
        setEditedPolicy({
            ...editedPolicy,
            extra_percent: value
        })
    }

    const onChangeVoucherPersent = ({ target: { value, name } }) => {
        const persent = +value
        const newVoucherPersent = editedPolicy.voucher_percent.slice()
        const length = newVoucherPersent.length;
        newVoucherPersent[name] = Math.ceil(persent)
        const inputTotal = newVoucherPersent.slice(0, length - 1).reduce((acc, curr) => acc + curr)
        if (inputTotal > 100) {
            message.error("Voucher persent total must be from 10 to 100", 2)
            return
        }
        newVoucherPersent[length - 1] = 100 - inputTotal
        setEditedPolicy({
            ...editedPolicy,
            voucher_percent: newVoucherPersent
        })
    }

    const onChange = ({ target: { value, name } }) => {
        setEditedPolicy({
            ...editedPolicy,
            [name]: value
        })
        handleValidate(name, value)
    }

    const handleAddPolicy = () => {
        dispatch(requestEditComboPolicy(editedPolicy)).then(res => {
            setIsFetching(false)
            switch (res) {
                case 200:
                    message.success(`Edit success`)
                    break;
                default:
                    debugger
                    message.error(`Edit failed`)
                    break;
            }
        })
    }

    return (
        <div className="edit-policy">
            <Header className="edit-policy__title" title="Edit policy" />
            <Spin spinning={policy === false ? true : false} tip="Loading...">
                <div className="edit-policy__form">
                    <Form layout="inline">
                        <Form.Item label="Name"
                            help={!formValid.policy_name && "Name is not valid"}
                            hasFeedback
                            validateStatus={formValid.policy_name ? "success" : "error"} >
                            <Input name="policy_name" value={editedPolicy.policy_name} onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="Extra">
                            <Select style={{ width: "100px" }} value={editedPolicy.extra_percent} onChange={onChangeSelectExtra}>
                                {extraArray.map(item => <Select.Option key={item} value={item}>{`${item}%`}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Count">
                            <Select style={{ width: "100px" }} value={editedPolicy.voucher_percent.length} onChange={onChangeCount}>
                                {countArray.map(item => <Select.Option key={item} value={item}>{`${item}`}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vouchers persent">
                            {editedPolicy.voucher_percent.map((item, index) => (
                                <Form.Item
                                    help={item < 10 && "Persent must be greater than 10"}
                                    hasFeedback
                                    validateStatus={item >= 10 ? "success" : "error"}
                                    key={index} label={`Voucher type ${index + 1}`}>
                                    <Input type="number" value={item} name={index} onChange={onChangeVoucherPersent} disabled={index === editedPolicy.voucher_percent.length - 1 ? true : false} />
                                </Form.Item>
                            ))}
                        </Form.Item>
                        <Form.Item label="Description"
                            help={!formValid.description && "Description is not valid"}
                            hasFeedback
                            validateStatus={formValid.description ? "success" : "error"}
                        >
                            <Input.TextArea

                                name={'description'} value={editedPolicy.description} onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="add-policy__form-button">
                            <Button
                                loading={isFetching}
                                onClick={handleAddPolicy}
                                disabled={!noError} type="primary" icon="save">Edit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </div>
    )
}