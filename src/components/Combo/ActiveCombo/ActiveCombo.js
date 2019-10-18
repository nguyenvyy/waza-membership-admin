import React, { useState, useEffect, useCallback } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import { Table, Divider, Input, Form } from 'antd';

import './ActiveCombo.scss'
import { debounce } from '../../../utils';
import { Header } from '../Header/Header';

const VouchersDetail = ({ voucher_array }) => (
    <>
        <ul>
            {voucher_array.map((item, index) =>  <li key={index}>{item.voucher_id} x {item.count}, detail....</li>)}
        </ul>
    </>
)

const ActiveCombo = ({ combos, isFetching }) => {
    const [isSearching, setIsSearching] = useState(false);

    const [displayCombos, setDisplayCombos] = useState([]);
    useEffect(() => {
        setDisplayCombos(combos)
        setSearch('')
    }, [combos])
    useEffect(() => {
        setIsSearching(false);
    }, [displayCombos])

    const searchCombo = useCallback(
        debounce(str => {
            setDisplayCombos(combos.filter(combo => combo.combo_name.includes(str)))
        }, 300), [combos]
    )

    const [search, setSearch] = useState('');
    useEffect(() => {
        searchCombo(search)
    }, [search, searchCombo])

    const searchChange = e => {
        setSearch(e.target.value)
        setIsSearching(true)
    }

    const tableConfig = {
        pagination: { position: 'top' },
        size: 'small',
        expandedRowRender: VouchersDetail,
        scroll: { y: 450 },
        rowKey: () => uuid()
    }
    const columns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            width: 50
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'combo_name',
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
                    <Link to={`/a/combo/detail/${record.id}`}>View Detail</Link>
                    <Divider type="vertical" />
                    <span className="fake-link">Stop</span>
                </span>
            ),
            width: 200
        }
    ]

    return (
        <div className="active-combos">
            <Header title="Active Combos" />
            <div>
                <Form layout="inline">
                    <Form.Item
                        label="Search"
                        hasFeedback={isSearching}
                        validateStatus="validating"
                        
                    >
                        <Input value={search} onChange={searchChange}  placeholder="enter combo name" id="validating" />
                    </Form.Item>
                </Form>

            </div>
            <div className="combo-list">
                <Table
                    loading={isFetching}
                    {...tableConfig}
                    dataSource={(displayCombos.length > 0 ? displayCombos : null)}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default ActiveCombo