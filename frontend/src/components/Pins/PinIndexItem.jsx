import './PinIndex.css'
import placeHolderImg from '../../assets/index_placeholder.jpeg'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import PinEditModal from './PinEdit';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import BoardDropdown from '../Boards/BoardSaveDropdown/boardDropdown';

export default function PinIndexItem({ pin }) {
    let spacer = document.getElementsByClassName('random-spacer')
    let randHeight = Math.random()
    const { userId } = useParams()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const [isSaved, setIsSaved] = useState(false)
    const [isHovered, setIsHovered] = useState(false);  
    // spacer.style.setProperty('height', randHeight)
    function handleClick(e) {
        e.preventDefault()
        if (e.target.className === 'index-image-dark') {
            history.push(`/pin/${pin.id}`)
        }
    }    

    return (
            <div className='pin-index-item-wrapper' style={{paddingBottom:'16px'}}>
            <div className='pin-index-item-large' onClick={handleClick}  onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
                {isHovered &&
                    <div className="save-button" >
                        <BoardDropdown pin={pin} isSaved={isSaved} setIsSaved={setIsSaved}/>    
                    </div>}
                

                <img
                    className={isHovered ? 'index-image-dark' : 'index-image'}                    
                    src={pin.photoUrl}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        width: '100%',
                        height: 'auto',
                        maxHeight: '420px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        // position: 'absolute'
                    }}>
                </img>

                {sessionUser.id == pin.userId ?
                        isHovered && 
                            <div className='edit-button-modal-index'>
                                <PinEditModal pin={pin} />
                            </div> 
                        : <></>}

                {/* </div> */}
                {/* <h1>{pin.title}</h1>
                        <p>{pin.description}</p>
                        <p>{pin.altText}</p>
                        <p>{pin.destinationLink}</p> */}
            </div>
            </div>
    )
}

// <img className="index-image" src={pin.photoUrl}></img>