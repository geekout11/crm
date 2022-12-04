import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Client from './Client';


const Home = () => {
    const [clientData, setClientData] = useState([])

    const allClientsData = (_id) => {
        axios
            .get('http://localhost:3005/all')
            .then((res) => {
                setClientData(res.data)
                // console.log(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        allClientsData()
    }, []);

    return (
        <div>
            <Client clientData={clientData} allClientsData={allClientsData} />
        </div>
    )
}

export default Home

