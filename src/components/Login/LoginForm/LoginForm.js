import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './LoginForm.scss'
import { Input } from '../../common/Input';
import { Button, message } from 'antd';
import { requestLogin } from '../../../redux/actions/auth-actions/actions';
import { ErrorMessage } from '../../Combo/ErrorMessage/ErrorMessage';


export const LoginForm = () => {
    const isLogging = useSelector(state => state.user.isLoadingUser)
    const dispath = useDispatch()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user !== null) {
            setUser(JSON.parse(user))
        }
    }, [])
    const [isRemember, setIsRemember] = useState(false)
    const onChangeRemember = e => {
        setIsRemember(!isRemember)
    }


    const onChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleLogin = _ => {

        dispath(requestLogin(user)).then(res => {
            switch (res && res.status) {
                case 200:
                    message.success('Login success')
                    if (isRemember) {
                        localStorage.setItem('user', JSON.stringify(user))
                    }
                    break;
                case 400:
                    message.error('username or password is incorrect')
                    break;
                default:
                    message.error('Login failed')
                    break;
            }
        })
    }
    const onEnter = e => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    }
    return (
        <div className="login-form d-flex-col" >
            <label className="login-form-title" htmlFor="username">Waza MemberShip(Admin)</label>
            <div className="wrap-input">
                <Input className="input" name="username" placeholder="Username"
                    value={user.username}
                    onChange={onChange}
                    onKeyUp={onEnter}
                />
            </div>
                <ErrorMessage hasError={user.username === "" ? true : false} message="username is not null " />
            <div className="wrap-input">
                <Input className="input" name="password" type="password" placeholder="Password"
                    value={user.password}
                    onChange={onChange}
                    onKeyUp={onEnter}
                />
            </div>
                <ErrorMessage hasError={user.password === "" ? true : false} message="username is not null " />
            <div className="d-flex justify-content-between form-group ">
                <div className="remember-user">
                    <Input id="remember" type="checkbox" checked={isRemember} onChange={onChangeRemember} />

                    <label htmlFor="remember">Remember me</label>
                </div>
                <div>
                    <Link className="forgot-password" to="/forgot-password">Forgot</Link>
                </div>
            </div>
            <Button className="btn-submit" 
            disabled={user.username === '' && user.password === '' ? true : false}
            loading={isLogging} onClick={handleLogin}>
                LOGIN
            </Button>
        </div>
    )
}
