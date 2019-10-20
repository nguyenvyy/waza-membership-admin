import React, { useState } from 'react'
import { Button, Radio } from 'antd';
import { DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom'

const  Option  = Select.Option;
const CreateVoucher = () => {
    const intialState = {
        currentButton : 'Point',
        currentType: 'Discount'
    }

    const [toggle, setToggle] = useState(intialState)

    const changeCurrentButton = e => {
        setToggle({
            currentButton: e.target.value
        })
        console.log(toggle.currentButton)
    }

    const selectType = value => {
        setToggle({
            ...toggle,
            currentType: value
        })
        console.log(toggle.currentButton)
    }

    return (
        <div className="main-crvoucher">
            <h1>
              Voucher:
            </h1>
            <Radio.Group defaultValue="Point" buttonStyle="solid">
                <Radio.Button onClick={changeCurrentButton} value="Point">Point</Radio.Button>
                <Radio.Button onClick={changeCurrentButton} value="Gift">Gift</Radio.Button>
                <Radio.Button onClick={changeCurrentButton} value="Buy">Buy</Radio.Button>
            </Radio.Group>

            <div className="create-voucher">
                <div className="create1">
                    <div className="content-create">
                        <label>Voucher Name:</label>
                        <input readOnly></input>
                    </div>
                    <div className="content-create">
                        {toggle.currentButton === 'Point'?<label>Point:</label>: ''}
                        {toggle.currentButton === 'Gift'?<label>Gift:</label>: ''}
                        {toggle.currentButton === 'Buy'?<label>Buy:</label>: ''}
                        <input></input>
                    </div>
                    <div className="content-create">
                        <label>From Date:</label>
                        <DatePicker></DatePicker>
                    </div>
                    <div className="content-create">
                        <label>To Date:</label>
                        <DatePicker></DatePicker>
                    </div>
                    <div className="content-create">
                        <label>Description:</label>
                        <textarea></textarea>
                    </div>
                </div>
                <div className="create1">
                    <div className="content-create">
                        <label>Status:</label>
                        <input defaultValue="Unavailable" readOnly></input>
                    </div>
                    <div className="content-create">
                        <label>Conditions Type:</label>
                        <Select onChange={selectType} style={{ width: 120 }} defaultValue={toggle.currentType} >
                            <Option value="Discount">Discount</Option>
                            <Option value="Value">Value</Option>
                            <Option value="Combine">Combine</Option>
                        </Select>
                    </div>
                    <div className="content-create">
                        <label>Value:</label>
                        {toggle.currentType === 'Discount' ?<input disabled></input> : <input></input>}
                    </div>
                    <div className="content-create">
                        <label>Discount:</label>
                        {toggle.currentType === 'Value' ? <input disabled></input> : <input></input>}
                    </div>
                    <div className="content-create">
                        <label>Max Cost:</label>
                        <input></input>
                    </div>
                    <div className="content-create">
                        <label>Sub Type:</label>
                        <Select style={{ width: 120 }} defaultValue="food" >
                            <Option value="food">Food</Option>
                            <Option value="drink">Move</Option>
                            <Option value="drink">Shopping</Option>
                        </Select>
                    </div>

                    <div className="btn-footer">
                        <Button size='large' type="danger"><Link to='/a/voucher/manage'>Cancel</Link></Button>
                        <Button size='large' type="primary">Create</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateVoucher