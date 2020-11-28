import { useState } from 'react';

function useToggle(initialState=false) {
    const [isOn, setIsOn] = useState(initialState);

    function toggle(){
        setIsOn(!isOn)
    }

    return [isOn, toggle];
}

export default useToggle;