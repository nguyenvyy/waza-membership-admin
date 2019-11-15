import React, { useState, useEffect } from 'react'
import { Button, Radio, message } from 'antd';
import { DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom'
import { createVoucherToAPI } from '../../../redux/actions/voucherx-actions/services'
import moment from 'moment';
import { formatOfDateFromDB, dateFormat } from '../../../constant/index'

const Option = Select.Option;
const CreateVoucher = () => {
    const intialState = {
        currentButton: 'gift',
        currentType: 'Value',
        dataCreate: {
            voucher_name: '',
            description: '',
            discount: 0,
            value: 0,
            from_date: null,
            to_date: null,
            state: true,
            category: 'gift',
            subcategory: 'food',
            times_to_use: 0
        }
    }

    const [toggle, setToggle] = useState(intialState)

    const changeCurrentButton = e => {
        setToggle({
            ...toggle,
            currentButton: e.target.value,
            dataCreate: {
                ...toggle.dataCreate,
                category: e.target.value
            }
        })
    }

    const onChangeData = event => {
        setToggle({
            ...toggle,
            dataCreate: {
                ...toggle.dataCreate,
                [event.target.name]: event.target.value
            }
        })
    }
 

    useEffect(() => {
        console.log('change', toggle.dataCreate)
    }, [toggle.dataCreate])

    const selectType = value => {
        setToggle((toggle) => ({
            ...toggle,
            currentType: value
        }))
    }

    const onChangeSub = value => {
        setToggle({
            ...toggle,
            dataCreate: {
                ...toggle.dataCreate,
                subcategory: value
            }
        })
    }
    const onChangeFromDate = (from) => {
        setToggle({
            ...toggle,
            dataCreate: {
                ...toggle.dataCreate,
                from_date:from.format(formatOfDateFromDB)
            }
        })
    }

    const onChangeToDate = (to) => {
        setToggle({
            ...toggle,
            dataCreate: {
                ...toggle.dataCreate,
                to_date:to.format(formatOfDateFromDB)
            }
        })
    }
    
    const resetDiscount = () => {
        console.log('run')
        setToggle(toggle => {
            
            console.log('run2')
            return ({
            ...toggle,
            dataCreate: {
                ...toggle.dataCreate,
                discount: ''
            }
            
        })})
    }

    const CreateVoucher = () => {
        createVoucherToAPI(toggle.dataCreate)
        .then(()=>{
            message.success('Create voucher success')
            setToggle({
                ...toggle,
                dataCreate: intialState.dataCreate
            })
        })
    }

    useEffect(() => {
        console.log(toggle.dataCreate.from_date)
    }, [toggle.dataCreate.from_date])

    return (
        <div className="main-crvoucher">
            <h1>
                Voucher:
            </h1>
            <Radio.Group defaultValue="gift" buttonStyle="solid">
                <Radio.Button onClick={changeCurrentButton} value="gift">Gift</Radio.Button>
                <Radio.Button onClick={changeCurrentButton} value="buy">Buy</Radio.Button>
            </Radio.Group>

            <div className="create-voucher">
                <div className="create1">
                    <div className="content-create">
                        <label>Voucher Name:</label>
                        <input onChange={onChangeData} value={toggle.dataCreate.voucher_name} name="voucher_name"></input>
                    </div>
                    {!toggle.dataCreate.voucher_name ? <p className="validate-input">Voucher name should not be null and not duplicated</p> : <p className="validate-input"></p>}
                    {toggle.currentButton === 'gift' ?<div className="content-create">
                        <label>Rank:</label>
                        <input onChange={onChangeData}></input>
                    </div> : <div></div>}
                    <p className="validate-input"></p>
                    <div className="content-create">
                        <label>From Date:</label>
                        <DatePicker
                            format={dateFormat}
                            onChange={onChangeFromDate}
                            value={toggle.dataCreate.from_date === null ? null : moment(toggle.dataCreate.from_date, formatOfDateFromDB)}
                        ></DatePicker>
                    </div>
                    {!toggle.dataCreate.from_date ? <p className="validate-input">From Date should not be null</p > : <p className="validate-input"></p>}
                    <div className="content-create">
                        <label>To Date:</label>
                        <DatePicker 
                            format={dateFormat}
                            onChange={onChangeToDate}
                            value={toggle.dataCreate.to_date === null ? null : moment(toggle.dataCreate.to_date, formatOfDateFromDB)}>
                        </DatePicker>
                    </div>
                    {!toggle.dataCreate.to_date ? <p className="validate-input">To Date should not be null and should be after today</p> : <p className="validate-input"></p>}
                    <div className="content-create">
                        <label>Description:</label>
                        <textarea value={toggle.dataCreate.description} onChange={onChangeData} name="description"></textarea>
                    </div>
                    {!toggle.dataCreate.description ? <p className="validate-input">To Date should not be null and should be after today</p> : <p className="validate-input"></p>}
                </div>
                <div className="create1">
                    <div className="content-create">
                        <label>Status:</label>
                        <input className="input-read" defaultValue="Unavailable" readOnly></input>
                    </div>
                    <p className="validate-input"></p>
                    <div className="content-create">
                        <label>Conditions Type:</label>
                        <Select onChange={selectType} style={{ width: 120 }} defaultValue={toggle.currentType} >
                            <Option onClick={resetDiscount} value="Value">Value</Option>
                            <Option value="Combine">Combine</Option>
                        </Select>
                    </div>
                    <p className="validate-input"></p>
                    <div className="content-create">
                        <label>Value:</label>
                        <input onChange={onChangeData} value={toggle.dataCreate.value} name="value"></input>
                    </div>
                    {!toggle.dataCreate.value ? <p className="validate-input">If you choose value or combine, value should not be null and be integer</p> : <p className="validate-input"></p>}
                    <div className="content-create">
                        <label>Percent:</label>
                        {toggle.currentType === 'Value' ? <input value={0} disabled ></input> : <input onChange={onChangeData} value={toggle.dataCreate.discount} name="discount"></input>}
                    </div>
                    {toggle.currentType !== 'Value' && !toggle.dataCreate.discount ? <p className="validate-input">If you choose combine, percent should not be null and less than 100</p> : <p className="validate-input"></p>}
                    <div className="content-create">
                        <label>Sub Type:</label>
                        <Select style={{ width: 120 }} onChange={onChangeSub} value={toggle.dataCreate.subcategory} defaultValue={toggle.dataCreate.subcategory} >
                            <Option value="food">Food</Option>
                            <Option value="move">Move</Option>
                            <Option value="shopping">Shopping</Option>
                            <Option value="bike">Bike</Option>
                        </Select>
                    </div>

                    <div className="btn-footer">
                        <Button size='large' type="danger"><Link to='/a/voucher/manage'>Cancel</Link></Button>
                        <Button size='large' type="primary" onClick={CreateVoucher}>Create</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateVoucher