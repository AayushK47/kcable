import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

import PageLayout from '../components/PageLayout';
import PaymentForm from '../components/PaymentForm';
import Modal from '../components/Modal';
import { CustomerContext } from '../context/CustomerContext';
import Search from '../components/Search';

function Payments(props) {
    const { showPaymentModal, togglePaymentModal } = useContext(CustomerContext);
    const [customers, setCustomers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedConnection, setSelectedConnection] = useState(null);

    useEffect(() => {
        async function getData() {
            const userData = JSON.parse(localStorage.getItem('userData'));

            if(Date(userData.expiresIn) < new Date()){
                navigate('/');
            } else {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/payments/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
                    }
                });
                setCustomers(response.data.data);
                setFilteredData(response.data.data);
            }
        }
        setTimeout(getData, 3000);
    }, []);
    return (
        <PageLayout navBrand='Payments' location={props.path}>
            <Search data={customers} setData={setFilteredData}/>
            <div className="w-full flex my-5 h-10 h-5/6">
                <table className="w-1/2 bg-white border-r">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 border-b bg-gray-300 text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Customers</th>
                        </tr>
                    </thead>
                    <tbody className="border-b">
                        {
                            filteredData.map((e, i) => 
                                <tr key={i}>
                                    <td onClick={() => {setConnections(e.connections); setSelectedCustomer(i)}} className="py-3 border capitalize hover:bg-gray-50 px-5">{ e.name }</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <table className="w-1/2 bg-white">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 border-b bg-gray-300 text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Connections</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            connections.map((e, i) => 
                                <tr key={i}>
                                    <td onClick={() => {togglePaymentModal(); setSelectedConnection(i)}} className="py-3 capitalize hover:bg-gray-50 px-5">{e.stb_no} <br/> {e.company}</td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
            { showPaymentModal ? <Modal toggleModal={togglePaymentModal}><PaymentForm data={{...connections[selectedConnection], name: filteredData[selectedCustomer].name}} /></Modal> : null}
        </PageLayout>
    )
}

export default Payments;