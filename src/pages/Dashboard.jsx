import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { navigate } from '@reach/router';

import PageLayout from '../components/PageLayout';
import Table from '../components/Table';

function Dashboard(props) {
    const [data, setData] = useState([]);
    const headings = ['customer name', 'stb no', 'mobile no', 'landmark','last payment date', 'payment period', 'Payment due in', ''];

    useEffect(() => {
        async function getData() {
            const userData = JSON.parse(localStorage.getItem('userData'));

            if(Date(userData.expiresIn) < new Date()){
                navigate('/');
            } else {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
                    }
                });
                setData(response.data.docs);
            }
        }
        setTimeout(getData, 1000);
    });

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
            data.map(
                (e, i) => {
                    console.log(e.payment_date);
                    let payment_date = e.payment_date.length === 0 ? 'N.A' : new Date(e.payment_date);
                    let due_date = e.due_date.length === 0 ? 'N.A' : new Date(e.due_date);
                    let payment_period = moment(due_date).diff(moment(payment_date), 'days');
                    payment_period = isNaN(payment_period) ? 'N.A' : payment_period
                    let due_in = moment(due_date).diff(moment(), 'days') + 1;
                    console.log(due_in);

                    return (
                        <tr key={i}>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{e.name}</td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{e.stb_no} </td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{e.mob_no}</td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{e.area}</td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{payment_date === 'N.A' ? 'N.A' : payment_date.toDateString()}</td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{payment_period}</td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{due_in > 0 ? due_in : 'Overdue'}</td>
                            <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide"><button className="bg-blue-400 rounded-md text-white p-1 sm:p-2">Send Payment Reminder</button></td>
                        </tr>
                    )
                }
            )
        )
    }

    return (
        <PageLayout navBrand='Dashboard' location={props.path}>
            <Table headContent={headContent} bodyContent={bodyContent} />
        </PageLayout>
    )
}

export default Dashboard;