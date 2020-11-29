import React, { useState, useContext } from 'react';
import axios from 'axios';

import ConnectionForm from './ConnectionForm';
import { CustomerContext } from '../context/CustomerContext';
import useInputState from '../hooks/useInputState';
import useToggle from '../hooks/useToggle';

function AddCustomer() {
    const { toggleAddModal } = useContext(CustomerContext)
    const [name, changeName, isNameValid, validateName] = useInputState();
    const [mobile, changeMobile, isMobileValid, validateMobile] = useInputState();
    const [address, changeAddress, isAddressValid, validateAddress] = useInputState();
    const [area, changeArea, isAreaValid, validateArea] = useInputState();
    const [connectionDetails, setConnectionDetails] = useState([<ConnectionForm key={0} changeConnectionDetailsData={changeConnectionDetailsData} index={0} />]);
    const [connectionDetailsData, setConnectionDetailsData] = useState([{}]);
    const [isSumbissionValid, toggleIsSumbissionValid] = useToggle();
    const [isSumbissionSuccessful, toggleIsSumbissionSuccessful] = useToggle();
    const validationArray = [isNameValid, isMobileValid, isAddressValid, isAreaValid];

    function changeConnectionDetailsData(data, index) {
        const dummyArr = [...connectionDetailsData];
        dummyArr[index] = data;
        setConnectionDetailsData(dummyArr);
    }

    async function onsubmit(){
        try{
            let formValidationArray = [];
            let obj = {name, mob_no: mobile, address, area, connections: [] }
            for(let connectionDetailData of connectionDetailsData){

                obj.connections.push({
                    stb_no: connectionDetailData.data.stb, 
                    monthly_amt: connectionDetailData.data.amt, 
                    company: connectionDetailData.data.company
                });
                formValidationArray = [...formValidationArray, ...connectionDetailData.valid]
                if(connectionDetailData.data.amt.length > 0){
                    formValidationArray.push(true)
                }
            }
            formValidationArray = [...formValidationArray, ...validationArray];
            if(formValidationArray.length === ((connectionDetails.length * 3) + 4 ) && formValidationArray.every((e) => e === true)){
                console.log('Good to go');
                const response = await axios.post('http://localhost:5000/customers', obj);
                if(response.status === 201){
                    toggleIsSumbissionSuccessful();
                    setTimeout(() => {
                        toggleAddModal();
                    }, 3000)
                }
            } else {
                toggleIsSumbissionValid();
            }
        } catch(e) {
            console.log(e)
            toggleIsSumbissionValid();
        }
    }

    function AddConnectionForm() {
        console.log(connectionDetailsData);
        const cd = [...connectionDetails];
        const cdd = [...connectionDetailsData];
        cdd.push({});
        cd.push(<ConnectionForm key={connectionDetails.length} index={connectionDetails.length} changeConnectionDetailsData={changeConnectionDetailsData} />)
        setConnectionDetails(cd);
        setConnectionDetailsData(cdd);
    }
    
    return (
        <div className="py-10 px-5">
            <h1 className="text-3xl">Add Customer</h1>
            <div className="flex flex-col justify-evenly h-64 mt-10">
                <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                    <input type="text" onChange={changeName} value={name} onBlur={validateName} className={`my-1 py-1 px-1 border ${isNameValid ? '' : 'border-red-400'} rounded-md focus:border-${isNameValid?'blue':'red'}-400`} placeholder="Customer's Name"/>
                    <small className={`text-red-400 ${isNameValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Mobile No.</label>
                    <input type="text" onChange={changeMobile} value={mobile} onBlur={validateMobile} className={`my-1 py-1 px-1 border ${isMobileValid ? '' : 'border-red-400'} rounded-md focus:border-${isMobileValid?'blue':'red'}-400`} placeholder="Customer's Mobile No."/>
                    <small className={`text-red-400 ${isMobileValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Address</label>
                    <input type="text" onChange={changeAddress} value={address} onBlur={validateAddress} className={`my-1 py-1 px-1 border ${isAddressValid ? '' : 'border-red-400'} rounded-md focus:border-${isAddressValid?'blue':'red'}-400`} placeholder="Customer's Address"/>
                    <small className={`text-red-400 ${isAddressValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Area</label>
                    <input type="text" onChange={changeArea} value={area} onBlur={validateArea} className={`my-1 py-1 px-1 border ${isAreaValid ? '' : 'border-red-400'} rounded-md focus:border-${isAreaValid?'blue':'red'}-400`} placeholder="Customer's Area"/>
                    <small className={`text-red-400 ${isAreaValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
            </div>
            <div>
                <h3 className="text-lg mt-5 mb-3">Connection Details</h3>
                { connectionDetails }
                <button onClick={ AddConnectionForm } className="bg-white rounded-md px-2 py-1 border font-bold text-blue-400 border-blue-400 hover:text-white hover:bg-blue-400">Add Connection</button>
            </div>
            <div>
                
            </div>
            <div className="my-6">
                <small className={`${isSumbissionSuccessful ? '' : 'hidden'} text-green-400`}>Customer Added Successfully</small> <br/>
                <small className={`${isSumbissionValid ? '' : 'hidden'} text-red-400`}>Please enter all the details correctly before submitting</small> <br/>
                <button onClick={ onsubmit } className="bg-blue-400 mt-2 p-2 rounded rounded-md text-white">Submit</button>
            </div>
        </div>
    )
}

export default AddCustomer;