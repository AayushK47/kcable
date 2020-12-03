import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

function Header(props) {
    const { logout } = useContext(AuthContext)
    return (
        <header className="flex items-center justify-between bg-white px-6 py-3">
            <span className="text-xl">{props.navBrand}</span>
            <span onClick={logout} className="cursor-pointer text-xl font-extralight hidden lg:block">Log Out</span>
            <button onClick={props.toggleCollapsed} className="text-gray-500 focus:outline-none lg:hidden">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </header>
    )
}

export default Header;