import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import BoardForm from './BoardForm';
import './CreateBoard.css'


function BoardCreate() {
    // const showPinEditModal = props.showPinEditModal
    // const setShowPinEditModal = props.setShowPinEditModal
    const [showBoardFormModal, setShowBoardFormModal] = useState(false)

    // const setShowSignUpModal = props.setShowSignUpModal
    return (
        <>
            <button className="modal-board-create" onClick={() => setShowBoardFormModal(true)}>+</button>
            {showBoardFormModal && (
                <Modal onClose={() => setShowBoardFormModal(false)}>
                    <BoardForm
                        setShowBoardFormModal={setShowBoardFormModal}
                    />
                </Modal>
            )}
        </>
    );
}

export default BoardCreate;
