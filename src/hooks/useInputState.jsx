import { useState } from 'react';

export function defaultValidation(value) {
    return value.length > 0
}

function useInputState(initialValue='', validationFunction=defaultValidation, initialIsValid=1) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(initialIsValid);

    function changeValue(e) {
        setValue(e.target.value);
    }

    function validate(){
        validationFunction(value) ? setIsValid(true) : setIsValid(false);
    }

    return [value, changeValue, isValid, validate]
}

export default useInputState;