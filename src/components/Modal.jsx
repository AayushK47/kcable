import React from 'react';
import { createPortal } from 'react-dom';

function Modal(props) {
    return createPortal(
        <div className="bg-gray-50 overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/4 w-5/6 md:w-3/4 lg:w-1/2 rounded-lg">
            <button onClick={props.toggleModal} className="fixed right-5 top-2 text-lg border px-1 leading-none pb-1">x</button>
            { props.children }
        </div>,
        document.getElementById('modal')
    )
}

export default Modal;