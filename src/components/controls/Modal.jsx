import React from 'react'

const Modal = ({modalRef, modalTitle, children }) => {
    return (
        <div  className="modal fade human-resources-modal" id="popup" tabIndex="-1" aria-labelledby="csvLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-capitalize">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={modalRef} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal