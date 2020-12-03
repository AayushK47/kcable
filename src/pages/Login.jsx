import React, { useState, useContext } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { AuthContext } from '../context/AuthContext';
import useInputState from '../hooks/useInputState';

function LoginPage() {
    const { toggleIsLoggedIn, setToken, setExpirationDate } = useContext(AuthContext);
    const [username, changeUsername, isUsernameValid, validateUsername] = useInputState();
    const [password, changePassword, isPasswordValid, validatePassword] = useInputState();
    const [errorMessage, setErrorMessage] = useState('');


    async function onSubmit() {
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                username,
                password
            });

            if(response.status === 200) {
                toggleIsLoggedIn();
                setToken(response.data.token);
                const expDate = new Date(Date.now() + 12096e5);
                setExpirationDate(expDate);
                localStorage.setItem('userData', JSON.stringify({
                    token: response.data.token,
                    expiresIn: expDate
                }));
                navigate('/customer');
            }
        } catch(err){
            console.log(err);
            setErrorMessage('Invalid username or password. Please try again')
        }
    }

    return (
        <div className="bg-overlay h-screen pt-40">
            <div className="bg-white mx-10 md:mx-28 lg:mx-96 lg:w-1/4 py-7 rounded-md px-5">
                <h1 className="text-3xl font-light mb-3">Login</h1>
                <div className="my-2">
                    <label htmlFor="">User Name</label>
                    <input onChange={changeUsername} value={username} onBlur={validateUsername} type="text" className={`block border ${isUsernameValid ? '' : 'border-red-400'} mt-2 p-1 w-full`} placeholder="User Name"/>
                    <small className={`text-red-400 ${isUsernameValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
                <div className="my-2">
                    <label htmlFor="">Password</label>
                    <input onChange={changePassword} value={password} onBlur={validatePassword} type="password" className={`block border ${isPasswordValid ? '' : 'border-red-400'} mt-2 p-1 w-full`} placeholder="Password"/>
                    <small className={`text-red-400 ${isPasswordValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
    <small className={`${errorMessage.length > 0 ? '' : 'hidden'} text-red-400`}>{ errorMessage }</small> <br/>
                <button onClick={onSubmit} className="rounded-md mt-2 py-2 px-2 text-white bg-blue-500">Login</button>
            </div>
        </div>
    )
}

export default LoginPage;