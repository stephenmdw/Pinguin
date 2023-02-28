import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PinForm from './PinForm';
import './PinForm.css'


function PinFormModal(props) {
    const [showPinModal, setShowPinModal] = useState(false)
    return (
        <>
        <button className="modal-pin" onClick={() => setShowPinModal(true)}>Create Pin</button>
        {showPinModal && (
            <Modal onClose={() => setShowPinModal(false)}>
            <PinForm 
                setShowPinModal={setShowPinModal}
            />
            </Modal>
        )}
        </>
    );
}

export default PinFormModal;
