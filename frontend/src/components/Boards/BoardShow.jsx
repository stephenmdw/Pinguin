import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoard, fetchBoard } from '../../store/boardsReducer'
import { fetchPins, getPins } from '../../store/pinsReducer'
import { useEffect } from 'react'
import './BoardShow.css'
import { useState } from 'react'
import PinIndexItem from '../Pins/PinIndexItem'
import { fetchUser, getUser } from '../../store/usersReducer';
import BoardDropDown from './BoardAdd/BoardDropDown'


export default function BoardShow() {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const { userId } = useParams()
    const user = useSelector(getUser(userId))

    const board = useSelector(getBoard(boardId))
    const pins = useSelector((state) => Object.values(state.pins))
    // const pins = state.pins
    // console.log('pins:', pins)
    // console.log('pin[0]:', pins[0].boardIds)

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])



    // const boardPins = pins.filter((pin) => pin.boardId === boardId)
    // console.log('boardPins:', boardPins) 
    // useEffect(() => {
    //     dispatch(fetchPins())
    // }, [dispatch])

    useEffect(() => {
        dispatch(fetchBoard(boardId))
    }, [dispatch, boardId])
    if (!board) {
        return null
    } else {

    if(user){
    }
    
    if (!user || !board || !pins){
        return null 
    } else {
        let initial = user.username.slice(0,1).toUpperCase()
        return (
            
            <div style={{ paddingTop: '80px' }}>
                <div className='boardpin-header-wrapper'>
                    <div className="boardpin-title">{board.title}</div>
                    <div className='user-board-icon'>{initial}</div>
                </div>
                <div className='boardpin-pincounter'>{pins.length} Pins</div>
                <div className='boardpin-index'>{pins.map((pin) => <PinIndexItem pin={pin} />)}</div>
            </div>
        )}
    }
}