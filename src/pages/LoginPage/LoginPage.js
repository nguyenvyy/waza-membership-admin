import React from 'react';

import './LoginPage.css'
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const LoginPage = () => {

    return (
        <div className="login-page container-full d-flex-center">
            <div className="wrap-login-form">
                <LoginForm />
            </div>
        </div>
    )
}