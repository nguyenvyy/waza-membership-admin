import React, { useState, useMemo } from 'react'
import { Header } from '../common/Header/Header'
import { Form, Input, Select, message, Button } from 'antd'
export const AddPolicy = ({
    requestAddComboPolicy,
    isFetching,
    dispatch
}) => {
    const [policy, setPolicy] = useState({
        policy_name: '',
        description: '',
        extra_percent: 30,
        voucher_percent: [100]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetPolicy = useMemo(() => policy, [])
    const [formValid, setFormValid] = useState({
        policy_name: false,
        description: false,
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
            default:
                break;
        }
        setFormValid({ ...formValid, [name]: isValid })
    }
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
    const [voucherCount, setVoucherCount] = useState(1);
    const onChangeCount = value => {
        setVoucherCount(value)
        const newVoucherPersent = Array.from({ length: value }, () => 0)
        newVoucherPersent[newVoucherPersent.length - 1] = 100
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
        if (persent < 0 || persent > 100) return
        const newVoucherPersent = policy.voucher_percent.slice()
        const length = newVoucherPersent.length;
        newVoucherPersent[name] = Math.ceil(persent)
        const inputTotal = newVoucherPersent.slice(0, length - 1).reduce((acc, curr) => acc + curr)
        if (inputTotal > 100) {
            message.error("Voucher persent total must be  <= 100", 2)
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
        dispatch(requestAddComboPolicy(policy)).then(res => {
            switch (res) {
                case 201:
                    message.success(`Add success`)
                    setPolicy({...resetPolicy})
                    break;
                case 400:
                    message.error(`Add failed`)
                    break;
                default:
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
                        help={!formValid.policy_name && "Name is not valid"}
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
                        <Select style={{ width: "100px" }} value={voucherCount} onChange={onChangeCount}>
                            {countArray.map(item => <Select.Option key={item} value={item}>{`${item}`}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Vouchers persent">
                        {policy.voucher_percent.map((item, index) => (
                            <Form.Item key={index} label={`Voucher type ${index + 1}`}>
                                <Input value={item} name={index} onChange={onChangeVoucherPersent} disabled={index === policy.voucher_percent.length - 1 ? true : false} />
                            </Form.Item>
                        ))}
                    </Form.Item>
                    <Form.Item label="Description"
                        help={!formValid.description && "Description is not valid"}
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