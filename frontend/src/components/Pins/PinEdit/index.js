import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import PinEditForm from './PinEditForm';
import './PinEdit.css'


function PinEditModal({pin}) {
    // const showPinEditModal = props.showPinEditModal
    // const setShowPinEditModal = props.setShowPinEditModal
    const [showPinEditModal, setShowPinEditModal] = useState(false)
    console.log(showPinEditModal)

    // const setShowSignUpModal = props.setShowSignUpModal
    return (
        <>
            <button className="modal-pin-edit" onClick={() => setShowPinEditModal(true)}></button>
            {showPinEditModal && (
                <Modal onClose={() => setShowPinEditModal(false)}>
                    <PinEditForm
                        setShowPinEditModal={setShowPinEditModal}
                        pin={pin}
                    />
                </Modal>
            )}
        </>
    );
}

export default PinEditModal;
