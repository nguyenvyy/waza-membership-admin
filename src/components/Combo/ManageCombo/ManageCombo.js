import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import moment from 'moment'
import { Header } from '../Header/Header'
import { Button, Divider, Table, message } from 'antd'
import { NewComboModal } from '../Modal/NewComboModal';
import { formatVND } from '../../../utils'

const ManageCombo = ({
    combos, isFetching, page,
    receiveDetailCombo, featchCombos, addPostCombo, stopPatchCombo, deletePatchCombo }) => {
    useEffect(() => {
        if (page !== 9999)
            featchCombos({ page: 0, limit: 9999 })
    }, [featchCombos, page])
    //handle display combo
    const [displayCombos, setDisplayCombos] = useState([]);
    useEffect(() => {
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
    // handle stop combo
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

    const deleteCombo = (combo) => {
        const hide = message.loading('Delete combo....', 0);
        deletePatchCombo(combo._id).then(res => {
            switch (res.status) {
                case 200:
                    setTimeout(hide, 50);
                    message.success('Delete combo success', 2)
                    break;
                case 400:
                    setTimeout(hide, 50);
                    message.error('Delete combo fail', 2);
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
            width: 100,
            render: date => moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY'),
            sorter: (a, b) => new Date(a.id) - new Date(b.id)
        },
        {
            key: 'toDate',
            title: 'To',
            dataIndex: 'to_date',
            width: 100,
            render: date => moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY'),
            sorter: (a, b) => new Date(a.id) - new Date(b.id)
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'state',
            width: 100,
            render: (state, record) => `${state}`
        },
        {
            key: 'isDeleted',
            title: 'isDeleted',
            dataIndex: 'isDeleted',
            width: 100,
            render: (isDeleted) => `${isDeleted}`,
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
            render: record => (

                <span>
                    <Link to={`/a/combo/detail/${record._id}`} onClick={() => receiveDetailCombo(record)}>view</Link>
                    <Divider type="vertical" />
                    <Link to={`/a/combo/edit/${record._id}`} onClick={() => receiveDetailCombo(record)}>edit</Link>
                    {record.state && (
                        <>
                            <Divider type="vertical" />
                            <span onClick={() => stopCombo(record)} className="fake-link" >stop</span>
                        </>
                    )}
                    {!record.isDeleted && (
                        <>
                            <Divider type="vertical" />
                            <span onClick={() => deleteCombo(record)} className="fake-link">delete</span>
                        </>
                    )}

                </span>
            ),
            width: 200
        }
    ]
    return (
        <div className="detail-combo">
            <Header title="Manage Combos" />
            <Button onClick={handleOpenNewComboModal}>Add Combo</Button>
            <NewComboModal addPostCombo={addPostCombo} isOpenNewComboModal={isOpenNewComboModal} handleCloseNewComboModal={handleCloseNewComboModal} />
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