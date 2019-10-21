import React from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './Login.scss'
import { LoginForm } from './LoginForm/LoginForm';

const Login = ({location}) => {
    const isLogged = useSelector(state => state.user.isLoggedIn)
    const { from } = location.state || { from : { pathname: '/' }}
    return (
        <div className="login-page d-flex-center">
            <div className="wrap-login-form">
                {isLogged ? (
                    <Redirect to={from} />
                ) : (
                    <LoginForm />
                )}
            </div>
        </div>
    )
}

export default Login