import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import BoardEditForm from './BoardEditForm';
import './BoardEdit.css'


function BoardEditModal({board}) {
    const [showBoardEditModal, setShowBoardEditModal] = useState(false)

    return (
        <>
            <button className="board-edit-button" onClick={()=>setShowBoardEditModal(true)}>Edit Board</button>
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
