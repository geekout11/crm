import axios from 'axios';
import React, { useState } from 'react';

const SignUp = () => {
    
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordRep: ''
    })

    const submitFanction = (e) => {
        e.preventDefault()

        const { email, password, passwordRep } = form
        axios
            .post('http://127.0.0.1:3005/api/user/signup', { email, password, passwordRep })
            .then(() => {
                setError(<span>Zostałeś zarejestrowany</span>)
            })
            .catch((err) => {
                console.error(err)
            })

        setForm({
            email: '',
            password: '',
            passwordRep: ''
        })

    }

    let StateSignUP = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const { email, password, passwordRep } = form

    return (
        <div >
            <p className='error'>{error}</p>
            <form>
                <h3>Rejestracja</h3>
                <input onChange={StateSignUP} value={email} type='email' name='email' placeholder='Podaj email' ></input>
                <input onChange={StateSignUP} value={password} type='password' name='password' placeholder='Podaj hasło'></input>
                <input onChange={StateSignUP} value={passwordRep} type='password' name='passwordRep' placeholder='Powtórz hasło'></input>
                <button className='btn' onClick={submitFanction} type='submit' name='submit' >Zarejestruj</button>
            </form>

        </div>
    );
};

export default SignUp;