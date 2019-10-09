import React from 'react';
import { Link } from 'react-router-dom';

import './LoginForm.css'
import { Input } from '../../Input/Input';


export const LoginForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form className="login-form d-flex-col"  onSubmit={onSubmit}>
            <label className="login-form-title" htmlFor="username">Login</label>
            <div className="wrap-input">
                <Input className="input" id="username" placeholder="Username" />
            </div>
            <div className="wrap-input">
                <Input className="input" type="password" placeholder="Password" />
            </div>
            <div className="d-flex justify-content-between form-group ">
                <div className="remember-user">
                    <Input id="remember" type="checkbox"/>
                    <label htmlFor="remember">Remember me</label>
                </div>
                <div>
                    <Link className="forgot-password" to="/forgot-password">Forgot</Link>
                </div>
            </div>
            <Input className="btn btn-submit" type="submit" value="Login" />
        </form>
    )
}
