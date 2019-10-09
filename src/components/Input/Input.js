import React from 'react';

export const Input = ({ className, value, onChange, type = 'text', placeholder = 'enter...', ...props }) => {
    return (
        <input
            className={className}
            type={type} value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...props} />
    )
};
