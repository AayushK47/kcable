import React from 'react';
import useInputState from '../hooks/useInputState';

function ConnectionForm(props) {
    const [stb, changeStb, isStbValid, validateStb] = useInputState();
    const [company, changeCompany, isCompanyValid, validateCompany] = useInputState();
    const [amt, changeAmt, isAmtValid, validateAmt] = useInputState();
    const obj = {
        data: {
            stb,
            company,
            amt,
        },
        valid: [
            isStbValid,
            isCompanyValid
        ]
    }

    return (
        <div className="py-3">
            <div className="flex flex-col">
                <label htmlFor="">STB No.</label>
                <input type="text" onChange={changeStb} value={stb} onBlur={validateStb} className={`my-1 py-1 px-1 border ${isStbValid ? '' : 'border-red-400'} rounded-md focus:border-${isStbValid?'blue':'red'}-400`} placeholder="Customer's Set-top Box No."/>
                <small className={`text-red-400 ${isStbValid ? 'hidden' : ''}`}>This field can not be empty</small>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Company</label>
                <input type="text" onChange={changeCompany} value={company} onBlur={validateCompany} className={`my-1 py-1 px-1 border ${isCompanyValid ? '' : 'border-red-400'} rounded-md focus:border-${isCompanyValid?'blue':'red'}-400`} placeholder="Customer's Set-top Box Brand"/>
                <small className={`text-red-400 ${isCompanyValid ? 'hidden' : ''}`}>This field can not be empty</small>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Monthly Amount</label>
                <input type="text" onChange={changeAmt} onBlur={() => { console.log('ran'); validateAmt(); props.changeConnectionDetailsData(obj, props.index) }} value={amt} className={`my-1 py-1 px-1 border ${isAmtValid ? '' : 'border-red-400'} rounded-md focus:border-${isStbValid?'blue':'red'}-400`} placeholder="Customer's Set-top Box Brand"/>
                <small className={`text-red-400 ${isAmtValid ? 'hidden' : ''}`}>This field can not be empty</small>
            </div>
        </div>
    )
}

export default ConnectionForm;