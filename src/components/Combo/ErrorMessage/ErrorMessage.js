import React from 'react'

import './ErrorMessage.scss'
export const ErrorMessage = ({hasError = false, message, className = 'error',}) => (
    hasError ? <span className={className}>{message}</span> : ''
    )