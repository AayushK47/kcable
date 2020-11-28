import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useToggle from '../hooks/useToggle';
import Modal from '../components/Modal';
import Search from '../components/Search';
import Table from '../components/Table';
import AddCustomer from '../components/AddCustomer';
import PageLayout from '../components/PageLayout';

function Customer(props) {
    const [data, setData] = useState([]);
    const [showModal, toggleModal] = useToggle(true);

    useEffect(() => {
        async function getData(){
            const data = await axios.get('http://localhost:5000/customers/');
            console.log(`Data: ${JSON.stringify(data)}`)

            setData(data.data)
        }

        getData();
    }, [])
    
    return (
        <PageLayout navBrand='Customers' location={props.path}>
            <Search />
            <button onClick={toggleModal} className="my-5 bg-blue-400 mx-3 px-3 py-2 text-white rounded-md">Add Customer</button>
            <Table data={data} headings={['Name', 'Mobile No.', 'Area', '', '']} />
            { showModal ? <Modal toggleModal={toggleModal}><AddCustomer /></Modal> : '' }
        </PageLayout>
    )
}

export default Customer;