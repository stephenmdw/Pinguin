import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useHistory } from 'react-router-dom'
import { getPin, fetchPin } from '../../store/pinsReducer'
import { useEffect, useState, useRef } from 'react'
import './PinShow.css'
import { getUser, fetchUser } from '../../store/usersReducer'
import backButton from '../../assets/back-button.png'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { fetchComments, createComment, deleteComment, getComments } from '../../store/commentsReducer'
import SendIcon from '@mui/icons-material/Send';
import CommentDropdown from '../Comment/CommentDropdown'

export default function PinShow() {
    const dispatch = useDispatch()
    const { pinId } = useParams()
    const history = useHistory()
    const pin = useSelector(getPin(pinId))
    const [body, setBody] = useState("")
    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(getComments)
    const [showCommentDropdown, setShowCommentDropdown] = useState(false)

    const handleComment = () => {
        let comment = {
            body: body,
            pinId: pinId,
            commenterId: sessionUser.id
        }
        dispatch(createComment(comment))
        setBody('')
    }

    useEffect(() => {
        dispatch(fetchPin(pinId))
    }, [dispatch, pinId])

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    if (!pin) {
        return null
    } else {
        let username = pin.username
        let filteredComments = comments.filter((comment) => comment.pinId == pinId)
        console.log(filteredComments)

        return (

            <div className='show-page' style={{ paddingTop: '100px' }}>
                <div style={{ maxWidth: '40%' }}>
                    <KeyboardBackspaceIcon className='back-icon' onClick={() => history.push('/feed')} style={{ height: '40px', width: '40px', fontSize: '30', marginLeft: '20px', marginRight: '200px', cursor: 'pointer' }} />
                </div>
                <div className='show-wrapper'>


                    <img className='show-image' src={pin.photoUrl}></img>

                    <div className='show-info-wrapper'>
                        {/* <div className='show-pin-topbar'>
                        <div>{userId === pin.userId ? <h1>...</h1> : <></>}
                        </div> */}
                        {/* </div> */}

                        <div className='show-topbar' style={{ position: 'fixed' }}></div>
                        <div className='show-info'>
                            <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', alignContent:'space-between'}}>
                                <div className="show-pin-destination">
                                    {pin.destinationLink}
                                </div>
                                <div style={{ height: '50px' }}>
                                    <h2 className='show-pin-title'>{pin.title}</h2>
                                </div>
                                <div className='current-user-graphic pin-show-graphic-user'>
                                    <div className='initial-graphic-pinform initial-pin-show'>{username ? username.slice(0, 1).toUpperCase() : ""}</div>
                                    <p className="pin-form-current-user">
                                        <Link to={`/users/${pin.userId}`} style={{ textDecoration: 'none', color: 'black' }}> {username} </Link>
                                    </p>
                                </div>
                                <div className='show-pin-description'>
                                    {pin.description}
                                </div>
                                {pin.altText ?
                                    <div className='show-pin-altText'>
                                        Alt text: {pin.altText}
                                    </div> : ""}
                                <div className='comment-container'>
                                    <div className='comments-header'>Comments</div>
                                    {filteredComments.length === 0 ? <div>

                                    </div > :
                                        filteredComments.map(comment =>
                                            <div className='comment-card'>
                                                <div className='comment-initial'>{comment.user.username.slice(0, 1).toUpperCase()}</div>
                                                <div style={{ paddingLeft: '5px', width: '80%', fontSize: '16px' }}>
                                                    <div style={{ fontWeight: '600' }}><Link to={`/users/${comment.commenterId}`} style={{ textDecoration: 'none' }}>{comment.user.username}</Link></div> {" "}
                                                    {comment.body}
                                                    {sessionUser.id === comment.commenterId ? <div><CommentDropdown comment={comment}/></div> : <div></div>}
                                                </div>
                                            </div>)}
                                </div>
                            </div>
                            <div className="comment-post-container" style={{ height: 'auto',}}>  
                                <div>
                                <input
                                    onChange={(e) => setBody(e.target.value)}
                                    value={body}
                                    className='comment-input'
                                    placeholder='Add a comment'
                                    style={{
                                        position: 'relative',
                                        bottom: '-23px',
                                        width: '100%',  
                                        height: '50px',
                                        borderRadius: '25px',
                                        backgroundColor: '#EEEEEE',
                                        color: 'gray',
                                        borderStyle: 'none',
                                        position: 'relative',
                                        paddingLeft:'10px'
                                    }}></input>
                                    </div>
                                {body.length > 0 ? <button onClick={handleComment} className='create-comment-button'><SendIcon style={{color: 'white'}}/></button> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}