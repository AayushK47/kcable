import { createContext } from 'react';
import useToggle from '../hooks/useToggle';

export const CustomerContext = createContext();

export function CustomerContextProvider(props) {
    const [showAddModal, toggleAddModal] = useToggle();

    return (
        <CustomerContext.Provider value={{ showAddModal, toggleAddModal }}>
            {props.children}
        </CustomerContext.Provider>
    )
}