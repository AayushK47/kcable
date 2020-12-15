/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { AuthContext } from '../context/AuthContext';

function Sidebar(props) {
    const { logout } = useContext(AuthContext)
    return (
        <div className={`${props.isCollapsed ? 'w-0 hidden': 'w-56'} lg:w-56 sidebar-bg-1 lg:block transition ease-in duration-700`}>
            <div className="flex items-center justify-center">
                <span className="text-4xl my-8 text-white font-semibold">KCable</span>
            </div>
            <nav className="block">
                <Link to='/dashboard' className={`nav-item nav-hover ${props.location === '/dashboard' ? 'nav-active': ''}`}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <span className="mx-3">Dashboard</span>
                </Link>
                <Link to='/customer' className={`nav-item nav-hover ${props.location === '/customer' ? 'nav-active': ''}`}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="mx-3">Customer</span>
                </Link>
                <Link to="/payments" className={`nav-item nav-hover ${props.location === '/payments' ? 'nav-active': ''}`}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="mx-3">Payments</span>
                </Link>
                <a onClick={logout} className="lg:hidden nav-item nav-hover">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="mx-3">Logout</span>
                </a>
            </nav>
        </div>
    )
}

export default Sidebar;