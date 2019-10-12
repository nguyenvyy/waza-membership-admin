import React from 'react'
import { Icon, Tooltip } from 'antd'

import './UserInfo.scss'

export const UserInfo = ({collapsed, username = 'unknown'}) => (
    <div className={`user-paner${collapsed ? '-collapsed' : ''}`}>
    {
        !collapsed ? (
            <>
                <div className="user-name ">
                    <span>
                        {username}
                    </span>
                </div>
                <span className="pointer">
                    <Icon type="logout" />
                </span>
            </>
        ) : (
            <Tooltip placement="right" title={'Logout! ' + username}>
                <span>
                    <Icon style={{fontSize: '20px'}} type="logout" />
                </span>
            </Tooltip>
        )
    }
</div>
)