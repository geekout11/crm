import React, { useState } from "react"
import axios from "axios"
import "./style/AddClients.css"
import { Navigate } from "react-router-dom";


const AddClient = (props) => {
    const [errors, setErrors] = useState(null)
    const [name, setName] = useState('')
    const [address, setAddress] = useState({
        city: '',
        street: '',
        apartmentNumber: '',
        zipcode: ''
    })
    const [nip, setNip] = useState('')

    const resetForm = () => {
        setName('')
        setAddress({
            city: '',
            street: '',
            apartmentNumber: '',
            zipcode: ''
        })
        setNip('')
        setErrors([])
        // console.log('reset Form')
    }

    const validateForm = (e) => {
        e.preventDefault()

        let errorsValidate = []

        if (name.trim() === '') {
            errorsValidate.push('Wpisz Imie i Nazwisko')
        }

        if (address.city.trim() === '') {
            errorsValidate.push('Wpisz miasto')
        }

        if (errorsValidate.length > 0) {
            setErrors(
                errorsValidate.map((errorTxt, index) => {
                    return <li key={index}>{errorTxt}</li>
                })
            )

            return false
        }

        // console.log(address)

        const newEvent = {
            name: name,
            address: {
                city: address.city,
                street: address.street,
                apartmentNumber: address.apartmentNumber,
                zipcode: address.zipcode,
            },
            nip: nip,
        }

        // console.log(newEvent)
        submitClient(newEvent)

        resetForm()
    }

    const submitClient = (e) => {
        // console.log(e)


        axios.post('http://localhost:3005/api/add', { name, address, nip })
            .then((res) => {
                setErrors(<span>Dodałeś klienta</span>)
            });
    };

    const handleChangeName = (e) => {
        // console.log(e)
        setName(e.target.value)
    }

    const handleChangeCity = (e) => {
        // console.log('handleChangeAddress')
        setAddress((prevAddress) => {
            return {
                city: e.target.value,
                street: prevAddress.street,
                apartmentNumber: prevAddress.apartmentNumber,
                zipcode: prevAddress.zipcode
            }
        });
    }

    const handleChangeStreet = (e) => {
        // console.log('handleChangeAddress')
        setAddress((prevAddress) => {
            return {
                street: e.target.value,
                city: prevAddress.city,
                apartmentNumber: prevAddress.apartmentNumber,
                zipcode: prevAddress.zipcode
            }
        });
    }

    const handleChangeApartmentNumber = (e) => {
        // console.log('handleChangeAddress')
        setAddress((prevAddress) => {
            return {
                street: prevAddress.street,
                city: prevAddress.city,
                apartmentNumber: e.target.value,
                zipcode: prevAddress.zipcode
            }
        });
    }

    const handleChangeZipcode = (e) => {
        // console.log('handleChangeAddress')
        setAddress((prevAddress) => {
            return {
                street: prevAddress.street,
                city: prevAddress.city,
                apartmentNumber: prevAddress.apartmentNumber,
                zipcode: e.target.value
            }
        });
    }

    const handleChangeNip = (e) => {
        // console.log('handleChangeCity')
        setNip(e.target.value)
    }


    return (
        <div>
            <form onSubmit={validateForm}>
                <input
                    value={name}
                    type="text"
                    onChange={handleChangeName}
                    name="name"
                    placeholder="Podaj imie i nazwisko">
                </input>

                <input
                    type="text"
                    value={address.city}
                    onChange={handleChangeCity}
                    placeholder="Podaj miasto">
                </input>

                <input
                    type="text"
                    value={address.street}
                    onChange={handleChangeStreet}
                    placeholder="Podaj ulice">
                </input>

                <input
                    type="text"
                    value={address.apartmentNumber}
                    onChange={handleChangeApartmentNumber}
                    name="address"
                    placeholder="Podaj numer">
                </input>

                <input
                    type="text"
                    value={address.zipcode}
                    onChange={handleChangeZipcode}
                    name="address"
                    placeholder="Podaj kod pocztowy">
                </input>

                <input
                    value={nip}
                    type="text"
                    onChange={handleChangeNip}
                    name="nip"
                    placeholder="Podaj NIP">
                </input>

                <button className="btn" type="submit" >Dodaj klienta</button>

                <div className='errorsWrapper'>
                    <ul className='errors'>{errors}</ul>
                </div>
            </form>
        </div>
    );
};

export default AddClient;
