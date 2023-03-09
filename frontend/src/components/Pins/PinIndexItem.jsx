import './PinIndex.css'
import placeHolderImg from '../../assets/index_placeholder.jpeg'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import PinEditModal from './PinEdit';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BoardDropdownModal from '../Boards/BoardAdd';
import React from 'react';

export default function PinIndexItem({ pin }) {
    let spacer = document.getElementsByClassName('random-spacer')
    let randHeight = Math.random()
    const { userId } = useParams()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const [isHovered, setIsHovered] = useState(false);

    // spacer.style.setProperty('height', randHeight)
    function handleClick(e) {
        e.preventDefault()
        if (e.target.className === 'index-image') {
            history.push(`/pin/${pin.id}`)
        }
    }    

    return (
        <div style={{paddingBottom:'16px'}}>
        <div className='pin-index-item-large' onClick={handleClick}  onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            {isHovered &&
                <div className="save-button">
                    <BoardDropdownModal pin={pin} />
                </div>}
              

            <img
                className='index-image'                    
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