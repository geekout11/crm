import axios from 'axios';
import React, { useState } from 'react';
import './style/Client.css';

const Client = (props) => {
    const [removeClient, setRemoveClient] = useState('')

    function questionDelete(_id) {
        setRemoveClient(_id)
    };

    function deleteClient(_id) {
        axios
            .delete('http://localhost:3005/api/delete/' + _id)
            .then(() => {
                props.allClientsData()
            })
            .catch((err) => {
                console.error(err)
            })
    };

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
                            <li>Miasto: {clientInfo.address.city}</li>
                            <li>Ulica: {clientInfo.address.street}</li>
                            <li>Numer: {clientInfo.address.nr}</li>
                            <li>Kod pocztowy:{clientInfo.address.zipcode}</li>
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
                        <li>Miasto: {clientInfo.address.city}</li>
                        <li>Ulica: {clientInfo.address.street}</li>
                        <li>Numer: {clientInfo.address.nr}</li>
                        <li>Kod pocztowy:{clientInfo.address.zipcode}</li>
                    </ul>
                    {/* <select>
                        <option>
                            Adres
                        </option>
                        <option>
                            Miasto: {clientInfo.address.city}
                        </option>
                        <option>
                            Ulica: {clientInfo.address.street}
                        </option>
                        <option>
                            Numer: {clientInfo.address.nr}
                        </option>
                        <option>
                            Kod pocztowy: {clientInfo.address.zipcode}
                        </option>
                    </select> */}
                </td>
                <td>{clientInfo.nip}</td>
                <td>
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
