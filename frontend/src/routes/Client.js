import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './style/Client.css';

const Client = (props) => {
    const [removeClient, setRemoveClient] = useState('')
    const [editEvents, setEditEvents] = useState('');
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')


    const questionDelete = (_id) => {
        setRemoveClient(_id)
    };

    const deleteClient = (_id) => {
        axios
            .delete('http://localhost:3005/api/delete/' + _id)
            .then(() => {
                props.allClientsData()
            })
            .catch((err) => {
                console.error(err)
            })
    };

    // const deleteAction = (_id) => {
    //     axios
    //         .delete('http://localhost:3005/api/deleteAction/' + _id)
    //         .then(() => {
    //             props.allClientsData()
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //         })
    // };

    // const updateEvent = (rowId) => {
    //     if (window.confirm('Zaaktualizować użytkownika?')) {
    //         // console.log(city)
    //         axios
    //             .put('http://localhost:3005/update/' + rowId,
    //                 { name, city, street }, { mode: 'cors' }
    //             )
    //             .then((res) => {
    //                 // window.location.reload();
    //                 //   getEvents()
    //                 setEditEvents('')
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     }
    // }


    // let clientData = props.clientData;

    // console.log(props.clientDatas)

    let element = props.clientData.map((clientInfo, index) => {
        // console.log(clientInfo)

        if (removeClient === clientInfo._id) {

            return (
                <tr key={clientInfo._id}>
                    <td>{index + 1}</td>
                    <td>
                        {clientInfo.name}
                    </td>
                    <td>
                        <ul className='clientAddress'>
                            <li>
                                Miasto: {clientInfo.address.city}
                            </li>

                            <li>
                                Ulica: {clientInfo.address.street}
                            </li>

                            <li>
                                Numer: {clientInfo.address.apartmentNumber}
                            </li>

                            <li>
                                Kod pocztowy: {clientInfo.address.zipcode}
                            </li>

                        </ul>
                    </td>
                    <td>
                        {clientInfo.nip}
                    </td>
                    <td>
                        <label>Jesteś pewien?</label><br />
                        <button className='btn' onClick={() => deleteClient(clientInfo._id)}>Tak</button>
                        <button className='btn' onClick={() => setRemoveClient('')}>Nie</button>
                    </td>
                </tr>
            )
        };

        return (
            <tr key={clientInfo._id}>
                <td>{index + 1}</td>
                <td>{clientInfo.name}</td>
                <td>
                    <ul className='clientAddress'>
                        <li>
                            Miasto: {clientInfo.address.city}
                        </li>

                        <li>
                            Ulica: {clientInfo.address.street}

                        </li>

                        <li>
                            Numer: {clientInfo.address.apartmentNumber}
                        </li>

                        <li>
                            Kod pocztowy: {clientInfo.address.zipcode}
                        </li>
                    </ul>
                </td>
                <td>{clientInfo.nip}</td>
                <td>
                    <Link className="btn" to={`/custommer/${clientInfo._id}`}>Więcej informacji</Link>
                    <button className='btn' onClick={() => questionDelete(clientInfo._id)}>Usuń klienta</button>
                </td>

            </tr>
        );
    });

    return (
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th colSpan='5'>Klienci</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text'>#</td>
                        <td className='text'>Imie i nazwisko</td>
                        <td className='text'>Adres</td>
                        <td className='text'>NIP</td>
                        <td className='text'>Akcje</td>
                    </tr>
                    {element}
                </tbody>
            </table>
        </div>
    );
};

export default Client;
