import React from 'react';

function Table() {
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">name</th>
                        <th className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">address</th>
                        <th className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">area</th>
                        <th className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th className="px-3 py-2 border-b bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center font-meduim tracking-wide">Aayush Kurup</td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center font-meduim tracking-wide">7-E Rajved Colony</td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center font-meduim tracking-wide">Kolar Road</td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center font-meduim tracking-wide"><button className="bg-blue-400 rounded-md text-white p-1 sm:p-2">Edit details</button></td>
                        <td className="border-b px-2 py-3 leading-4 text-xs lg:text-md text-center font-meduim tracking-wide"><button className="bg-blue-400 rounded-md text-white p-1 sm:p-2">View details</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;