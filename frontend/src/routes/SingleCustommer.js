import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../routes/style/SingleCustommer.css';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SingleCustommer = (i, _id) => {
    const [status, setStatus] = useState({
        name: '',
        address: {
            city: '',
            street: '',
            apartmentNumber: '',
            zipcode: ''
        },
        nip: '',
        actions: [{
            dateAdded: new Date(),
            visitDate: new Date(),
            phone: '',
            textarea: '',
        }]
    });

    // console.log(status)

    const [removeAction, setRemoveAction] = useState('')
    const [name, setName] = useState('');
    const [nip, setNip] = useState('');
    const [update, setUpdate] = useState('');
    const [actionUpdate, setActionUpdate] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [apartmentNumber, setApNumber] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');
    const [textarea, setTextarea] = useState('');
    const [visitDate, setVisitDate] = useState(new Date())
    const [dateAdded, setStartDate] = useState(new Date())

    let { id } = useParams();

    const editClick = (_id) => {
        // console.log(_id)
        setUpdate(_id)
    };

    const questionDelete = (_id) => {
        setRemoveAction(_id)
    };

    const updateClient = (_id) => {
        axios
            .put('http://localhost:3005/update/' + _id, {
                name, address: {
                    city, street, apartmentNumber, zipcode
                }, phone, textarea, dateAdded, visitDate, nip
            })
            .then((res) => {
                setUpdate('')
                oneClient(_id)
            })
    };

    // console.log(status.actions[i])

    const updateAction = (_id, i) => {

        // console.log(_id)

        axios
            .put('http://localhost:3005/action/update/' + _id,
                {
                    phone, textarea, dateAdded, visitDate,
                }
            )
            .then((res) => {
                window.location.reload()
                setActionUpdate('')
            })
    };

    const oneClient = (_id) => {
        axios
            .get('http://localhost:3005/fetchSingleClient/' + _id)
            .then((res) => {
                setStatus(res.data)
            })
    };

    const deleteAction = (_id) => {
        axios
            .delete('http://localhost:3005/api/deleteAction/' + _id)
            .then((res) => {
                oneClient(id)
            })
            .catch((err) => {
                console.error(err)
            })
    };

    const handleColor = (time) => {
        return time.getHours() > 12 ? 'text-success' : 'text-error';
    }

    useEffect(() => {
        oneClient(id)
    }, []);

    // console.log(status);

    const handleChangePhone = (e) => {
        // console.log(e)
        setPhone(e.target.value)
    }


    const handleChangeTextarea = (e) => {
        // console.log('handleChangeCity')
        setTextarea(e.target.value)
    }




    if (update) {

        // console.log(status._id)
        // console.log(update)

        return (
            <div>
                <div className='editCustomerData'>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan='5'>
                                    Edytuj Klienta
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan='2'>Imię i nazwisko</th>
                                <td colSpan='3'>
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='name'></input>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan='2'>NIP</th>
                                <td colSpan='3'>
                                    <input type='text' value={nip} onChange={(e) => setNip(e.target.value)} name='nip'></input>
                                </td>
                            </tr>
                            <tr>
                                <th>Adres</th>
                                <td>
                                    <input type='text' placeholder='Miasto' value={city} onChange={(e) => setCity(e.target.value)} name='city'></input>
                                </td>
                                <td>
                                    <input type='text' placeholder='Ulica' value={street} onChange={(e) => setStreet(e.target.value)} name='street'></input>
                                </td>
                                <td>
                                    <input type='text' placeholder='Numer' value={apartmentNumber} onChange={(e) => setApNumber(e.target.value)} name='apartmentNumber'></input>
                                </td>
                                <td>
                                    <input type='text' placeholder='Kod pocztowy' value={zipcode} onChange={(e) => setZipcode(e.target.value)} name='city'></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button className='btn editBtn' onClick={() => updateClient(status._id)}>Zapisz dane klienta</button>
                <button className='btn editBtn' onClick={() => setUpdate('')}>Powrót</button>
            </div >

        )
    }

    // console.log(status.textarea)
    // console.log(status.nip)

    return (
        <div className='tableWrapper'>
            <button className='btn' onClick={(index) => {
                setName(status.name)
                setNip(status.nip)
                setCity(status.address.city)
                setStreet(status.address.street)
                setApNumber(status.address.apartmentNumber)
                setZipcode(status.address.zipcode)
                editClick(status._id)
            }}>Edytuj</button>
            <Link className='btn' to={`/actions/${status._id}`}>Dodaj Akcje</Link>

            <table>
                <thead>
                    <tr>
                        <th colSpan='4'>Tabela</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><th>Imię i nazwisko</th><td colSpan='3'>{status.name}</td></tr>
                    <tr><th>NIP</th><td colSpan='3'>{status.nip}</td></tr>
                    <tr>
                        <th colSpan='4'>Adres</th>
                    </tr>
                    <tr>
                        <th colSpan='1'>Miasto</th>
                        <th colSpan='2'>Ulica i numer</th>
                        <th colSpan='1'>Kod pocztowy</th>
                    </tr>
                    <tr>
                        <td colSpan='1'>{status.address.city}</td>
                        <td colSpan='2'>{status.address.street}, {status.address.apartmentNumber}</td>
                        <td colSpan='1'>{status.address.zipcode}</td>
                    </tr>

                    {status.actions.map((clientsActions, index) => {

                        if (actionUpdate === clientsActions._id) {

                            // console.log(clientsActions)

                            return (
                                <tr key={clientsActions._id}>
                                    <td>
                                        <input
                                            type='text'
                                            placeholder='Numer telefonu'
                                            value={status.phone}
                                            onChange={handleChangePhone} name='phone' />
                                    </td>

                                    <td>
                                        <DatePicker
                                            showTimeSelect
                                            dateFormat='dd/MM/yyyy hh:mm'
                                            name='visitDate'
                                            selected={visitDate}
                                            timeClassName={handleColor}
                                            onChange={(date) => setVisitDate(date)}
                                        />
                                    </td>

                                    <td>
                                        <textarea
                                            type='text'
                                            placeholder='Wpisz opis'
                                            value={status.textarea}
                                            onChange={handleChangeTextarea}
                                            name='textarea' />
                                    </td>

                                    <td>
                                        <button type="submit" className="save" onClick={() => updateAction(clientsActions._id)}>Zapisz</button></td>
                                </tr>
                            )
                        }
                        // console.log(status.actions)
                        // console.log(clientsActions._id)


                        if (removeAction === clientsActions._id) {

                            // console.log(update)
                            // console.log(clientsActions)

                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <th colSpan='4'>Akcje</th>
                                    </tr>
                                    <tr>
                                        <th colSpan='1'>Numer telefonu</th>
                                        <th colSpan='1'>Data kontaktu</th>
                                        <th colSpan='1'>Data dodania akcji</th>
                                        <th colSpan='1'>Opcje</th>
                                    </tr>
                                    <tr>
                                        <td colSpan='1'>{clientsActions.phone}</td>

                                        <td colSpan='1' className='red'>
                                            <Moment format="DD-MM-YYYY HH:mm">{clientsActions.visitDate}
                                            </Moment>
                                        </td>
                                        <td colSpan='1' className='green'>
                                            <Moment format="DD-MM-YYYY HH:mm">{clientsActions.dateAdded}
                                            </Moment>
                                        </td>
                                        <td className='deletionRequestTD'>
                                            <label>Jesteś pewien?</label><br />
                                            <button className='btn deletionRequest bg-green' onClick={() => deleteAction(clientsActions._id)}>Tak</button>
                                            <button className='btn deletionRequest bg-red' onClick={() => setRemoveAction('')}
                                            >Nie</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan='4'>Opis</th>
                                    </tr>
                                    <tr>
                                        <td colSpan='4'>{clientsActions.textarea}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        };

                        // console.log(status)
                        // console.log(actions)


                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <th colSpan='4' className='bg-red'>Akcje</th>
                                </tr>
                                <tr>
                                    <th colSpan='1'>Numer telefonu</th>
                                    <th colSpan='1'>Data kontaktu</th>
                                    <th colSpan='1'>Data dodania akcji</th>
                                    <th colSpan='1'>Opcje</th>
                                </tr>
                                <tr>
                                    <td colSpan='1'>{clientsActions.phone}</td>

                                    <td colSpan='1' className='red'>
                                        <Moment format="DD-MM-YYYY HH:mm">{clientsActions.visitDate}
                                        </Moment>
                                    </td>
                                    <td colSpan='1' className='green'>
                                        <Moment format="DD-MM-YYYY HH:mm">{clientsActions.dateAdded}
                                        </Moment>
                                    </td>
                                    <td>
                                        <button className='btn removeAction' onClick={(i) => {
                                            setActionUpdate(clientsActions._id)
                                            setPhone(status.phone)
                                            setTextarea(status.textarea)
                                        }
                                        }>Edytuj akcje</button>
                                        <button className='btn removeAction' onClick={() => questionDelete(clientsActions._id)}>Usuń akcje</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan='4'>Opis</th>
                                </tr>
                                <tr>
                                    <td colSpan='4'>{clientsActions.textarea}</td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
};

export default SingleCustommer;