import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PinEditForm from './PinEditForm';
import './PinEdit.css'


function PinEditModal(props) {
    const showPinEditModal = props.showPinEditModal
    const setShowPinEditModal = props.setShowPinEditModal
    // const setShowSignUpModal = props.setShowSignUpModal
    return (
        <>
        <button className="modal-pin-edit" onClick={() => setShowPinEditModal(true)}>Edit Pin</button>
        {showPinEditModal && (
            <Modal onClose={() => setShowPinEditModal(false)}>
            <PinEditForm 
                setShowPinEditModal={setShowPinEditModal}
            />
            </Modal>
        )}
        </>
    );
}

export default PinEditModal;
