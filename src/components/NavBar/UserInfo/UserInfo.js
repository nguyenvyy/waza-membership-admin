import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Icon, Tooltip } from 'antd'

import './UserInfo.scss'
import { logout } from '../../../redux/actions/auth-actions/actions'

export const UserInfo = memo(
    function UserInfo({ collapsed }) {
        const dispatch = useDispatch();
        const username = useSelector(state => state.user.info && state.user.info.username) || "anonymous"
        const handleLogout = () => {
            dispatch(logout())
        }
        return (
            <div className={`user-paner${collapsed ? '-collapsed' : ''}`}>
                {
                    !collapsed ? (
                        <>
                            <div className="user-name ">
                                <span>
                                    {username}
                                </span>
                            </div>
                            <span onClick={handleLogout} className="pointer">
                                <Icon type="logout" />
                            </span>
                        </>
                    ) : (
                            <Tooltip placement="right" title={'Logout! ' + username}>
                                <span onClick={handleLogout}>
                                    <Icon style={{ fontSize: '20px' }} type="logout" />
                                </span>
                            </Tooltip>
                        )
                }
            </div>
        )
    }
)
