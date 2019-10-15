import React from 'react';
import { Spin } from 'antd';

import './PageLoading.scss'

export const PageLoading = () => (
    <div className="wrap-loading d-flex-center">
        <Spin size="large" />
    </div>
)