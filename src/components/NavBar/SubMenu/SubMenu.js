import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import './SubMenu.css'
import { LetterIcon } from '../LetterIcon/LetterIcon'
import { Icon } from 'antd';
import { DropMenu, RIGHT } from '../DropMenu/DropMenu';



export const SubMenu = ({ items, to, title, shortHand, CollapsedIcon = LetterIcon, collapsed, ...rest }) => {
    const { pathname } = useLocation();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(pathname.includes(`${to}/`))
    }, [pathname, to])
    const [isDrop, setIsDrop] = useState(false);
    const [isDropRight, setIsDropRight] = useState(false);

    const iconStyle = (isDrop || isActive) ? { color: 'white' } : {};

    const onDrop = () => {
        !collapsed && setIsDrop(!isDrop)
    }

    const onDropRign = () => {
        collapsed && setIsDropRight(true)
    }

    const onCloseDropRigh = () => {
        collapsed && setIsDropRight(false)
    }


    return (
        <li>
            <div
                className={classNames(
                    'sub-menu',
                    { 'd-flex-center': collapsed },
                    { 'd-flex justify-content-between align-items-center': !collapsed },
                )}
                onClick={onDrop}
                onMouseEnter={onDropRign}
                onMouseLeave={onCloseDropRigh}
            >
                {
                    (shortHand !== undefined && collapsed === true) &&
                    <CollapsedIcon isActive={isActive}>{shortHand}</CollapsedIcon>

                }
                {!collapsed ?
                    <>
                        <div className={`title ${(isActive || isDrop) && 'actived'}`} >
                            {title}
                        </div>
                        {isDrop ?
                            <Icon type="down" style={iconStyle} /> :
                            <Icon type="up" style={iconStyle} />
                        }
                    </> :
                    isDropRight && <DropMenu type={RIGHT} items={items}  {...rest} />
                }
            </div>
            {(isDrop && !collapsed) && <DropMenu items={items}  {...rest} />}

        </li>

    )
}