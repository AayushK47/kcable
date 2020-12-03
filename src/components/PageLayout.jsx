import React, { useState } from 'react';


import Sidebar from './Sidebar';
import Header from './Header'

function PageLayout(props) {
    
    const [isCollapsed, setIsCollapsed] = useState(true);

    function toggleCollapsed() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar location={props.location} isCollapsed={isCollapsed}/>
            <div className="flex-1 flex flex-col oveflow-hidden">
                <Header navBrand={props.navBrand} toggleCollapsed={toggleCollapsed}/>
                <main className="flex-1 overflow-x-hidden bg-gray-200 overflow-y-auto mt-5 mx-3">
                    {props.children}
                </main>
            </div>
        </div>
    )
}

export default PageLayout;