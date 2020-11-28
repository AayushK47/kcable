import React, { useState } from 'react';
import Connectiondetails from './ConnectionForm';

function AddCustomer() {
    const [connectionDetails, setConnectionDetails] = useState([ <Connectiondetails /> ]);


    function addConnectionForm() {
        const cd = [...connectionDetails];
        cd.push(<Connectiondetails />)
        setConnectionDetails(cd);
    }

    return (
        <div className="py-10 px-5">
            <h1 className="text-3xl">Add Customer</h1>
            <div className="flex flex-col justify-evenly h-64 mt-10">
                <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                    <input type="text" className="my-1 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Name"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Mobile No.</label>
                    <input type="text" className="my-1 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Mobile No."/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Address</label>
                    <input type="text" className="my-1 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Address"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Area</label>
                    <input type="text" className="my-1 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Area"/>
                </div>
            </div>
            <div>
                <h3 className="text-lg mt-5 mb-3">Connection Details</h3>
                { connectionDetails }
                <button onClick={ addConnectionForm } className="bg-white rounded-md px-2 py-1 border font-bold text-blue-400 border-blue-400 hover:text-white hover:bg-blue-400">Add Connection</button>
            </div>
            <button className="bg-blue-400 p-2 my-6 rounded rounded-md text-white">Submit</button>
        </div>
    )
}

export default AddCustomer