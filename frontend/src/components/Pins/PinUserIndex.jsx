import { useDispatch, useSelector } from 'react-redux'
import { getPins,fetchPins } from '../../store/pinsReducer';
import PinIndexItem from './PinIndexItem';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function PinUserIndex() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const {userId} = useParams() 
    const pins = useSelector(getPins)
    const userPins = pins.filter((pin) => pin.userId == userId) 
    //the light equality might cause some problems later

    useEffect(() => {
        dispatch(fetchPins())
    }, [dispatch])

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection:'column'}}>
        <div className='pin-index'>
            {userPins.map(pin => <PinIndexItem pin={pin}/>)}
        </div>
        </div>
    )
}