import React from 'react';

function ConnectionForm() {
    return (
        <div className="py-3">
            <div className="flex flex-col">
                <label htmlFor="">STB No.</label>
                <input type="text" className="my-2 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Set-top Box No."/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Company</label>
                <input type="text" className="my-2 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Set-top Box Brand"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Monthly Amount</label>
                <input type="text" className="my-2 py-1 px-1 border rounded-md focus:border-blue-400" placeholder="Customer's Set-top Box Brand"/>
            </div>
        </div>
    )
}

export default ConnectionForm;