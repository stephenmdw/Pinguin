import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import { getBoards, fetchBoards } from '../../../store/boardsReducer';
import BoardMenuItem from './BoardMenuItem';
import './BoardDropdown.css'

export default function BoardDropDown({setShowBoardDropdownModal, pin}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams()
    const boards = useSelector(getBoards)
    const userBoards = boards.filter((board) => board.userId == sessionUser.id)

    useEffect(()=>{
        dispatch(fetchBoards())
    }, [dispatch])

    return (
        <div className="board-menu-wrapper">
                <div className="board-dropdown-wrapper">
                <div className='board-menu-header'>Save</div>
                    <ul className="board-dropdown">
                        {userBoards.map((board) => (<li className='boardmenuitem'> <BoardMenuItem setShowBoardDropdownModal={setShowBoardDropdownModal} pin={pin} board={board} /> </li>))}
                    </ul>
                </div>
        </div>
    );
}