import React, { useState } from 'react';
import axios from 'axios';

function ViewCustomer(props) {
    console.log(props);
    const [connections, setConnections] = useState(props.customer.connections);

    async function deleteConnectionDetails(i) {
        let dummyConn = [...connections];
        dummyConn.splice(i, 1);
        setConnections(dummyConn);
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/customers/${props.customer._id}/${props.customer.connections[i]._id}`);
        console.log(response);
    }

    return (
        <div className="py-10 px-5">
            <h1 className="text-3xl">Customer Details</h1>
            <div className="flex flex-col justify-evenly h-64 mt-10">
                <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{props.customer.name}</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Mobile No.</label>
                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{props.customer.mob_no}</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Address</label>
                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{props.customer.address}</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Area</label>
                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{props.customer.area}</p>
                </div>
            </div>
            <div>
                <h3 className="text-xl mt-5 mb-3">Connection Details</h3>
                <div className="py-2">
                    {
                        connections.map((e, i) => 
                            <div key={i}>
                                <div className="flex justify-between">
                                    <h3 className="text-lg">Connection {i+1}</h3>
                                    <button onClick={() => deleteConnectionDetails(i)}>
                                        <svg className="w-5 h-7 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="">STB No.</label>
                                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{e.stb_no}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="">Company</label>
                                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{e.company}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="">Monthly Amount</label>
                                    <p className='my-1 py-1 w-max px-2 border rounded-md capitalize'>{e.monthly_amt}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewCustomer;