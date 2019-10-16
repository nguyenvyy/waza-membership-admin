import React, { useState, useEffect, useCallback } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import { Table, Divider, Spin, Icon } from 'antd';

import './ActiveCombo.scss'
import { debounce } from '../../../utils';
import { Header } from '../Header/Header';

const VouchersDetail = ({ voucherIdArray }) => (
    <>
        <ul>
            {voucherIdArray.map((item, index) => <li key={index}>{item} x 14 detail....</li>)}
        </ul>
    </>
)

const Loading = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ActiveCombo = ({ combos }) => {
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
            setDisplayCombos(combos.filter(combo => combo.description.includes(str)))
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
            dataIndex: 'id',
            render: id => `Name ${id}`,
            width: 100
        },
        {
            key: 'duration',
            title: 'Duration',
            dataIndex: 'id',
            render: id => `${id * 10} Ngày`,
            width: 100
        },
        {
            key: 'fromDate',
            title: 'From',
            dataIndex: 'fromDate',
            width: 150,
            sorter: (a, b) => new Date(a.id) - new Date(b.id)
        },
        {
            key: 'toDate',
            title: 'To',
            dataIndex: 'toDate',
            width: 150,
            sorter: (a, b) => new Date(a.id) - new Date(b.id)
        },
        {
            key: 'voucherIdArray',
            title: 'Vouchers',
            dataIndex: 'voucherIdArray',
            render: voucherIdArray => (
                <ul className="voucher-list">
                    {voucherIdArray.map((item, index) => <li key={index}>{item} x 3</li>)}
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
                <span>search: </span> 
                <input value={search} onChange={searchChange} placeholder="enter combo name" />
                { isSearching && <Spin indicator={Loading} />}

            </div>
            <div className="combo-list">
                <Table
                    {...tableConfig}
                    dataSource={(displayCombos.length > 0 ? displayCombos : null)}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default ActiveCombo