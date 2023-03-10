import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import PinEditForm from './PinEditForm';
import './PinEdit.css'


function PinEditModal({pin}) {
    const [showPinEditModal, setShowPinEditModal] = useState(false)

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
