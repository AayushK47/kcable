import React from 'react';

function Table(props) {
    console.log(props);
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <tr>
                        {
                            props.headings.map(e => <th className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{e}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {
                        props.data.map(
                            e => <tr>
                                    <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{ e.name }</td>
                                    <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{ e.mob_no }</td>
                                    <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide">{ e.area }</td>
                                    <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide"><button className="bg-blue-400 rounded-md text-white p-1 sm:p-2">Edit details</button></td>
                                    <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center capitalize font-meduim tracking-wide"><button className="bg-blue-400 rounded-md text-white p-1 sm:p-2">View details</button></td>
                                </tr>
                        
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;