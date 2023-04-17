import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getBoards, fetchBoards } from "../../../store/boardsReducer";
import BoardMenuItem from "./BoardMenuItem";
import './BoardDropdown.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchPinBoards, addPinToBoard, removePinFromBoard } from "../../../store/pinBoardReducer";


function BoardDropdown({ pin, isSaved, setIsSaved }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const boards = useSelector(getBoards)
    const userBoards = boards.filter((board) => board.userId == sessionUser.id)
    const [saved, setSaved] = useState(false)
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const defaultSave = (pinId) => {
        if(isSaved){
            dispatch(removePinFromBoard(pin.id, boards[0].id))
            setIsSaved(false)
        } else {
            dispatch(addPinToBoard({pinId: pinId, boardId: boards[0].id }))
            setIsSaved(true)
        }
    }

    useEffect(() => {
        dispatch(fetchBoards())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (event) => {
            const dropdown = document.querySelector(".board-dropdown-wrapper-div");
            if (!dropdown.contains(event.target)) {
                setShowMenu(false);
            }
        };
    
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="board-menu-button-wrapper">
            <button className="board-menu-opener" onClick={openMenu}>Board <ExpandMoreIcon/></button>
            <div className={isSaved ? 'board-menu-saved' : 'board-menu-save'} onClick={()=>defaultSave(pin.id)}>{isSaved ? "Saved" : "Save"}</div>
            {showMenu && (
                    <div className="board-dropdown-wrapper-div">
                        <div className='board-menu-header'>Save</div>
                        <ul className="board-dropdown">
                            {userBoards.map((board) => (<li className='boardmenuitem'> 
                            <BoardMenuItem pin={pin} board={board} saved={saved} setSaved={setSaved}/> 
                            </li>))}
                        </ul>
                    </div>
            )}
        </div>
    );
}

export default BoardDropdown;