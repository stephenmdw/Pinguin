import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPin, fetchPin } from '../../store/pinsReducer'
import { useEffect } from 'react'
import './PinShow.css'

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
    return (
        <div className='show-page' style={{paddingTop:'90px'}}>
            <div className='show-wrapper'>
                
                <div className='show-image-wrapper'>
                    <img className='show-image' src={ pin.photoUrl }></img>
                </div>
                <div className='show-info-wrapper'>
                    <div className='show-pin-topbar'>
                        <div>{userId === pin.userId ? <h1>...</h1> : <></>}
                        </div>
                        <div>
                            <button className='show-save'>Save</button>
                        </div>
                    </div>
                    <div>
                        {pin.destinationLink}
                    </div>
                    <div style={{height: '50px'}}>
                        <h2 className='show-pin-title'>{pin.title}</h2>
                    </div>
                    <div>
                        {pin.description}
                    </div>
                    <div>
                        {pin.altText}
                    </div>
                </div>
            </div>
        </div>
    )
    }
}