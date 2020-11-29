import { useState } from 'react';

function defaultValidation(value) {
    console.log(`Returning ${value.length > 0}`)
    return value.length > 0
}

function useInputState(initialValue='', validationFunction=defaultValidation) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(1);

    function changeValue(e) {
        setValue(e.target.value);
    }

    function validate(){
        validationFunction(value) ? setIsValid(true) : setIsValid(false);
    }

    return [value, changeValue, isValid, validate]
}

export default useInputState;