import React, { useState, useEffect, useCallback } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import { Table, Divider, Input, Form, message } from 'antd';

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

const ActiveCombo = ({ combos, isFetching, featchCombos, receiveDetailCombo, page, stopPatchCombo }) => {
    useEffect(() =>{
        if(page !== 9999)
        featchCombos({page: 0, limit: 9999})
    }, [featchCombos, page])

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

    const stopCombo = (combo) => {
        const hide = message.loading('Stop combo....', 0);
        const newCombo = {
            ...combo,
            state: false
        }
        stopPatchCombo(newCombo).then(res => {
            switch (res.status) {
                case 200:
                    setTimeout(hide, 50);
                    message.success('Stop combo success', 2)
                    break;
                case 400:
                    setTimeout(hide, 50);
                    message.error('Stop combo fail', 2);
                    message.warning(`${res.data.message}`, 3);
                    break;
                case 404:
                    setTimeout(hide, 50);
                    message.error('Combo not found', 2);
                    message.warning(`${res.data.message}`, 3);
                    break;
                default:
                    setTimeout(hide, 50);
                    break;
            }
        })
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
            render: (record) => (
                <span>
                    <Link to={`/a/combo/detail/${record._id}`} onClick={() => receiveDetailCombo(record)}>View Detail</Link>
                    <Divider type="vertical" />
                    <span onClick={() => stopCombo(record)} className="fake-link">Stop</span>
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