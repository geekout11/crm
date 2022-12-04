import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import "./style/AddClients.css"


export default function AddClient() {
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    // const [address, setAddress] = useState({
    //     // address: {
    //     city: '',
    //     street: ''
    //     // }
    // })
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [apNumber, setApNumber] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [nip, setNip] = useState('')

    // console.log(address)

    const resetForm = () => {
        setName('')
        setAddress('')
        setNip('')
        setError([])
        // console.log('reset Form')
    }

    const validateForm = (e) => {
        e.preventDefault()

        let errorsValidate = []

        if (name.trim() === '') {
            errorsValidate.push('Wpisz Imie i Nazwisko')
        }

        if (errorsValidate.length > 0) {
            setError(
                errorsValidate.map((errorTxt, index) => {
                    return <li key={index}>{errorTxt}</li>
                })
            )

            return false
        }

        const newEvent = {
            name: name,
            address: {
                city: city,
                street: street,
                nr: apNumber,
                zipcode: zipcode
            },
            nip: nip,
        }

        // console.log(newEvent)
        submitClient(newEvent)

        resetForm()
    }

    const submitClient = (e) => {
        // console.log(e)


        axios.post('http://localhost:3005/api/add', { name, address: {}, nip })
            .then((res) => {
                console.log(res.data);
                setError(<span>Dodałeś klienta</span>)
            });
    };
    const handleChangeName = (e) => {
        // console.log(e)
        setName(e.target.value)
    }

    const handleChangeCity = (e) => {
        // console.log('handleChangeAddress')
        setCity({
            city: e.target.value
        });
    }

    const handleChangeStreet = (e) => {
        // console.log('handleChangeAddress')
        setStreet({
            street: e.target.value
        });
    }

    const handleChangeApNumber = (e) => {
        // console.log('handleChangeAddress')
        setApNumber({
            apNumber: e.target.value
        });
    }

    const handleChangeZipcode = (e) => {
        // console.log('handleChangeAddress')
        setZipcode({
            zipcode: e.target.value
        });
    }

    const handleChangeNip = (e) => {
        // console.log('handleChangeCity')
        setNip(e.target.value)
    }


    return (
        <div><p className="error">{error}</p>
            <form onSubmit={validateForm}>
                <input
                    value={name}
                    type="text"
                    onChange={handleChangeName}
                    name="name"
                    placeholder="Podaj Imie">
                </input>

                <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                    name="address"
                    placeholder="Podaj miasto">
                </input>

                <input
                    type="text"
                    value={street}
                    onChange={handleChangeStreet}
                    name="address"
                    placeholder="Podaj ulice">
                </input>

                <input
                    type="text"
                    value={apNumber}
                    onChange={handleChangeApNumber}
                    name="address"
                    placeholder="Podaj ulice">
                </input>

                <input
                    type="text"
                    value={zipcode}
                    onChange={handleChangeZipcode}
                    name="address"
                    placeholder="Podaj ulice">
                </input>

                <input
                    value={nip}
                    type="text"
                    onChange={handleChangeNip}
                    name="nip"
                    placeholder="Podaj NIP">
                </input>
                <button className="btn-1" type="submit">Dodaj klienta</button>
            </form>
        </div>
    );
};
