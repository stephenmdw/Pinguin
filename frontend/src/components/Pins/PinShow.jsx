import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useHistory } from 'react-router-dom'
import { getPin, fetchPin } from '../../store/pinsReducer'
import { useEffect } from 'react'
import './PinShow.css'
import { getUser, fetchUser } from '../../store/usersReducer'
import backButton from '../../assets/back-button.png'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function PinShow() {
    const dispatch = useDispatch()
    const { pinId } = useParams()
    const history = useHistory()
    const pin = useSelector(getPin(pinId))

    useEffect(() => {
        dispatch(fetchPin(pinId))
    }, [dispatch, pinId])

    if (!pin) {
        return null
    } else {
        let username = pin.username
        return (

            <div className='show-page' style={{ paddingTop: '100px' }}>

                <KeyboardBackspaceIcon className='back-icon' onClick={() => history.push('/feed')} style={{ height: '40px', width: '40px', fontSize: '30', marginLeft: '20px', marginRight: '200px', cursor: 'pointer' }} />

                <div className='show-wrapper'>

                    <div className='show-image-wrapper'>
                        <img className='show-image' src={pin.photoUrl}></img>
                    </div>
                    <div className='show-info-wrapper'>
                        {/* <div className='show-pin-topbar'>
                        <div>{userId === pin.userId ? <h1>...</h1> : <></>}
                        </div> */}
                        {/* </div> */}
                        <div className='show-info'>
                            <div className="show-pin-destination">
                                {pin.destinationLink}
                            </div>
                            <div style={{ height: '50px' }}>
                                <h2 className='show-pin-title'>{pin.title}</h2>
                            </div>
                            <div className='current-user-graphic pin-show-graphic-user'>
                                <div className='initial-graphic-pinform initial-pin-show'>{username ? username.slice(0, 1) : ""}</div>
                                <p className="pin-form-current-user">
                                    <Link to={`/users/${pin.userId}`} style={{ textDecoration: 'none', color: 'black' }}> {username} </Link>
                                </p>
                            </div>
                            <div className='show-pin-description'>
                                {pin.description}
                            </div>

                            <div className='show-pin-altText'>
                                {pin.altText ? `Alt text: ${pin.altText}` : ""}
                            </div>
                            <div className="comment-container" style={{width:'100%', height:'auto', padding:'24px 32px'}}>
                                <div style={{ position: 'absolute' }}>

                                    <input style={{ width: '100%'}}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}