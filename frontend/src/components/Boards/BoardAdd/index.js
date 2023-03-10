import React, { useState, useRef } from 'react';
import './BoardDropdown.css'
import BoardDropDown from './BoardDropDown';
import { Modal } from '../../../context/Modal';
import { BoardModal } from '../../../context/BoardModal';

function BoardDropdownModal({ pin }) {
    const buttonRef = useRef()
    // const showPinEditModal = props.showPinEditModal
    // const setShowPinEditModal = props.setShowPinEditModal
    const [showBoardDropdownModal, setShowBoardDropdownModal] = useState(false)
    // console.log(showBoardDropdownModal)
    const [buttonPosition, setButtonPosition] = useState(null);

    function handleClick() {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
            top: rect.bottom,
            left: rect.left,
        });
        setShowBoardDropdownModal(true)
    }

    function handleSave() {
        
    }

    // const setShowSignUpModal = props.setShowSignUpModal
    return (
        <>
            <div className="board-menu-button-wrapper">
                <button className='board-menu-opener' ref={buttonRef} onClick={handleClick}>Board</button>
                <div className='board-menu-save' onClick={handleSave}>Save</div>
            </div>
            {showBoardDropdownModal && (
                <BoardModal buttonPosition={buttonPosition} onClose={() => setShowBoardDropdownModal(false)}>
                    <BoardDropDown
                        setShowBoardDropdownModal={setShowBoardDropdownModal}
                        pin={pin}
                    />
                </BoardModal>
            )}
        </>
        // <>
        //     <div className="board-menu-button-wrapper">
        //         <button className='board-menu-opener' onClick={() => setShowBoardDropdownModal(true)}>Board</button>
        //         <div className='board-menu-save'>Save</div>
        //     </div>
        //     {showBoardDropdownModal && (
        //         <BoardModal onClose={() => setShowBoardDropdownModal(false)}>
        //             <BoardDropDown
        //                 setShowBoardDropdownModal={setShowBoardDropdownModal}
        //                 pin={pin}
        //             />
        //         </BoardModal>
        //     )}
        // </>
    );
}

export default BoardDropdownModal;
