import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { deleteBoard, updateBoard } from "../../../store/boardsReducer";

export default function BoardEditForm({ setShowBoardEditModal, board }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(board.title);
    const [description, setDescription] = useState(board.description);
    function handleSubmit(e) {
        e.preventDefault()
        let newBoard = { ...board, title, description }
        if (dispatch(updateBoard(newBoard))) {
            setShowBoardEditModal(false)
        }
    }

    function deleteCurrentBoard() {
        // dispatch(deleteBoard(board.id)).then(setShowBoardEditModal(false))
    }

    return (
        <div className='background-shade'>
            <form className="board-edit-form">
                <div className='board-edit-form-wrapper'>
                    <header className='board-edit-header'>Edit this Board</header>
                    <div className="board-edit-area">
                        <div className='board-edit-input-wrapper'>
                            <div className='board-label-edit-wrapper'>
                                <label>Title</label>
                            </div>
                            
                            <div className='single-line-edit-input-wrapper'>
                                <input
                                    type="text"
                                    placeholder="Add your title"
                                    value={title}
                                    className="single-line-edit-input"
                                    onChange={(e) => setTitle(e.target.value)}
                                    require='true'>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className='save-and-delete-wrapper'>
                        <div>
                            <button className="delete-button" onClick={deleteCurrentBoard}>
                                Delete</button>
                        </div>
                        <div className='board-cancel-and-save'>
                            <button className='cancel-button' onClick={() => setShowBoardEditModal(false)}>Cancel</button>
                            {/* <input className="save-input" type="submit" value="Save" /> */}
                            <button className='save-edit-button' onClick={(e) => handleSubmit(e)}>Save</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}