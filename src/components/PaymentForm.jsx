import React, { useContext } from 'react';
import axios from 'axios';
import moment from 'moment';

import useInputState from '../hooks/useInputState';
import { CustomerContext } from '../context/CustomerContext';
import useToggle from '../hooks/useToggle';

function PaymentForm(props) {
    const { togglePaymentModal } = useContext(CustomerContext);
    const [amt, changeAmt, isAmtValid, validateAmt] = useInputState(props.data.monthly_amt.toString(), validateDate, true);
    const date = new Date();
    const [pDate, changePDate, isPDateValid, validatePDate] = useInputState(`${(date.getDate().toString().length < 2) ? '0' : ''}${date.getDate()}-${(date.getMonth() <= 9) ? '0' : ''}${date.getMonth() + 1}-${date.getFullYear()}`, validateDate, true);
    const [dueDate, changeDueDate, isDueDateValid, validateDueDate] = useInputState();
    const [isSumbissionValid, toggleIsSumbissionValid] = useToggle();
    const [isSumbissionSuccessful, toggleIsSumbissionSuccessful] = useToggle();
    const validationArray = [isAmtValid, isPDateValid, isDueDateValid];

    function validateDate(x) {
        return /[01][0-9]-\d{2}-\d{4}/.test(x);
    }

    async function onSubmit() {
        try {
            if(validationArray.length === 3 && validationArray.every(e => e === true)){
                console.log('submit the form');
                const [date, month, year] = pDate.split('-');
                const pay_date = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD').toDate();
                const d_date = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD').add(dueDate, 'd').toDate();

                const obj = {
                    amount: amt,
                    payment_date: pay_date.toISOString(),
                    due_date: d_date.toISOString(),
                    customer_id: props.data._id
                }

                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/payments`, obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
                    }
                })
                console.log(response);
                toggleIsSumbissionSuccessful();
                setTimeout(togglePaymentModal, 2000);
            } else {
                toggleIsSumbissionValid();
            }
        } catch(e) {
            toggleIsSumbissionValid();
        }
    }
    
    return (
        <div className="py-10 px-5">
            <h1 className="text-3xl">Add Payment</h1>
            <div className="flex flex-col justify-evenly h-64 mt-10">
                <div className="flex">
                    <div className="flex w-1/2 mr-1 flex-col">
                        <label htmlFor="">Name</label>
                        <input type="text" value={`${props.data.name}`} className={`my-1 py-1 px-1 border rounded-md`} placeholder="Customer's Name" disabled/>
                    </div>
                    <div className="flex w-1/2 mr-1 flex-col">
                        <label htmlFor="">STB No.</label>
                        <input type="text" value={`${props.data.stb_no}`} className={`my-1 py-1 px-1 border rounded-md`} placeholder="Customer's Name" disabled/>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex w-1/2 mr-1 flex-col">
                        <label htmlFor="">Company</label>
                        <input type="text" value={`${props.data.company}`} className={`my-1 py-1 px-1 border rounded-md`} placeholder="Customer's Name" disabled/>
                    </div>
                    <div className="flex w-1/2 mr-1 flex-col">
                        <label htmlFor="">Amount</label>
                        <input type="text" className={`my-1 py-1 px-1 border ${isAmtValid ? '' : 'border-red-400'} rounded-md focus:border-${isAmtValid?'blue':'red'}-400`} onChange={changeAmt} onBlur={validateAmt} value={amt} placeholder="Customer's Name" />
                        <small className={`text-red-400 ${isAmtValid ? 'hidden' : ''}`}>This field can not be empty</small>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex w-1/2 mr-1 flex-col">
                        <label htmlFor="">Payment Date</label>
                        <input type="text" value={pDate} onChange={changePDate} onBlur={validatePDate} className={`my-1 py-1 px-1 border ${isPDateValid ? '' : 'border-red-400'} rounded-md focus:border-${isPDateValid?'blue':'red'}-400`} placeholder="Payment Date"/>
                        <small className={`text-red-400 ${isPDateValid ? 'hidden' : ''}`}>Please enter a valid date in dd-mm-yyyy format</small>
                    </div>
                    <div className="flex w-1/2 mr-1 flex-col">
                        <label htmlFor="">Payment For</label>
                        <input type="text" value={dueDate} onChange={changeDueDate} onBlur={validateDueDate} className={`my-1 py-1 px-1 border ${isDueDateValid ? '' : 'border-red-400'} rounded-md focus:border-${isDueDateValid?'blue':'red'}-400`} placeholder="30 Days" />
                        <small className={`text-red-400 ${isDueDateValid ? 'hidden' : ''}`}>This field can not be empty</small>
                    </div>
                </div>
            </div>
            <div className="my-6">
            <small className={`${isSumbissionSuccessful ? '' : 'hidden'} text-green-400`}>Payment Successfully</small> <br/>
                <small className={`${isSumbissionValid ? '' : 'hidden'} text-red-400`}>Please enter all the details correctly before submitting</small> <br/>
                <button onClick={onSubmit} className="bg-blue-400 mt-2 p-2 rounded rounded-md text-white">Submit</button>
            </div>
        </div>
    )
}

export default PaymentForm;