import React from 'react';

function ViewCustomer(props) {
    console.log(props)
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
                        props.customer.connections.map((e, i) =>
                            <div>
                                <h3 className="text-lg">Connection {i+1}</h3>
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