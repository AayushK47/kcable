import React, { useState } from 'react';

function Search(props) {
    const [searchTerm, setSearchterm] = useState('');
    const [filterParam, setFilterParam] = useState('name');

    function toggleFilterParam(x) {
        if(x.target.textContent === 'Mobile No.') {
            setFilterParam('mob_no');
        } else {
            setFilterParam('name');
        }
    }

    function filterData(e) {
        let data = JSON.parse(JSON.stringify(props.data));
        data = data.filter(x => x[filterParam].includes(e.target.value.toLowerCase()));
        setSearchterm(e.target.value);
        props.setData(data);
    }

    return (
        <div className="w-full bg-white align-middle px-2 py-4 rounded-md">
            <input type="text" onChange={filterData} value={searchTerm} className="border focus:border-blue-400 w-full py-1 px-2 rounded-md" placeholder="Search"/>
            <div className="flex mt-3">
                <button onClick={toggleFilterParam} className={`${filterParam === 'name' ? 'bg-blue-400': 'border border-blue-400 hover:bg-blue-400'} rounded-md ${filterParam === 'name' ? 'text-white': 'text-blue-400 hover:text-white'} py-2 px-2`}>Name</button>
                <button onClick={toggleFilterParam} className={`${filterParam === 'mob_no' ? 'bg-blue-400': 'border border-blue-400 hover:bg-blue-400'} rounded-md ${filterParam === 'mob_no' ? 'text-white': 'text-blue-400 hover:text-white'} py-2 px-2 ml-2`}>Mobile No.</button>
            </div>
        </div>
    )
}

export default Search;