import { createContext, useState } from 'react';
import { navigate } from '@reach/router';
import useToggle from '../hooks/useToggle';

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [isLoggedIn, toggleIsLoggedIn] = useToggle();
    const [token, setToken] = useState('');
    const [expirationDate, setExpirationDate] = useState(null);

    function logout() {
        localStorage.removeItem('userData');
        toggleIsLoggedIn();
        setToken('');
        setExpirationDate(null)
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, toggleIsLoggedIn, token, setToken, expirationDate, setExpirationDate, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}