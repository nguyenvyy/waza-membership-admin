import React, { useState, useEffect, useMemo } from 'react'
import { Radio, Modal, Table, Icon, Button, Input } from 'antd'

const filters = {
    food: 'food',
    move: 'move',
    shopping: 'shopping',
    bike: 'bike'
}
export const SelectMultiVouchers = ({
    vouchers, displayVouchers,
    isFetching,
    selectedVouchers, onChangeSelectedVouchers,
    isOpenSelectVoucherModal, handleCloseSelectVoucherModal }) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectVouchers = useMemo(() => selectedVouchers, [isOpenSelectVoucherModal])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoDisplayVouchers = useMemo(() => displayVouchers, [isOpenSelectVoucherModal])
    const [displayVoucher, setDisplayVoucher] = useState([])

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
    const [search, setSearch] = useState('');
    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearch({ searchText: selectedKeys[0] });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearch({ searchText: '' });
    };
    // handle search
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        setSearch(node);
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => search.select());
            }
        }
    });

    const tableConfig = {
        pagination: false,
        size: 'small',
        rowKey: (record) => record._id,
        scroll: { y: 450 },
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'voucher_name',
            width: 100,
            ...getColumnSearchProps('voucher_name')
        },
        {
            title: 'Value',
            dataIndex: 'value',
            width: 100,
            sorter: (a, b) => a.value - b.value
        },
        {
            title: 'Persent',
            dataIndex: 'discount',
            width: 100,
            sorter: (a, b) => a.discount - b.discount
        }
    ]

    const rowSelection = {
        selectedRowKeys: selectedVouchers,
        onChange: (selectedRowKeys, selectedRows) => onChangeSelectedVouchers(selectedRowKeys, selectedRows, filter),

    }

    return (
        <Modal
            className="select-voucher"
            style={{ top: 20 }}
            title="Select Voucher"
            width={600}
            visible={isOpenSelectVoucherModal}
            onOk={() => handleCloseSelectVoucherModal(undefined)}
            onCancel={(e) => handleCloseSelectVoucherModal(memoSelectVouchers, memoDisplayVouchers)}
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