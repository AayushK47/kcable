import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { CustomerContext } from '../context/CustomerContext';
import Modal from '../components/Modal';
import Search from '../components/Search';
import Table from '../components/Table';
import AddCustomer from '../components/AddCustomer';
import PageLayout from '../components/PageLayout';

function Customer(props) {
    const {showAddModal, toggleAddModal} = useContext(CustomerContext);
    const [data, setData] = useState([]);
    const headings = ['name', 'address', 'area', '', '']

    useEffect(() => {
        async function getData(){
            const data = await axios.get('http://localhost:5000/customers/');
            console.log(`Data: ${JSON.stringify(data)}`)

            setData(data.data);
        }

        getData();
    }, [showAddModal]);
    
    return (
        <PageLayout navBrand='Customers' location={props.path}>
            <Search />
            <button onClick={toggleAddModal} className="my-5 bg-blue-400 mx-3 px-3 py-2 text-white rounded-md">Add Customer</button>
            <Table data={data} headings={headings} />
            { showAddModal ? <Modal toggleModal={toggleAddModal}><AddCustomer /></Modal> : '' }
        </PageLayout>
    )
}

export default Customer;