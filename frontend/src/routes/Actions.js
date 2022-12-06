import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style/Actions.css';
import axios from 'axios';
import { format, parse } from 'date-fns';

const Actions = () => {
    const [status, setStatus] = useState('');
    const [phone, setContactNr] = useState('');
    const [textarea, setTextarea] = useState('');
    const [visitDate, setStartDate] = useState(new Date());

    // console.log(visitDate)

    let { id } = useParams();

    const addAction = (_id) => {
        axios.put('http://localhost:3005/addAction/' + id, {
            visitDate, phone, textarea
        }
        )
    };

    const handleColor = (time) => {
        return time.getHours() > 12 ? 'text-success' : 'text-error';
    }

    useEffect(() => {
        setStatus('')
    }, []);

    return (
        <div className='actions-form'>
            <form className='form'>

                <input className='input' type='phone' name='contactNr' onChange={(e) => setContactNr(e.target.value)} placeholder='Podaj numer kontaktowy'></input>


                <div className='date'>
                    <DatePicker
                        showTimeSelect
                        dateFormat='dd/MM/yyyy'
                        name='startDate'
                        selected={visitDate}
                        timeClassName={handleColor}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>

                <textarea className='textarea' name='textarea' onChange={(e) => setTextarea(e.target.value)} placeholder='Pole tekstowe'></textarea><br />

                <button className='btn addActionOrCancel' type='submit' onClick={(e) => {
                    e.preventDefault()
                    addAction(status._id)
                }}>Dodaj</button>
                <Link className='btn addActionOrCancel' to={`/custommer/${id}`}>Anuluj</Link>
            </form>

        </div>
    )
};

export default Actions;

