import React from 'react';
import { Avatar, Tooltip } from 'antd';

export const LetterIcon = ({
    children,
    isActive,
    title,
    isActiveStyle = {
        backgroundColor: 'white',
        color: '#001529'
    },
    noActiveStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white'
    }


}) => {

    return (
        <Tooltip placement="right" title={title}>
            <span>
                <Avatar style={isActive ? isActiveStyle : noActiveStyle} shape="square">{children}</Avatar>
            </span>
        </Tooltip>
    )
}