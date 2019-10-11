import React from 'react';

import './Login.css'
import { LoginForm } from './LoginForm/LoginForm';

const Login = () => {

    return (
        <div className="login-page container-full d-flex-center">
            <div className="wrap-login-form">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login