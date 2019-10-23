import React, { useState, useEffect, useCallback } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import { Table, Divider, Input, Form, message } from 'antd';

import './ActiveCombo.scss'
import { debounce, formatVND } from '../../../utils';
import { Header } from '../Header/Header';
import moment from 'moment';
import { formatOfDateFromDB, dateFormat } from '../../../constant';
import VouchersShort from '../VouchersInCombo/VouchersShort';
import VouchersDetail from '../VouchersInCombo/VouchersDetail';


const ActiveCombo = ({
    combos,
    isFetchingCombo,
    isMaxPageCombo,
    isFetchingVoucher,
    isMaxPageVoucher,
    featchCombos,
    receiveDetailCombo,
    stopPatchCombo,
    featchVouchers
}) => {
    useEffect(() => {
        if (!isMaxPageCombo)
            featchCombos({ page: 0, limit: 9999 })
    }, [featchCombos, isMaxPageCombo])
    useEffect(() => {
        if(!isMaxPageVoucher)
            featchVouchers({page: 0, limit: 9999})
    }, [featchVouchers, isMaxPageVoucher])

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
            setDisplayCombos(combos.filter(combo => combo.combo_name.toUpperCase().includes(str.toUpperCase())))
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
        expandedRowRender: record => <VouchersDetail isFetchingVoucher={isFetchingVoucher} voucher_array={record.voucher_array} />,
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
            key: 'price',
            title: 'Price',
            dataIndex: 'value',
            render: price => formatVND(price),
            sorter: (a, b) => a.value - b.value,
            width: 100
        },
        {
            key: 'duration',
            title: 'Duration',
            dataIndex: 'days',
            render: days => `${days} Ngày`,
            sorter: (a, b) => a.days - b.days,
            width: 100
        },
        {
            key: 'fromDate',
            title: 'From',
            dataIndex: 'from_date',
            render: date => moment(date, formatOfDateFromDB).format(dateFormat),
            width: 150,
            sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date)
        },
        {
            key: 'toDate',
            title: 'To',
            dataIndex: 'to_date',
            render: date => moment(date, formatOfDateFromDB).format(dateFormat),
            width: 150,
            sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date)
        },
        {
            key: 'voucherArray',
            title: 'Vouchers',
            dataIndex: 'voucher_array',
            render: vouchers => <VouchersShort isFetchingVoucher={isFetchingVoucher} voucher_array={vouchers} />,
            sorter: (a, b) => a.voucher_array.length - b.voucher_array.length,
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
                        <Input value={search} onChange={searchChange} placeholder="enter combo name" id="validating" />
                    </Form.Item>
                </Form>
            </div>
            <div className="combo-list">
                <Table
                    loading={isFetchingCombo}
                    {...tableConfig}
                    dataSource={(displayCombos.length > 0 ? displayCombos : null)}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default ActiveCombo