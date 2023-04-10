import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getBoards, fetchBoards } from "../../../store/boardsReducer";
import BoardMenuItem from "./BoardMenuItem";
import './BoardDropdown.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addPinToBoard } from "../../../store/pinBoardReducer";

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

    const defaultSave = (pinId) => {
        dispatch(addPinToBoard({pinId: pinId, boardId: 1}))
    }

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
            <button className="board-menu-opener" onClick={openMenu}>Board <ExpandMoreIcon/></button>
            <div className='board-menu-save' onClick={()=>defaultSave(pin.id)}>Save</div>
            {showMenu && (
                    <div className="board-dropdown-wrapper-div">
                        <div className='board-menu-header'>Save</div>
                        <ul className="board-dropdown">
                            {userBoards.map((board) => (<li className='boardmenuitem'> <BoardMenuItem pin={pin} board={board} /> </li>))}
                        </ul>
                    </div>
            )}
        </div>
    );
}

export default BoardDropdown;