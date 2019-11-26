import React, { useState, useMemo, useEffect } from 'react'
import { Header } from '../common/Header/Header'
import { Form, Input, Select, message, Button } from 'antd'
import { checkMinMax } from '../../utils/validate'
export const AddPolicy = ({
    requestAddComboPolicy,
    dispatch
}) => {
    const [policy, setPolicy] = useState({
        policy_name: '',
        description: '',
        extra_percent: 30,
        voucher_percent: [100]
    })
    const [isFetching, setIsFetching] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetPolicy = useMemo(() => policy, [])
    const [formValid, setFormValid] = useState({
        policy_name: false,
        description: false,
        voucher_percent: false
    })
    const noError = useMemo(() => {
        return Object.values(formValid).every(i => i === true)
    }, [formValid])

    const handleValidate = (name, value) => {
        let isValid = false
        switch (name) {
            case 'policy_name':
                isValid = checkMinMax(value.length, 5, 25)
                break;
            case 'description':
                isValid = checkMinMax(value.length, 5, 200)
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
        const valid = policy.voucher_percent.every(item => item >= 10)
        handleValidate('voucher_percent', valid)
    }, [policy.voucher_percent])
    let extraArray = useMemo(() => {
        let arr = []
        for (let i = policy.extra_percent; i <= 100; i += 5)  arr.push(i)
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
        setPolicy({
            ...policy,
            voucher_percent: newVoucherPersent
        })
    }
    const onChangeSelectExtra = value => {
        setPolicy({
            ...policy,
            extra_percent: value
        })
    }

    const onChangeVoucherPersent = ({ target: { value, name } }) => {
        const persent = +value
        const newVoucherPersent = policy.voucher_percent.slice()
        const length = newVoucherPersent.length;
        newVoucherPersent[name] = Math.ceil(persent)
        const inputTotal = newVoucherPersent.slice(0, length - 1).reduce((acc, curr) => acc + curr)
        if (inputTotal > 100) {
            message.error("Voucher persent total must be from 10 to 100", 2)
            return
        }
        newVoucherPersent[length - 1] = 100 - inputTotal
        setPolicy({
            ...policy,
            voucher_percent: newVoucherPersent
        })
    }

    const onChange = ({ target: { value, name } }) => {
        setPolicy({
            ...policy,
            [name]: value
        })
        handleValidate(name, value)
    }

    const handleAddPolicy = () => {
        setIsFetching(true)
        let policyCoppy = {...policy}
        policyCoppy.policy_name = policy.policy_name.trim()
        dispatch(requestAddComboPolicy(policyCoppy)).then(res => {
            setIsFetching(false)
            switch (res && res.status) {
                case 201:
                    message.success(`Add success`)
                    setPolicy({ ...resetPolicy })
                    break;
                case 400:
                    message.error(`Add failed`)
                    if (res.data.code === 11000) {
                        message.warn("Policy name is existed", 5);
                    }
                    break
                default:
                    message.error(`Add failed`)
                    break;
            }

        })
    }

    return (
        <div className="add-policy">
            <Header className="add-policy__title" title="Add new category" />
            <div className="add-policy__form">
                <Form layout="inline">
                    <Form.Item label="Name"
                        help={!formValid.policy_name && "Name must be from 5 to 20 character"}
                        hasFeedback
                        validateStatus={formValid.policy_name ? "success" : "error"} >
                        <Input name="policy_name" value={policy.policy_name} onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Extra">
                        <Select style={{ width: "100px" }} value={policy.extra_percent} onChange={onChangeSelectExtra}>
                            {extraArray.map(item => <Select.Option key={item} value={item}>{`${item}%`}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Count">
                        <Select style={{ width: "100px" }} value={policy.voucher_percent.length} onChange={onChangeCount}>
                            {countArray.map(item => <Select.Option key={item} value={item}>{`${item}`}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Vouchers persent"
                    >
                        {policy.voucher_percent.map((item, index) => (
                            <Form.Item
                                help={item < 10 && "Persent must be greater than 10"}
                                hasFeedback
                                validateStatus={item >= 10 ? "success" : "error"}
                                key={index} label={`Voucher type ${index + 1}`}>
                                <Input type="number" value={item} name={index} onChange={onChangeVoucherPersent} disabled={index === policy.voucher_percent.length - 1 ? true : false} />
                            </Form.Item>
                        ))}
                    </Form.Item>
                    <Form.Item label="Description"
                        help={!formValid.description && "Description must be from 5 to 200 character"}
                        hasFeedback
                        validateStatus={formValid.description ? "success" : "error"}
                    >
                        <Input.TextArea

                            name={'description'} value={policy.description} onChange={onChange} />
                    </Form.Item>
                    <Form.Item className="add-policy__form-button">
                        <Button
                            loading={isFetching}
                            onClick={handleAddPolicy}
                            disabled={!noError} type="primary" icon="save">Add</Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}