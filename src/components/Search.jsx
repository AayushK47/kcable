import React from 'react';

function Search() {
    return (
        <div className="w-full bg-white align-middle px-2 py-4 rounded-md">
            <input type="text" className="border focus:border-blue-400 w-full py-1 px-2 rounded-md" placeholder="Search"/>
            <div className="flex mt-3">
                <button className="bg-blue-400 rounded-md text-white py-2 px-2">Name</button>
                <button className="bg-blue-400 rounded-md text-white py-2 px-2 ml-2">Mobile No.</button>
            </div>
        </div>
    )
}

export default Search;