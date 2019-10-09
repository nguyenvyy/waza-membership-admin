import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';


export const PageLoading = () => (
    <div className="container-full d-flex-center">
        <Spin size="large" />
    </div>
)