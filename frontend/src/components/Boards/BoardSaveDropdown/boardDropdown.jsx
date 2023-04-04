import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getBoards, fetchBoards } from "../../../store/boardsReducer";
import BoardMenuItem from "./BoardMenuItem";
import './BoardDropdown.css'
function BoardDropdown({ pin }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const boards = useSelector(getBoards)
    const userBoards = boards.filter((board) => board.userId == sessionUser.id)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        dispatch(fetchBoards())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="board-menu-button-wrapper">
            <button className="board-menu-opener" onClick={openMenu}>Board</button>
            <div className='board-menu-save'>Save</div>
            {showMenu && (
                    <div className="board-dropdown-wrapper-div">
                        <ul className="board-dropdown">
                        <div className='board-menu-header'>Save</div>

                            {userBoards.map((board) => (<li className='boardmenuitem'> <BoardMenuItem pin={pin} board={board} /> </li>))}
                        </ul>
                    </div>
            )}
        </div>
    );
}

export default BoardDropdown;