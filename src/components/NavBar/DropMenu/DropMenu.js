import React, { useMemo } from 'react';

import './DropMenu.scss'
import { MenuItems } from '../MenuItems/MenuItems';

export const DOWN = 'DOWN'
export const RIGHT = 'RIGHT'

export const DropMenu = ({type = DOWN, items, ...rest}) => {
    const dropClassType = useMemo(() => {
        switch (type) {
            case DOWN:
                return 'dropdown-menu'
            case RIGHT:
                return 'drop-right-menu'
            default:
                throw new Error('Drop type is invalid')
        }
    }, [type])
    return <MenuItems className={`${dropClassType}`} items={items}  {...rest} />
}