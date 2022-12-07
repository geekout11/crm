import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../routes/style/SingleCustommer.css';
import Moment from 'react-moment';

const SingleCustommer = () => {
    const [status, setStatus] = useState({
        name: '',
        address: {
            city: '',
            street: '',
            apartmentNumber: '',
            zipcode: ''
        },
        nip: '',
        actions: []
    });

    const [name, setName] = useState('');
    const [nip, setNip] = useState('');
    const [update, setUpdate] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [apartmentNumber, setApNumber] = useState('');
    const [zipcode, setZipcode] = useState('');

    let { id } = useParams();

    const editClick = (id) => {
        setUpdate(id)
    };

    const updateClient = (_id) => {
        axios
            .put('http://localhost:3005/update/' + id, {
                name, address: {
                    city, street, apartmentNumber, zipcode
                }, nip
            })
            .then(() => {
                setUpdate('')
                oneClient(_id)
            })
    };

    const oneClient = (id) => {
        axios
            .get('http://localhost:3005/fetchSingleClient/' + id)
            .then((res) => {
                setStatus(res.data)
            })
    };

    useEffect(() => {
        oneClient(id)
    }, []);

    // console.log(status);

    if (update === status.id) {
        return (
            <div >
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
                <button className='btn' onClick={() => updateClient(status._id)}>Zapisz</button>
                <button className='btn' onClick={(() => setUpdate(''))}>Anuluj</button>
            </div>
        )
    };

    return (
        <div className='tableWrapper'>
            <button className='btn' onClick={() => {
                setName(status.name)
                setNip(status.nip)
                setCity(status.address.city)
                setStreet(status.address.street)
                setApNumber(status.address.apartmentNumber)
                setZipcode(status.address.zipcode)
                editClick(status.id)
            }}>Edytuj</button>
            <Link className='btn' to={`/actions/${status._id}`}>Dodaj Akcje</Link>
            <table>
                <thead>
                    <tr>
                        <th colSpan='3'>Tabela</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><th>Imię i nazwisko</th><td colSpan='2'>{status.name}</td></tr>
                    <tr><th>NIP</th><td colSpan='2'>{status.nip}</td></tr>
                    <tr>
                        <th colSpan='3'>Adres</th>
                    </tr>
                    <tr><th>Miasto</th><th>Ulica i numer</th><th>Kod pocztowy</th></tr>
                    <tr>
                        <td>{status.address.city}</td>
                        <td>{status.address.street} {status.address.apartmentNumber}</td>
                        <td>{status.address.zipcode}</td>
                    </tr>

                    {status.actions.map((clientsActions, index) => {

                        // console.log(status)
                        // console.log(actions)

                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <th colSpan='3'>Akcje</th>
                                </tr>
                                <tr>
                                    <th colSpan='1'>Numer telefonu</th>
                                    <th colSpan='1'>Data kontaktu</th>
                                    <th colSpan='1'>Data dodania akcji</th>
                                </tr>
                                <tr>
                                    <td colSpan='1'>{clientsActions.phone}</td>

                                    <td colSpan='1' className='red'>
                                        <Moment format="YYYY-MM-DD HH:mm">{clientsActions.visitDate}
                                        </Moment>
                                    </td>
                                    <td colSpan='1' className='green'>
                                        <Moment format="YYYY-MM-DD HH:mm">{clientsActions.dateAdded}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan='3'>Opis</th>
                                </tr>
                                <tr>
                                    <td colSpan='3'>{clientsActions.textarea}</td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default SingleCustommer;