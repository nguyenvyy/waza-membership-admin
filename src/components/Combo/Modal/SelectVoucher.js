import React, { useState, useEffect, useMemo } from 'react'
import { Radio, Modal, Table } from 'antd'

const filters = {
    food: 'food',
    move: 'move',
    shopping: 'shopping',
    bike: 'bike'
}
export const SelectVoucherModal = ({ 
    vouchers, isFetching, page, fetchVouchers,
    selectedVouchers, onChangeSelectedVouchers,
    isOpenSelectVoucherModal, handleCloseSelectVoucherModal }) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectVouchers = useMemo(() => selectedVouchers, [isOpenSelectVoucherModal])

    const [displayVoucher, setDisplayVoucher] = useState([])
    useEffect(() => {
        if (page !== 9999) {
            fetchVouchers({ page: 0, limit: 9999 });
        }
    }, [fetchVouchers, page])

    const filterVoucher = (vouchers, service) => {
        return vouchers.filter(voucher => voucher.subcategory === service)
    }

    const [filter, setFilter] = useState(filters.food)
    useEffect(() => {
        setDisplayVoucher(filterVoucher(vouchers, filter))
    }, [filter, vouchers])

    const onChangeRadio = e => {
        setFilter(e.target.value)
    }


    const tableConfig = {
        pagination: false,
        size: 'small',
        rowKey: (record) => record._id
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'voucher_name',
            width: 100
        },
        {
            title: 'Type',
            dataIndex: 'category',
            width: 100
        },
        {
            title: 'Value',
            dataIndex: 'value',
            width: 100
        },
        {
            title: 'Max Value',
            dataIndex: 'max_value',
            width: 100
        },
        {
            title: 'Persent',
            dataIndex: 'discount',
            width: 100
        }
    ]
    const rowSelection = {
        selectedRowKeys: selectedVouchers[filter].value === null ? [] : [selectedVouchers[filter].value._id],
        onChange: (selectedRowKeys, selectedRows) => onChangeSelectedVouchers(selectedRowKeys, selectedRows, filter),

    }

    return (
        <Modal
            className="select-voucher"
            style={{ top: 20 }}
            title="Select Voucher"
            width={800}
            visible={isOpenSelectVoucherModal}
            onOk={() => handleCloseSelectVoucherModal(undefined)}
            onCancel={(e) => handleCloseSelectVoucherModal(e, memoSelectVouchers)}
        >
            <Radio.Group onChange={onChangeRadio} value={filter}>
                <Radio value={filters.food}>Food</Radio>
                <Radio value={filters.move}>Move</Radio>
                <Radio value={filters.shopping}>Shopping</Radio>
                <Radio value={filters.bike}>Bike</Radio>

            </Radio.Group>


            <Table
                loading={isFetching}
                {...tableConfig}
                dataSource={displayVoucher.length > 0 ? displayVoucher : null}
                rowSelection={rowSelection}
                columns={columns} />


        </Modal>
    )
}