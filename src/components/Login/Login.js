import React from 'react';

import './Login.scss'
import { LoginForm } from './LoginForm/LoginForm';

const Login = () => {

    return (
        <div className="login-page d-flex-center">
            <div className="wrap-login-form">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login