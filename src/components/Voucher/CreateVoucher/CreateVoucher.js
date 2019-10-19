import React from 'react'
import { Button, Radio } from 'antd';
import { DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom'

const  Option  = Select.Option;
const CreateVoucher = () => {
    return (
        <div className="main-crvoucher">
            <h1>
              Voucher:
            </h1>
            <Radio.Group defaultValue="Point" buttonStyle="solid">
                <Radio.Button value="Point">Point</Radio.Button>
                <Radio.Button value="Gift">Gift</Radio.Button>
                <Radio.Button value="Buy">Buy</Radio.Button>
            </Radio.Group>

            <div className="create-voucher">
                <div className="create1">
                    <div className="content-create">
                        <label>Name:</label>
                        <input readOnly></input>
                    </div>
                    <div className="content-create">
                        <label>Voucher Name:</label>
                        <input></input>
                    </div>
                    <div className="content-create">
                        <label>Point:</label>
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
                        <input readOnly></input>
                    </div>
                    <div className="content-create">
                        <label>Conditions Type:</label>
                        <Select style={{ width: 120 }} defaultValue="discount" >
                            <Option value="discount">Discount</Option>
                            <Option value="value">Value</Option>
                        </Select>
                    </div>
                    <div className="content-create">
                        <label>Value:</label>
                        <input></input>
                    </div>
                    <div className="content-create">
                        <label>Discount:</label>
                        <input></input>
                    </div>
                    <div className="content-create">
                        <label>Max Cost:</label>
                        <input></input>
                    </div>
                    <div className="content-create">
                        <label>Sub Type:</label>
                        <Select style={{ width: 120 }} defaultValue="food" >
                            <Option value="food">Food</Option>
                            <Option value="drink">Drink</Option>
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