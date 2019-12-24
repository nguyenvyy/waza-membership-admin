import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import moment from 'moment'

import './ManageCombo.scss'
import { Header } from '../Header/Header'
import { Button, Divider, Table, message, Badge, Form, Input, Tag, Icon } from 'antd'
import { NewComboModal } from '../Modal/NewComboModal';
import { formatVND, debounce } from '../../../utils'
import { dateFormat, limitDelete } from '../../../constant'
import VouchersShort from '../VouchersInCombo/VouchersShort'
import VouchersDetail from '../VouchersInCombo/VouchersDetail'
import { checkStatusCombo } from '../../../utils/combo'
import { comboStatus } from '../../../constant/combo'
import { getQuantitySoldOfComboAPI } from '../../../redux/actions/combo-actions/services'

const ManageCombo = ({
    combos, isFetchingCombo, isMaxPageCombo,
    receiveDetailCombo, fetchCombos, addPostCombo, stopPatchCombo, deletePatchCombo,
    isFetchingVoucher, fetchVouchers
}) => {
    useEffect(() => {
        fetchVouchers({ page: 0, limit: 9999 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (!isMaxPageCombo)
            fetchCombos({ page: 0, limit: 9999 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchCombos, isMaxPageCombo])
    //handle display combo
    const [displayCombos, setDisplayCombos] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
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

    useEffect(() => {
        searchCombo(search)
    }, [search, searchCombo])


    const searchChange = e => {
        setSearch(e.target.value)
        setIsSearching(true)
    }


    // handle add combo
    const [isOpenNewComboModal, setIsOpenNewComboModal] = useState(false);
    const handleOpenNewComboModal = () => {
        setIsOpenNewComboModal(true);
    }
    const handleCloseNewComboModal = () => {
        setIsOpenNewComboModal(false);
    }


    // handle stop combo
    const stopCombo = (combo) => {
        const hide = message.loading('Stop combo....', 0);
        const newCombo = {
            ...combo,
            to_date: new Date()
        }
        stopPatchCombo(newCombo).then(res => {
            switch (res && res.status) {
                case 200:
                    setTimeout(hide, 50);
                    message.success(`${combo.combo_name} stopped`, 2)
                    break;
                case 400:
                    setTimeout(hide, 50);
                    message.error('Stop failed', 2);
                    message.warning(`${res.data.message}`, 3);
                    break;
                case 404:
                    setTimeout(hide, 50);
                    message.error('Combo not found', 2);
                    message.warning(`${res.data.message}`, 3);
                    break;
                default:
                    message.error('Error', 2);
                    setTimeout(hide, 50);
                    break;
            }
        })
    }

    const deleteCombo = (combo, status) => {
        const limitDate = moment(combo.createdAt).add(limitDelete, 'years');
        const curr = Date.now()
        if (curr <= limitDate.valueOf() && status === comboStatus.stop) {
            message.warn(`You can only delete this combo when current date must be gearter than ` + limitDate.format(dateFormat), 3);
            return; // break 
        }
        const hide = message.loading('Delete combo....', 0);
        deletePatchCombo(combo._id).then(res => {
            switch (res && res.status) {
                case 200:
                    setTimeout(hide, 50);
                    message.success(`${combo.combo_name} deleted`, 2)
                    break;
                case 400:
                    setTimeout(hide, 50);
                    message.error('Delete combo failed', 2);
                    break;
                case 404:
                    setTimeout(hide, 50);
                    message.error('Combo not found', 2);
                    break;
                default:
                    message.error('Unknown Error', 2);
                    setTimeout(hide, 50);
                    break;
            }
        })
    }
    const [currPage, setCurrPage] = useState(1)
    const [quantitySolds, setQuantitySolds] = useState(null)
    let timeout
    useEffect(() => {
        if (currPage === 1 && displayCombos.length > 0) {
            const start = currPage * 10 - 10
            const end = currPage * 10
            let currCombosID = displayCombos.slice(start, end)
            currCombosID = currCombosID.map(combo => combo._id)
            setQuantitySolds(null)
            Promise.all(currCombosID.map(id => getQuantitySoldOfComboAPI(id))).then(res => {
                setQuantitySolds(res)
            })
        }
    }, [currPage, displayCombos])
    const onChangeTable = ({ current, pageSize }) => {
        setCurrPage(current)
        clearTimeout(timeout)
        const start = current * pageSize - pageSize
        const end = current * pageSize
        let currCombosID = displayCombos.slice(start, end)
        currCombosID = currCombosID.map(combo => combo._id)
        setQuantitySolds(null)
        timeout = setTimeout(() => {
            Promise.all(currCombosID.map(id => getQuantitySoldOfComboAPI(id))).then(res => {
                setQuantitySolds(res)
            })
        }, 1000);
    }

    // config combos table
    const tableConfig = {
        pagination: { position: 'bottom', currPage },
        size: 'small',
        scroll: { y: 450 },
        expandedRowRender: record => <VouchersDetail isFetchingVoucher={isFetchingVoucher} voucher_array={record.voucher_array} />,
        rowKey: () => uuid()
    }
    const columns = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'combo_name',
            width: 150
        },
        {
            key: 'value',
            title: 'Price',
            dataIndex: 'value',
            render: value => <span>{formatVND(value)}</span>,
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
            title: 'Start',
            dataIndex: 'from_date',
            width: 100,
            render: date => moment(date).format(dateFormat),
            sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date)
        },
        {
            key: 'toDate',
            title: 'End',
            dataIndex: 'to_date',
            width: 100,
            render: date => moment(date).format(dateFormat),
            sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date)
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'state',
            width: 150,
            render: (_, record) => {
                const status = checkStatusCombo(record)
                return <Badge status={status.processing} text={status.text} />
            },
            filters: [
                { text: comboStatus.active, value: comboStatus.active },
                { text: comboStatus.stop, value: comboStatus.stop },
                { text: comboStatus.deleted, value: comboStatus.deleted },
                { text: comboStatus.wait, value: comboStatus.wait }
            ],
            onFilter: (value, record) => checkStatusCombo(record).text === value,
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
            key: 'createdAt',
            title: 'Create date',
            dataIndex: 'createdAt',
            render: date => moment(date).format(dateFormat),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            width: 120
        },
        {
            key: 'quantitySold',
            title: 'Quantity sold',
            align: 'center',
            render: (_, record, index) => quantitySolds === null ? <Tag color="blue">laoding...</Tag> : quantitySolds[index],
            width: 120
        },
        {
            key: 'action',
            title: 'Action',
            render: record => {
                const status = checkStatusCombo(record)
                return (
                    <span>
                        <Link to={`/a/combo/detail/${record._id}`} onClick={() => receiveDetailCombo(record)}>view</Link>
                        {status.text === comboStatus.active && (
                            <>
                                <Divider type="vertical" />
                                <span onClick={() => stopCombo(record)} className="fake-link" >stop</span>
                            </>
                        )}
                        {(status.text === comboStatus.stop || status.text === comboStatus.wait) && (
                            <>
                                <Divider type="vertical" />
                                <Link to={`/a/combo/edit/${record._id}`} onClick={() => receiveDetailCombo(record)}>edit</Link>
                                <Divider type="vertical" />
                                <span onClick={() => deleteCombo(record, status.text)} className="fake-link">delete</span>
                            </>)
                        }
                    </span>)
            },
            width: 200
        }
    ]

    const reload = () => { 
        if(isFetchingCombo === false) {
            fetchCombos({ page: 0, limit: 9999 })
        }
    }
    return (
        <div className="detail-combo">
            <Header title="Manage Combos" />
            <div className="body">
                <div className="panel d-flex align-items-center" >
                    <Form layout="inline">
                        <Form.Item
                            label="Search"
                            hasFeedback={isSearching}
                            validateStatus="validating"
                        >
                            <Input value={search} onChange={searchChange} placeholder="enter combo name" id="validating" />
                        </Form.Item>
                    </Form>
                    <Button onClick={handleOpenNewComboModal}>Add Combo</Button>
                    <Button disabled={isFetchingCombo} onClick={reload}><Icon type="reload" /></Button>
                </div>
                <NewComboModal addPostCombo={addPostCombo} isOpenNewComboModal={isOpenNewComboModal} handleCloseNewComboModal={handleCloseNewComboModal} />
                <Table
                    loading={isFetchingCombo}
                    {...tableConfig}
                    dataSource={(displayCombos.length > 0 ? displayCombos : null)}
                    columns={columns}
                    onChange={onChangeTable}
                />
            </div>

        </div>
    )
}
export default ManageCombo