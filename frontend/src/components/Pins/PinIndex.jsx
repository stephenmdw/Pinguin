import { useEffect } from "react";
import { getPins, fetchPins } from "../../store/pinsReducer";
import { useSelector, useDispatch } from "react-redux";
import PinIndexItem from './PinIndexItem'
import './PinIndex.css'

export default function PinIndex() {
    const dispatch = useDispatch()
    const pins = useSelector(getPins)

    useEffect(() => {
        dispatch(fetchPins())
    }, [dispatch])

    return (
        <div className='pin-index-wrapper'>
        <div className='pin-index'>
            {pins.map((pin) => <PinIndexItem pin={pin} key={pin.id} userId={pin.userId}/>)}

        </div>
        </div>
    )
}