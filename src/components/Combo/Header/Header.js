import React from 'react'

import './Header.scss'

export const Header = ({ title = "Title" }) => (
    <div className="combo-header">
        <h1 >{title}</h1>
        <hr />
    </div>
)