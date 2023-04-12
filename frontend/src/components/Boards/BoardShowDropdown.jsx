import BoardEditModal from './EditBoardModal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../../store/boardsReducer';
import { useHistory } from 'react-router-dom';


export default function BoardShowDropdown({ board }) {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }; 

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="dotdotdot" onClick={openMenu}></div>
            {showMenu && (
                <div className="boardshow-dropdown-wrapper">
                    <ul className="profile-dropdown">
                        <li className="remove-content-button" onClick={() => dispatch(deleteBoard(board.id)).then(history.push(`/users/${board.userId}`))}>
                            Delete Board
                        </li>
                    </ul>
                </div>
            )}

            <BoardEditModal board={board}/>
        </div>
    );
}