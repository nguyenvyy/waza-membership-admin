import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import { Header } from '../Header/Header'
import { Button, Divider, Table } from 'antd'
import { NewComboModal } from '../Modal/NewComboModal';
import { formatVND } from '../../../utils'

const ManageCombo = ({ combos,isFetching, receiveDetailCombo, featchCombos, page ,postCombo}) => {
    useEffect(() =>{
        if(page !== 9999)
        featchCombos({page: 0, limit: 9999})
    }, [featchCombos, page])
    //handle display combo
    const [displayCombos, setDisplayCombos] = useState([]);
    useEffect(() => {
        console.log(combos)
        setDisplayCombos(combos)
    }, [combos])

    // handle add combo
    const [isOpenNewComboModal, setIsOpenNewComboModal] = useState(false);
    const handleOpenNewComboModal = () => {
        setIsOpenNewComboModal(true);
    }
    const handleCloseNewComboModal = () => {
        setIsOpenNewComboModal(false);
    }

    const goDetailCombo = (record) => {
        receiveDetailCombo(record)
        return `/a/combo/detail/${record.id}`
    }
    // config combos table
    const tableConfig = {
        pagination: { position: 'bottom' },
        size: 'midldle',
        scroll: { y: 500 },
        rowKey: () => uuid()
    }
    const columns = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'combo_name',
            width: 100
        },
        {
            key: 'value',
            title: 'Price',
            dataIndex: 'value',
            render: value => <span>{formatVND(value)}</span>,
            width: 100
        },
        {
            key: 'duration',
            title: 'Duration',
            dataIndex: 'days',
            render: days => `${days} Ngày`,
            width: 100
        },
        {
            key: 'fromDate',
            title: 'From',
            dataIndex: 'from_date',
            width: 150,
            sorter: (a, b) => new Date(a.id) - new Date(b.id)
        },
        {
            key: 'toDate',
            title: 'To',
            dataIndex: 'to_date',
            width: 150,
            sorter: (a, b) => new Date(a.id) - new Date(b.id)
        },
        {
            key: 'voucherArray',
            title: 'Vouchers',
            dataIndex: 'voucher_array',
            render: vouchers => (
                <ul className="voucher-list">
                    {vouchers.map((item, index) => <li key={index}>{item.voucher_id} x {item.count}</li>)}
                </ul>
            ),
            width: 150
        },
        {
            key: 'action',
            title: 'Action',
            render: (_, record) => (
                <span>
                    <Link to={`/a/combo/detail/${record._id}`} onClick={() => goDetailCombo(record)}>View Detail</Link>
                    <Divider type="vertical" />
                    <span className="fake-link">Stop</span>
                </span>
            ),
            width: 200
        }
    ]
    return (
        <div className="detail-combo">
            <Header title="Manage Combos" />
            <Button onClick={handleOpenNewComboModal}>Add Voucher</Button>
            <NewComboModal postCombo={postCombo} isOpenNewComboModal={isOpenNewComboModal} handleCloseNewComboModal={handleCloseNewComboModal} />
            <Table
                    loading={isFetching}
                    {...tableConfig}
                    dataSource={(displayCombos.length > 0 ? displayCombos : null)}
                    columns={columns}
                />

        </div>
    )
}
export default ManageCombo