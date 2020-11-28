import React from 'react';

function Table(props) {
    return (
        <div className="inline-block align-middle min-w-full my-5">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                
                                {
                                    props.headings.map(
                                        (e, i) => {
                                        return <th className="th-data" key={i}>{e}</th>
                                        }
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                                {props.data.map(customer => {
                                    return (
                                        <tr key={customer._id} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <td className="td-data">{ customer.name }</td>
                                            <td className="td-data">{ customer.mob_no }</td>
                                            <td className="td-data">{ customer.area }</td>
                                            <td className="td-data"><button className="btn">Edit Details</button></td>
                                            <td className="td-data"><button className="btn">View Details</button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
    )
}

export default Table;