import { createContext, useState } from 'react';
import useToggle from '../hooks/useToggle';

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [isLoggedIn, toggleIsLoggedIn] = useToggle();
    const [token, setToken] = useState('');

    return (
        <AuthContext.Provider value={{ isLoggedIn, toggleIsLoggedIn, token, setToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}