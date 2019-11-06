import React from 'react'

import './Header.scss'

export const Header = ({ title = "Title", className }) => (
    <div className={`header`}>
        <h1 className={className}>{title}</h1>
        <hr />
    </div>
)