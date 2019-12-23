import React, { useState, useEffect } from 'react'
import { getVoucherById } from '../../../redux/actions/voucherx-actions/services'

const ViewVoucher = ({match, history}) => {
    const id = match.params.id
    const intialState = {
        dataVoucherByID : ''
    }

    const [toggle, setToggle] = useState(intialState)

    useEffect(() => {
        console.log(id)
        getVoucherById(id)
        .then(res => {
            setToggle({
                ...toggle,
                dataVoucherByID: res.data
            })
        })  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>
        <h1 className="title-voucher">View Voucher</h1>
            <div className="create1">
                <div className="content-create d-flex">
                    <label>id:</label>
                    <p>{toggle.dataVoucherByID._id}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Voucher name:</label>
                    <p>{toggle.dataVoucherByID.voucher_name}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Value:</label>
                    <p>{toggle.dataVoucherByID.value}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Discount:</label>
                    <p>{toggle.dataVoucherByID.discount}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Rank:</label>
                    {toggle.dataVoucherByID.rank === 0 ? <p>Thành viên</p> : ''}
                    {toggle.dataVoucherByID.rank === 1 ? <p>Bạc</p> : ''}
                    {toggle.dataVoucherByID.rank === 2 ? <p>Vàng</p> : ''}
                </div>
                <div className="content-create d-flex">
                    <label>Description:</label>
                    <p>{toggle.dataVoucherByID.description}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Category:</label>
                    <p>{toggle.dataVoucherByID.category}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Sub Category:</label>
                    <p>{toggle.dataVoucherByID.subcategory}</p>
                </div>
                <div className="content-create d-flex">
                    <label>Time to use:</label>
                    <p>{toggle.dataVoucherByID.times_to_use}</p>
                </div>        
            </div>
    </div>
}

export default ViewVoucher