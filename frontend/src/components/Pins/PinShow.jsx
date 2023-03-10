import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPin, fetchPin } from '../../store/pinsReducer'
import { useEffect } from 'react'
import './PinShow.css'
import { getUser, fetchUser } from '../../store/usersReducer'

export default function PinShow() {
    const dispatch = useDispatch()
    const { pinId } = useParams()
    
    const pin = useSelector(getPin(pinId))

    const sessionUser = useSelector(state => state.session.user);
    let userId = sessionUser.id
    
    useEffect(() => {
        dispatch(fetchPin(pinId))
    }, [dispatch, pinId])

    if (!pin){
        return null
    }else{
        // let username = user.username
        // let initial = username.slice(0, 1)
    return (

        <div className='show-page' style={{paddingTop:'120px'}}>
            <div className='show-wrapper'>
                
                <div className='show-image-wrapper'>
                    <img className='show-image' src={ pin.photoUrl }></img>
                </div>
                <div className='show-info-wrapper'>
                    {/* <div className='show-pin-topbar'>
                        <div>{userId === pin.userId ? <h1>...</h1> : <></>}
                        </div>
                    </div> */}
                    <div className='show-info'>
                    <div className="show-pin-destination">
                        {pin.destinationLink}
                    </div>
                    <div style={{height: '50px'}}>
                        <h2 className='show-pin-title'>{pin.title}</h2>
                    </div>
                    <div className='show-pin-description'>
                        {pin.description}
                    </div>
                    {/* <div className='current-user-graphic'>
                        <div className='initial-graphic-pinform'>{initial}</div><p className="pin-form-current-user">{user.username}</p>
                    </div> */}
                    <div className='show-pin-altText'>
                        { pin.altText ? `Alt text: ${pin.altText}` : "" }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}