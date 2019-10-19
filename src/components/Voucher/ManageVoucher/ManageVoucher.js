import React from 'react'
import { Tabs, Button } from 'antd';
import './ManageVoucher.scss'
import { Link } from 'react-router-dom'
const { TabPane } = Tabs;

const ManageVoucher = () => {
    return (
        <div>
            <h1>Manage Voucher</h1>

            <Button type="primary" size='large' className="cr-voucher">
                <Link to='/a/voucher/create'>
                    Create Voucher
                </Link>
            </Button>

            <Tabs defaultActiveKey="1" className="data-table">
                <TabPane tab="Point" key="1">
                    Now Point is no data
                </TabPane>
                <TabPane tab="Buy" key="2">
                    Now Buy is no data 
                </TabPane>
                <TabPane tab="Gift" key="3">
                    Now Gift is no data
                </TabPane>
            </Tabs>
        </div>   
    )
}
export default ManageVoucher