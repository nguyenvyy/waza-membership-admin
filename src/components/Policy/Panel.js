import React from 'react'
import {NavLink } from 'react-router-dom'
export const PolicyPanel = () => {

    return (
        <div className="policy-panel">
            <NavLink
                to={`/a/policy/add`}
            className="policy-panel__add"
            activeClassName="policy-panel__add--active"
            >new</NavLink>
        </div >
    )
}