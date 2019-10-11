import React from 'react'

export const MenuItems = ({ className, items, collapsed}) => (
    <ul className={className}>
        {items.map(({Component, title, to, items, ...rest}, index) => (
            <Component  title={title} to={to} items={items} key={index} collapsed={collapsed} {...rest} />
        ))}
    </ul>
) 