import React from 'react';

function Table(props) {
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    {props.headContent()}
                </thead>
                <tbody className="bg-white">
                    {
                        props.bodyContent()
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;