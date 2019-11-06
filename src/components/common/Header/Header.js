import React from 'react'

import './Header.scss'

export const Header = ({ title = "Title", className }) => (
    <div className={`header ${className}`}>
        <h1 >{title}</h1>
        <hr />
    </div>
)