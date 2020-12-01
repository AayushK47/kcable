import React, { useState, useContext } from 'react';
import axios from 'axios';

import ConnectionForm from './ConnectionForm';
import useInputState, { defaultValidation } from '../hooks/useInputState';
import useToggle from '../hooks/useToggle';
import { CustomerContext } from '../context/CustomerContext';

function EditCustomer(props) {
    const { toggleEditModal } = useContext(CustomerContext);
    const [name, changeName, isNameValid, validateName] = useInputState(props.customer.name, defaultValidation, true);
    const [mobile, changeMobile, isMobileValid, validateMobile] = useInputState(props.customer.mob_no, (value) => /^\d{10}$/.test(value), true);
    const [address, changeAddress, isAddressValid, validateAddress] = useInputState(props.customer.address, defaultValidation, true);
    const [area, changeArea, isAreaValid, validateArea] = useInputState(props.customer.area, defaultValidation, true);
    const [connectionDetails, setConnectionDetails] = useState([]);
    const [connectionDetailsData, setConnectionDetailsData] = useState([]);
    const [isSumbissionValid, toggleIsSumbissionValid] = useToggle();
    const [isSumbissionSuccessful, toggleIsSumbissionSuccessful] = useToggle();
    const validationArray = [isNameValid, isMobileValid, isAddressValid, isAreaValid];

    async function onSubmit(){
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
                const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/customers/${props.customer._id}`, obj);
                if(response.status === 204){
                    toggleIsSumbissionSuccessful();
                    setTimeout(() => {
                        toggleEditModal();
                    }, 3000)
                }
            } else {
                toggleIsSumbissionValid();
            }
        } catch(e) {
            toggleIsSumbissionValid();
        }
    }

    function addConnectionForm() {
        const cd = [...connectionDetails];
        const cdd = [...connectionDetailsData];
        cdd.push({});
        cd.push(<ConnectionForm key={connectionDetails.length} index={connectionDetails.length} changeConnectionDetailsData={changeConnectionDetailsData} />)
        setConnectionDetails(cd);
        setConnectionDetailsData(cdd);
    }

    function changeConnectionDetailsData(data, index) {
        const dummyArr = [...connectionDetailsData];
        dummyArr[index] = data;
        setConnectionDetailsData(dummyArr);
    }

    return (
        <div className="py-10 px-5">
            <h1 className="text-3xl">Edit Customer Details</h1>
            <div className="flex flex-col justify-evenly h-64 mt-10">
                <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                    <input type="text" onChange={changeName} value={name} onBlur={validateName} className={`my-1 py-1 px-1 border ${isNameValid ? '' : 'border-red-400'} rounded-md focus:border-${isNameValid?'blue':'red'}-400`} placeholder="Customer's Name"/>
                    <small className={`text-red-400 ${isNameValid ? 'hidden' : ''}`}>This field can not be empty</small>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Mobile No.</label>
                    <input type="text" onChange={changeMobile} value={mobile} onBlur={ validateMobile } className={`my-1 py-1 px-1 border ${isMobileValid ? '' : 'border-red-400'} rounded-md focus:border-${isMobileValid?'blue':'red'}-400`} placeholder="Customer's Mobile No."/>
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
                {
                    connectionDetails.length > 0 ?
                    <div>
                        <h3 className="text-lg mt-5 mb-3">Connection Details</h3>
                        { connectionDetails }
                    </div>: null
                }
                <button onClick={addConnectionForm} className="bg-white rounded-md my-5 px-2 py-1 border font-bold text-blue-400 border-blue-400 hover:text-white hover:bg-blue-400">Add Connection</button>
            </div>
            <div className="my-1">
            <small className={`${isSumbissionSuccessful ? '' : 'hidden'} text-green-400`}>Customer Details Updated Successfully</small> <br/>
                <small className={`${isSumbissionValid ? '' : 'hidden'} text-red-400`}>Please enter all the details correctly before submitting</small> <br/>
                <button onClick={onSubmit} className="bg-blue-400 mt-2 p-2 rounded rounded-md text-white">Submit</button>
            </div>
        </div>
    )
}

export default EditCustomer;