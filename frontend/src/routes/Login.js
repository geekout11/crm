import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../routes/style/Login.css'

const Login = (props) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState([])

    const validateForm = (e) => {

        let errorsValidate = []

        if (email.trim() === '') {
            errorsValidate.push('Wpisz email')
        }

        if (password.trim() === '') {
            errorsValidate.push('Wpisz hasło')
        } else if (email && password !== form) {
            errorsValidate.push('Wpisz poprawny email i hasło')
        } else if (password === form) {
            errorsValidate.push('Zalogowano')
        }

        // console.log(form)

        if (errorsValidate.length > 0) {
            setErrors(
                errorsValidate.map((errorTxt, index) => {
                    return <li key={index}>{errorTxt}</li>
                })
            )

            return false
        }
    }

    const userSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://127.0.0.1:3005/api/user/login',
                ({
                    email: email,
                    password: password
                }))
            .then((req) => {
                props.setUser(req.data)
                localStorage.setItem('user', JSON.stringify(req.data))
            })
            .catch((err) => {
                console.error(err)
            })
    }


    const stateLogin = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const { email, password } = form;

    return (
        <div>
            {props.user && <Navigate to='/home' />}
            <form action='#' onSubmit={userSubmit}>
                <h3>Logowanie</h3>
                <input type='text' value={email} onChange={stateLogin} name='email' placeholder='Podaj login'></input>
                <input type='password' value={password} name='password' onChange={stateLogin} placeholder='Podaj hasło'></input>
                <button className='btn' type='submit' onClick={validateForm}>Zaloguj</button>
            </form>
            <div className='errorsWrapper'>
                <ul className='errors'>{errors}</ul>
            </div>
        </div>
    )
};

export default Login;