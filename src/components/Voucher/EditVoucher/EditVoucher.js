import React, { useState, useEffect } from 'react'
import { Button, Radio, message } from 'antd';
import { DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom'
import { getVoucherById, editVoucherByID } from '../../../redux/actions/voucherx-actions/services'
import moment from 'moment';
import { formatOfDateFromDB, dateFormat } from '../../../constant/index'

const Option = Select.Option;
const EditVoucher = ({match, history}) => {
    const id = match.params.id;
    // console.log('id')
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
        setToggle(toggle => {
            return ({
            ...toggle,
            dataCreate: {
                ...toggle.dataCreate,
                discount: ''
            }
            
        })})
    }

    useEffect(() => {
        getVoucherById(id)
        .then(res => {
            setToggle({
                ...toggle,
                dataCreate: res.data
            })
        })  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     console.log('data', toggle.dataCreate)
    // })

    const upDateVoucher = () => {
        delete toggle.dataCreate.__v
        delete toggle.dataCreate._id
        delete toggle.dataCreate.updatedAt
        delete toggle.dataCreate.createdAt
        delete toggle.dataCreate.isDeleted
        editVoucherByID(toggle.dataCreate, id).then(res => {
            message.success(`${toggle.dataCreate.voucher_name} edited`)
            history.goBack()
        })
    }
    const date = new Date()
    return (
        <div className="main-crvoucher">
            <h1 className="title-voucher1">
                Voucher:
            </h1>
            <Radio.Group value={toggle.dataCreate.category} buttonStyle="solid">
                <Radio.Button onClick={changeCurrentButton} value="gift">Gift</Radio.Button>
                <Radio.Button onClick={changeCurrentButton} value="buy">Buy</Radio.Button>
            </Radio.Group>

            <div className="create-voucher">
                <div className="create1">
                    <div className="content-create">
                        <label>Voucher Name:</label>
                        <input value={toggle.dataCreate.voucher_name} onChange={onChangeData} name="voucher_name"></input>
                    </div>
                    {toggle.dataCreate.voucher_name && toggle.dataCreate.voucher_name.split('').length >= 6 && toggle.dataCreate.voucher_name.split('').length <= 50 ? <p className="validate-input"></p> : <p className="validate-input">Voucher name should not be null and has length between 6 and 50 characters</p> }
                    {toggle.currentButton === 'gift' ?<div className="content-create">
                        <label>Rank:</label>
                        <input onChange={onChangeData}></input>
                    </div> : <div></div>}
                    <div className="content-create">
                        <label>From Date:</label>
                        <DatePicker
                            format={dateFormat}
                            onChange={onChangeFromDate}
                            value={toggle.dataCreate.from_date === null ? null : moment(toggle.dataCreate.from_date, formatOfDateFromDB)}
                        ></DatePicker>
                    </div>
                    {toggle.dataCreate.from_date &&  moment(toggle.dataCreate.from_date, formatOfDateFromDB) >= date ?  <p className="validate-input"></p> : <p className="validate-input">From Date should not be null and From Date should not be after today</p > }
                    <div className="content-create">
                        <label>To Date:</label>
                        <DatePicker 
                            format={dateFormat}
                            onChange={onChangeToDate}
                            value={toggle.dataCreate.to_date === null ? null : moment(toggle.dataCreate.to_date, formatOfDateFromDB)}>
                        </DatePicker>
                    </div>
                    {toggle.dataCreate.to_date &&  moment(toggle.dataCreate.to_date, formatOfDateFromDB) > moment(toggle.dataCreate.from_date, formatOfDateFromDB) ?  <p className="validate-input"></p> : <p className="validate-input">To Date should not be null and To Date should not be after From Date</p > }
                    <div className="content-create">
                        <label>Description:</label>
                        <textarea value={toggle.dataCreate.description} onChange={onChangeData} name="description"></textarea>
                    </div>
                    {toggle.dataCreate.description && toggle.dataCreate.description.split('').length >= 50 && toggle.dataCreate.voucher_name.split('').length <= 1000 ? <p className="validate-input"></p> : <p className="validate-input">Description should not be null and has length between 50 and 1000 characters</p> }
                </div>
                <div className="create1">
                    <div className="content-create">
                        <label>Status:</label>
                        <input className="input-read" defaultValue="Unavailable" readOnly></input>
                    </div>
                    <div className="content-create">
                        <label>Conditions Type:</label>
                        <Select onChange={selectType} style={{ width: 120 }} value={toggle.dataCreate.discount > 0 ?'Combine' : toggle.currentType} >
                            <Option onClick={resetDiscount} value="Value">Value</Option>
                            <Option value="Combine">Combine</Option>
                        </Select>
                    </div>
                    <div className="content-create">
                        <label>Value:</label>
                        <input onChange={onChangeData} value={toggle.dataCreate.value} name="value"></input>
                    </div>
                    {toggle.dataCreate.value && toggle.dataCreate.value > 10000 ? <p className="validate-input"></p> : <p className="validate-input">If you choose value or combine, value should not be null and value bigger than 10.000</p>}
                    <div className="content-create">
                        <label>Percent:</label>
                        {toggle.dataCreate.discount > 0 ? <input onChange={onChangeData} value={toggle.dataCreate.discount} name="discount"></input> : <input disabled ></input>  }
                    </div>
                    {toggle.currentType !== 'Value' ? (toggle.dataCreate.discount && toggle.dataCreate.discount >= 10 && toggle.dataCreate.discount <= 100 ? <p className="validate-input"></p> :<p className="validate-input">If you choose combine, percent should not be null and less than 100</p> )  : ''  }
                    <div className="content-create">
                        <label>Sub Type:</label>
                        <Select style={{ width: 120 }} onChange={onChangeSub}  value={toggle.dataCreate.subcategory} >
                            <Option value="food">Food</Option>
                            <Option value="move">Move</Option>
                            <Option value="shopping">Shopping</Option>
                            <Option value="bike">Bike</Option>
                        </Select>
                    </div>

                    <div className="btn-footer">
                        <Button size='large' type="danger"><Link to='/a/voucher/manage'>Cancel</Link></Button>
                        <Button size='large' type="primary" onClick={upDateVoucher}>Update</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditVoucher