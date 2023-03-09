import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

function LoginFormPage(props) {
const dispatch = useDispatch();
const sessionUser = useSelector(state => state.session.user);
const [credential, setCredential] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState([]);
const setShowLoginModal = props.setShowLoginModal
const setShowSignUpModal = props.setShowSignUpModal

if (sessionUser.user) return <Redirect to="/" />;

const demoLogin = (e) => {
    e.preventDefault()
    dispatch(login( {credential: 'Demo-lition', password: 'password'}))
}

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
        let data;
        try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
        } catch {
            data = await res.text(); // Will hit this case if the server is down
        }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
    }

    const changeForm = () => {
        setShowLoginModal(false)
        setShowSignUpModal(true)
    }

    return (
    <form onSubmit={handleSubmit} className="login-form">
        <div className="login-pinguin-logo"></div>
        <h1 className="login-header">Welcome to Pinguin</h1>
       
        <div className="login-form-wrapper">
        <label className="login-label">Username
        <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
        />
        </label>
        <label className="login-label">Password
        <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </label>
        </div>
        <div >
        <button className="login-button" type="submit">Log In</button>
        </div>
        <button className="login-button" onClick={demoLogin} >Demo Login</button>
        <button className="change-form" onClick={changeForm}>Not on Pinguin yet? Sign up</button>
    </form>
    );
}


export default LoginFormPage;