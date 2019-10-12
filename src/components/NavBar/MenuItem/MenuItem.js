import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './MenuItem.scss'
import { LetterIcon } from '../LetterIcon/LetterIcon';

export const MenuItem = React.memo(
    ({ title, to, collapsed, shortHand, CollapsedIcon = LetterIcon }) => {
        const [isActive, setIsActive] = useState(false)
        const realLayout = collapsed ? 'd-flex-center' : 'd-flex justify-content-start'
        return (
            <li>
                <NavLink
                    to={{
                        pathname: to
                    }}
                    isActive={(match) => {
                        if (match)
                            setIsActive(true)
                        else
                            setIsActive(false)
                    }}
                >
                    <div className={`${realLayout} ${isActive && 'actived'}  menu-item`}>
                        {
                            collapsed === true ? (
                                <CollapsedIcon title={title} isActive={isActive}>{shortHand}</CollapsedIcon>
                            ) : (
                                    <div className="title d-flex align-items-center">
                                        {title}
                                    </div>
                                )
                        }
                    </div>
                </NavLink>
            </li>
        )
    }
)