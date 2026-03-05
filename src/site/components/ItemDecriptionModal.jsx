import { useState, useEffect } from 'react';

const ItemDescriptionModal = ({ isOpen, onClose, item }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalAnimation, setModalAnimation] = useState('fade');

    useEffect(() => {
        if (isOpen) {
            setModalAnimation('fade show');
            setShowModal(true);
            document.body.style.overflow = 'hidden';
        } else {
            setModalAnimation('fade');
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const closeModal = () => {
        setModalAnimation('fade');
        setTimeout(() => {
            setShowModal(false);
            onClose();
        }, 300);
    };

    if (!item) return null;

    return (
        <div className='custom-item-modal'>
            <div
                className={`modal ${modalAnimation}`}
                tabIndex="-1"
                aria-hidden={!showModal}
                style={{ display: showModal ? 'block' : 'none' }}
            >
                <div className={`modal-backdrop ${modalAnimation}`} style={{ zIndex: '-1' }} />
                <div className="modal-dialog modal-dialog-centered modal-lg" style={{ zIndex: '1' }}>
                    <div className="modal-content position-relative">
                        <button
                            type="button"
                            className="btn-modal-close"
                            onClick={closeModal}
                        >
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 2L2 15.5M2 2L15.5 15.5" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <div className="modal-body">
                            <div className='why-choose-section-card'>
                                <div className='row align-items-center flex-lg-row flex-column'>
                                    <div className="col-lg-5 mb-lg-0 mb-2">
                                        <div className='why-choose-img'>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className='why-choose-section-ctnt'>
                                            <h4>{item.title}</h4>
                                            <p className='mb-0' dangerouslySetInnerHTML={{ __html: item.description }} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDescriptionModal;
