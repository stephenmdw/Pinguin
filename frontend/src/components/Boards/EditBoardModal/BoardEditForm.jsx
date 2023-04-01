import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { deleteBoard, updateBoard } from "../../../store/boardsReducer";

export default function BoardEditForm({ setShowBoardEditModal, board }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    let userId = sessionUser.id
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
        dispatch(deleteBoard(board.id)).then(setShowBoardEditModal(false))

    }
    //get preview photo to show over the image input area, while not displacing anything

    return (
        <div className='background-shade'>
            <form className="pin-edit-form">
                <div className='pin-edit-form-wrapper'>
                    <header className='edit-header'>Edit this Pin</header>
                    {/* <div className='submit-bar'>
                    <div className="dotdotdot">
                        <RemoveContent
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setAltText={setAltText}
                            setDestinationLink={setDestinationLink}
                        />
                    </div>

                </div> */}
                    <div className="pin-edit-area">
                        <div className='left-edit-input'>
                            <div className='edit-input-wrapper'>
                                <div className='label-edit-wrapper'>
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
                    </div>
                    <div className='save-and-delete-wrapper'>
                        <div>
                            <button className="delete-button" onClick={deleteCurrentBoard}>
                                Delete</button>
                        </div>
                        <div className='cancel-and-save'>
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