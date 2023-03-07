import './PinIndex.css'
import placeHolderImg from '../../assets/index_placeholder.jpeg'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import PinEditModal from './PinEdit';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function PinIndexItem({ pin }) {
    let spacer = document.getElementsByClassName('random-spacer')
    let randHeight = Math.random()
    const {userId} = useParams()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    let img = placeHolderImg
    // spacer.style.setProperty('height', randHeight)
    function handleClick(e) {
        e.preventDefault()
        console.log(e.target.className)
        if(e.target.className === 'hover-overlay') {
            history.push(`/pin/${pin.id}`)
        }
    }
    //want the random-spacer div to give it a random height 

    return (
        <div className="random-spacer">
            <div className="pin-index-item">

                <div onClick={handleClick} className='index-item-image'
                        style={{
                        backgroundImage: `url(${pin.photoUrl})`,
                        // backgroundColor:'black',
                        borderRadius:'16px',
                        width:'100%',
                        height:'100%',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover'
                        }}>
                    <div className="hover-overlay">
                        <div className="save-button-">
                            
                        </div>
                        {sessionUser.id == pin.userId ? 
                        <div className='edit-button-modal-index'><PinEditModal
                        pin={pin}/></div>
                        : <></>}
                    </div>
                </div>
                {/* <h1>{pin.title}</h1>
                <p>{pin.description}</p>
                <p>{pin.altText}</p>
                <p>{pin.destinationLink}</p> */}

            </div>
        </div>
    )
}

// <img className="index-image" src={pin.photoUrl}></img>