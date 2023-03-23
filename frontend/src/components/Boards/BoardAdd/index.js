import React, { useState, useRef } from 'react';
import './BoardDropdown.css'
import BoardDropDown from './BoardDropDown';
import { Modal } from '../../../context/Modal';
import { BoardModal } from '../../../context/BoardModal';

function BoardDropdownModal({ pin }) {
    const buttonRef = useRef()
    const [showBoardDropdownModal, setShowBoardDropdownModal] = useState(false)
    // console.log(showBoardDropdownModal)
    const [buttonPosition, setButtonPosition] = useState(null);
    function handleClick(e) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition([(e.clientX), window.pageYOffset < 100 ? e.clientY : e.clientY + window.pageYOffset + 150  ]);
        setShowBoardDropdownModal(true)
    }

    // const setShowSignUpModal = props.setShowSignUpModal
    return (
        <>
            <div className="board-menu-button-wrapper">
                <button className='board-menu-opener' ref={buttonRef} onClick={handleClick}>Board</button>
                {showBoardDropdownModal && (
                <BoardModal buttonPosition={buttonPosition} onClose={() => setShowBoardDropdownModal(false)}>
                    <BoardDropDown
                        setShowBoardDropdownModal={setShowBoardDropdownModal}
                        pin={pin}
                    />
                </BoardModal>
            )}
                <div className='board-menu-save'>Save</div>
            </div>

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
