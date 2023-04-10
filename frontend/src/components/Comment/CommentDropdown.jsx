import './CommentDropdown.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { updateComment, deleteComment } from '../../store/commentsReducer';

export default function CommentDropdown({ comment }) {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false)
    const [commentText, setCommentText] = useState(comment.body)
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([])
    console.log('comment', comment)
    const closeEdit = () => {
        setShowEdit(false)
        setCommentText("")
    }

    const handleTextChange = (event) => {
        setCommentText(event.target.value);
        const textareaLineHeight = 24;
        const minRows = 1;
        const maxRows = 20;
        const previousRows = event.target.rows;
        event.target.rows = minRows;
        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        } else if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        } else {
            event.target.rows = currentRows;
        }
    };

    const handleUpdate = () => {
        let newComment = {
            commenterId: sessionUser.id,
            body: commentText,
            id: comment.id,
            pinId: comment.pinId
        }
        if (commentText.length === 0) {
            setErrors('Comment cannot be blank')
        } else {
            dispatch(updateComment(newComment))
            setShowEdit(false)
        }
    }

    useEffect(() => {
        if (showEdit) {
            setCommentText(comment.body);
        }
    }, [showEdit, comment.body]);

    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId))
    }

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
        <div className="comment-menu-button-wrapper" style={{ position: 'relative' }}>
            <button className='comment-menu-button' onClick={openMenu}><MoreHorizIcon style={{ height: '15px', width: '15px' }} /></button>
            {showMenu && (
                <div className="comment-dropdown-div">
                    <ul className="comment-dropdown">
                        <li className='comment-list-item' onClick={() => setShowEdit(true)}>Edit Comment</li>
                        <li className='comment-list-item' onClick={() => handleDelete(comment.id)}>Delete Comment</li>
                    </ul>
                </div>
            )}
            {showEdit && (
                <div style={{position: 'relative'}}>

                    <textarea
                        type="text"
                        className="edit-comment-input"
                        value={commentText}
                        onChange={(event) => handleTextChange(event)}
                    ></textarea>

                    {errors}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '16px', width: '350px', position: 'relative', left: '140px'}}>
                        <button
                            className='comment-cancel'
                            onClick={() => closeEdit()}>Cancel</button>
                        <button
                            className='comment-save'
                            onClick={() => handleUpdate()}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}
