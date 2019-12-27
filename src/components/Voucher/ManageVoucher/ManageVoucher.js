import React, { useState, useEffect } from 'react'
import uuid from 'uuid'
import { Tabs, Button, Table, message, Tag } from 'antd';
import './ManageVoucher.scss'
import { getVoucher, deleteVoucherByID, getNumberOfUsedVoucher } from '../../../redux/actions/voucherx-actions/services'
import {
    Link
} from "react-router-dom";
// import moment from 'moment'
// import { formatOfDateFromDB } from '../../../constant'

const { TabPane } = Tabs;


const ManageVoucher = () => {
    const intitalState = {
        dataVoucher: [],
        dataFilter: [],
        currentFilter: "1",
        modalDelete: false,
        currentRadio: ''
    }
    // const date = new Date()
    const column = [
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
            width: 90
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            width: 300
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
            dataIndex: 'discount',
            sorter: (a, b) => a.value - b.value
        },
        {
            key: 'times_to_use',
            title: 'Times to use',
            dataIndex: 'times_to_use',
            width: 140,
            sorter: (a, b) => a.value - b.value,
        },

        {
            key: 'subcategoty',
            title: 'Sub Type',
            dataIndex: 'subcategory',
            filters: [
                {
                    text: 'Shopping',
                    value: 'shopping',
                },
                {
                    text: 'Bike',
                    value: 'bike',
                },
                {
                    text: 'Move',
                    value: 'move',
                },
                {
                    text: 'Food',
                    value: 'food',
                },
            ],
            onFilter: (value, record) => {
                return record.subcategory === value
            }
        },
        {
            title: 'Status',
            render: (_, record) => {
                // console.log('aaaaaaaaaa',record.to_date)
                if (record.state) {
                    return <div className="traffic"><div className="tr-doing"></div>Đang hoạt động</div>
                }
                if (!record.state) {
                    return <div className="traffic"><div className="tr-stop"></div>Đã dừng</div>
                }
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => {
                if (record.state) {
                    return <div className="action-acvoucher">
                        <p className="text" onClick={() => message.error('Can not edited active voucher')}>Edit</p>
                        <p className="text" onClick={() => message.error('Can not deleted active voucher')}>Delete</p>
                        <p className="text"><Link to={`/a/voucher/view/${record._id}`}>View</Link></p>
                    </div>
                }
                else {
                    return <div className="action-acvoucher">
                        <p className="text"><Link to={`/a/voucher/edit/${record._id}`}>
                            Edit
                    </Link></p>
                        <p className="text" onClick={() => deleteVoucher(record._id, record.voucher_name)}>Delete</p>
                        <p className="text"><Link to={`/a/voucher/view/${record._id}`}>View</Link></p>
                    </div>
                }
            }
        }
    ]

    const deleteVoucher = (id, name) => {
        deleteVoucherByID(id)
            .then(() => {
                message.success(`${name} deleted`)
                if (toggle.currentFilter === "1") {
                    fetchData()
                }

                if (toggle.currentFilter === "2") {
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

    const [currPage, setCurrPage] = useState(1)

    const [numberOfUsedVouchers, setNumberOfUsedVouchers] = useState(null)
    const configColumn = {
        key: 'numberOfUsedVoucher',
        title: 'Number of used vouchers',
        align: 'center',
        render: (_, record, index) => numberOfUsedVouchers === null ? <Tag color="blue">laoding...</Tag> : numberOfUsedVouchers[index],
        width: 120
    }
    let timeout
    useEffect(() => {
        if (currPage === 1 && toggle.dataFilter.length > 0) {
            const start = currPage * 10 - 10
            const end = currPage * 10
            let currVoucherID = toggle.dataFilter.slice(start, end)
            currVoucherID = currVoucherID.map(voucher => voucher._id)
            console.log(toggle.dataFilter)
            setNumberOfUsedVouchers(null)
            Promise.all(currVoucherID.map(id => getNumberOfUsedVoucher(id))).then(res => {
                if(res[0] === null) res = null
                setNumberOfUsedVouchers(res)
            })
        }
    }, [currPage, toggle.dataFilter])
    const onChangeTable = ({ current, pageSize }) => {
        if (current === 1) return
        setCurrPage(current)
        clearTimeout(timeout)
        const start = current * pageSize - pageSize
        const end = current * pageSize
        let currVoucherID = toggle.dataFilter.slice(start, end)
        currVoucherID = currVoucherID.map(combo => combo._id)
        setNumberOfUsedVouchers(null)
        timeout = setTimeout(() => {
            Promise.all(currVoucherID.map(id => getNumberOfUsedVoucher(id))).then(res => {
                if(res[0] === null) res = null
                setNumberOfUsedVouchers(res)
            })
        }, 1000);
    }


    return (
        <div>
            <h1 className="title-voucher">Manage Voucher</h1>
            <Button type="primary" size='large' className="cr-voucher">
                <Link to='/a/voucher/create'>
                    Create Voucher
                </Link>
            </Button>
            <Tabs defaultActiveKey="1" className="data-table" onChange={filterData}>
                <TabPane tab="Buy" key="1">
                    <Table rowKey={() => uuid()} loading={toggle.dataFilter.length === 0 ? true : false} columns={column} dataSource={toggle.dataFilter} ></Table>
                </TabPane>
                <TabPane tab="Gift" key="2">
                    <Table 
                    onChange={onChangeTable}
                    rowKey={() => uuid()} loading={toggle.dataFilter.length === 0 ? true : false} columns={[configColumn,...column]} dataSource={toggle.dataFilter} ></Table>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default ManageVoucher