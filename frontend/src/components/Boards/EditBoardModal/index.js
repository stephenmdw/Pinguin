import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import BoardEditForm from './BoardEditForm';
import './BoardEdit.css'


function BoardEditModal({ board }) {
    const [showBoardEditModal, setShowBoardEditModal] = useState(false)
    console.log(showBoardEditModal)
    return (
        <>
            <button className="board-edit-button" style={{
                borderStyle:'none',
                backgroundColor:'transparent',
                cursor: 'pointer'
            }}
                onClick={() => setShowBoardEditModal(true)}>Edit Board</button>
            {showBoardEditModal && (
                <Modal onClose={() => setShowBoardEditModal(false)}>
                    <BoardEditForm
                        setShowBoardEditModal={setShowBoardEditModal}
                        board={board}
                    />
                </Modal>
            )}
        </>
    );
}

export default BoardEditModal;
