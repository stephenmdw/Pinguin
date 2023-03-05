import './PinIndex.css'
import placeHolderImg from '../../assets/index_placeholder.jpeg'
import { Link } from 'react-router-dom'

export default function PinIndexItem({ pin }) {
    let spacer = document.getElementsByClassName('random-spacer')
    let randHeight = Math.random()
    let img = placeHolderImg
    // spacer.style.setProperty('height', randHeight)

    //want the random-spacer div to give it a random height 

    return (
        <div className="random-spacer">
            <div className="pin-index-item">

                <Link to={`/pin/${pin.id}`}>
                    <img className="index-image" src={pin.photoUrl}></img>
                </Link>
                {/* <h1>{pin.title}</h1>
                <p>{pin.description}</p>
                <p>{pin.altText}</p>
                <p>{pin.destinationLink}</p> */}

            </div>
        </div>
    )
}