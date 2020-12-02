import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

import { CustomerContext } from '../context/CustomerContext';
import { AuthContext } from '../context/AuthContext';
import Modal from '../components/Modal';
import Search from '../components/Search';
import Table from '../components/Table';
import AddCustomer from '../components/AddCustomer';
import ViewCustomer from '../components/ViewCustomer';
import EditCustomer from '../components/EditCustomer';
import PageLayout from '../components/PageLayout';

function Customer(props) {
    const auth = useContext(AuthContext);
    const { showAddModal, toggleAddModal, showViewModal, toggleViewModal, showEditModal, toggleEditModal } = useContext(CustomerContext);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [data, setData] = useState([]);
    const headings = ['name', 'address', 'area', '', ''];

    function changeSelectedCustomer(value){
        setSelectedCustomer(value)
    }

    function headContent() {
        return (
            <tr>
                {
                    headings.map((e, i) => <th key={i} className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{e}</th>)
                }
            </tr>
        )
    }

    function bodyContent() {
        return (
            data.map(e => {
                return (
                    <tr key={e._id}>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{ e.name }</td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{ e.mob_no }</td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{ e.area }</td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide"><button onClick={() => {changeSelectedCustomer(data.find(x => x._id === e._id)); toggleEditModal()}} className="bg-blue-400 rounded-md text-white p-1 sm:p-2">Edit details</button></td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide"><button onClick={() => {changeSelectedCustomer(data.find(x => x._id === e._id)); toggleViewModal()}} className="bg-blue-400 rounded-md text-white p-1 sm:p-2">View details</button></td>
                    </tr>
                )
            })
        )
    }

    useEffect(() => {
        async function getData(){
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customers/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            setData(data.data);
        }

        if(!auth.isLoggedIn || auth.token.length === 0){
            console.log('reaches here')
            navigate('/');
        } else {
            getData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAddModal, showEditModal, showViewModal]);
    
    return (
        <PageLayout navBrand='Customers' location={props.path}>
            <Search />
            <button onClick={toggleAddModal} className="my-5 bg-blue-400 mx-3 px-3 py-2 text-white rounded-md">Add Customer</button>
            <Table data={data} headContent={headContent} bodyContent={bodyContent} />
            { showAddModal ? <Modal toggleModal={toggleAddModal}><AddCustomer /></Modal> : '' }
            { showViewModal ? <Modal toggleModal={toggleViewModal}><ViewCustomer customer={selectedCustomer}/></Modal> : '' }
            { showEditModal ? <Modal toggleModal={toggleEditModal}><EditCustomer customer={selectedCustomer}/></Modal> : '' }
        </PageLayout>
    )
}

export default Customer;