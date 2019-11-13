import React, { useState, useEffect } from 'react'
import uuid from 'uuid'
import { Tabs, Button, Table, message } from 'antd';
import './ManageVoucher.scss'
import { getVoucher, deleteVoucherByID } from '../../../redux/actions/voucherx-actions/services'
import {
    Link
} from "react-router-dom";
import moment from 'moment'
import { formatOfDateFromDB, dateFormat } from '../../../constant'

const { TabPane } = Tabs;


const ManageVoucher = () => {
    const intitalState = {
        dataVoucher: [],
        dataFilter: [],
        currentFilter: "1",
        modalDelete: false
    }

    const column = [
        {
            key: 'ID',
            title: 'ID',
            dataIndex: '_id',
            width: 150
        },
        {
            key: 'voucher_name',
            title: 'Voucher Name',
            dataIndex: 'voucher_name',
            width: 100
        },
        {
            key: 'category',
            title: 'Category',
            dataIndex: 'category',
            width: 100
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description'
        },
        {
            key: 'value',
            title: 'Value',
            dataIndex: 'value',
            sorter: (a, b) => a.value - b.value
        },
        {
            key: 'discount',
            title: 'Discount',
            dataIndex: 'discount'
        },
        {
            key: 'from_date',
            title: 'From Date',
            dataIndex: 'from_date',
            width: 160,
            render: date => moment(date, formatOfDateFromDB).format(dateFormat)
        },
        {
            key: 'to_date',
            title: 'To Date',
            dataIndex: 'to_date',
            width: 150,
            render: date => moment(date, formatOfDateFromDB).format(dateFormat)
        },
        {
            key: 'subcategoty',
            title: 'Sub Type',
            dataIndex: 'subcategory'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div className="action-acvoucher">
                    {/* <p className="text"><Link to={`/a/voucher/edit/${record._id}`}>
                        Edit
                    </Link></p>
                    <p className="text">Delete</p>
                    <p className="text">Active</p> */}
                    {/* <Route path={`/a/voucher/edit/${record._id}`} render={props => {
                        const id = props.match.params.id;
                        return (
                            <EditVoucher {...props}></EditVoucher>
                        )}}/> */}
                    <p className="text"><Link to={`/a/voucher/edit/${record._id}`}>
                        Edit
                    </Link></p>
                    <p className="text" onClick={() => deleteVoucher(record._id)}>Delete</p>
                </div>
            )
        }
    ]

    const deleteVoucher = id => {
        deleteVoucherByID(id)
            .then(() => {
                message.success('Delete Success')
                if(toggle.currentFilter === "1"){
                    fetchData()
                }
                
                if(toggle.currentFilter === "2") {
                    fetchDataGift()
                }
            })
    }

    const [toggle, setToggle] = useState(intitalState)
    
    useEffect(() => {
        fetchData()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        getVoucher()
            .then(res => {
                setToggle({
                    ...toggle,
                    dataVoucher: res.data.filter((item) => {
                        return item.isDeleted === false
                    })
                })
                setToggle(toggle => ({
                    ...toggle,
                    dataFilter: res.data.filter((item) => {
                        return item.category === "buy"
                    })
                }))
            })
    }

    const fetchDataGift = () => {
        getVoucher()
            .then(res => {
                setToggle({
                    ...toggle,
                    dataVoucher: res.data.filter((item) => {
                        return item.isDeleted === false
                    })
                })
                setToggle(toggle => ({
                    ...toggle,
                    dataFilter: res.data.filter((item) => {
                        return item.category === "gift"
                    })
                }))
            })
    }
    

    const filterData = (key) => {
        if (key === "1") {
            setToggle({
                ...toggle,
                dataFilter: toggle.dataVoucher.filter((item) => {
                    return item.category === "buy"
                }),
                currentFilter: "1"
            })
        }
        else if (key === "2") {
            setToggle({
                ...toggle,
                dataFilter: toggle.dataVoucher.filter((item) => {
                    return item.category === "gift"
                }),
                currentFilter: "2"
            })
        }
    }

    return (
        <div>
            <h1>Manage Voucher</h1>

            <Button type="primary" size='large' className="cr-voucher">
                <Link to='/a/voucher/create'>
                    Create Voucher
                </Link>
            </Button>

            <Tabs defaultActiveKey="1" className="data-table" onChange={filterData}>
                <TabPane tab="Buy" key="1">
                    <Table rowKey={() => uuid()} loading={toggle.dataFilter.length === 0 ? true: false} columns={column} dataSource={toggle.dataFilter} ></Table>
                </TabPane>
                <TabPane tab="Gift" key="2">
                    <Table rowKey={() => uuid()} loading={toggle.dataFilter.length === 0 ? true: false} columns={column} dataSource={toggle.dataFilter} ></Table>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default ManageVoucher