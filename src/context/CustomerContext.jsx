import { createContext } from 'react';
import useToggle from '../hooks/useToggle';

export const CustomerContext = createContext();

export function CustomerContextProvider(props) {
    const [showAddModal, toggleAddModal] = useToggle();
    const [showViewModal, toggleViewModal] = useToggle();
    const [showEditModal, toggleEditModal] = useToggle();

    return (
        <CustomerContext.Provider value={{ showAddModal, toggleAddModal, showViewModal, toggleViewModal, showEditModal, toggleEditModal }}>
            {props.children}
        </CustomerContext.Provider>
    )
}