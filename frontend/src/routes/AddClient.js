import React, { useState } from "react"
import axios from "axios"
import "./style/AddClients.css"
import { Navigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
    const [visitDate, setVisitDate] = useState(new Date())
    const [dateAdded, setStartDate] = useState(new Date())
    const [phone, setPhone] = useState('')
    const [textarea, setTextarea] = useState('')

    // console.log(actions)

    const resetForm = () => {
        setName('')
        setAddress({
            city: '',
            street: '',
            apartmentNumber: '',
            zipcode: ''
        })
        setPhone('')
        setTextarea('')
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
            phone: phone,
            textarea: textarea
        }

        console.log(newEvent)

        // console.log(newEvent)

        // console.log(newEvent)
        submitClient(newEvent)

        resetForm()
    }

    const submitClient = (e) => {
        // console.log(e)


        axios.post('http://localhost:3005/addClientAndAction', { name, address, visitDate, dateAdded, phone, textarea, nip })
            .then((res) => {
                // console.log(res.data)
                setErrors(<span>Dodałeś klienta</span>)
            });
    };

    const handleColor = (time) => {
        return time.getHours() > 12 ? 'text-success' : 'text-error';
    }

    /* CLIENTS */

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


    /* ACTIONS */

    const handleChangePhone = (e) => {
        // console.log('handleChangeCity')
        setPhone(e.target.value)
    }

    const handleChangeTextarea = (e) => {
        // console.log('handleChangeCity')
        setTextarea(e.target.value)
    }

    return (
        <div>
            <form onSubmit={validateForm}>
                <div className='clientWrapper'>
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
                </div>

                <div className='actionsWrapper'>
                    <h3>Dodaj akcje</h3>
                    <input
                        value={phone}
                        type="text"
                        onChange={handleChangePhone}
                        name="phone"
                        placeholder="Podaj numer telefonu">
                    </input>

                    <DatePicker
                        showTimeSelect
                        dateFormat='dd/MM/yyyy hh:mm'
                        name='visitDate'
                        selected={visitDate}
                        timeClassName={handleColor}
                        onChange={(date) => setVisitDate(date)}
                    />

                    <textarea
                        value={textarea}
                        type="text"
                        onChange={handleChangeTextarea}
                        name="textarea"
                        placeholder="Wpisz opis spotkania">
                    </textarea>
                </div>

                <button className="btn" type="submit">Dodaj klienta</button>

                <div className='errorsWrapper'>
                    <ul className='errors'>{errors}</ul>
                </div>
            </form>
        </div>
    );
};

export default AddClient;
