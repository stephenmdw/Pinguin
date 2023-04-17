import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { addPinToBoard, removePinFromBoard } from "../../../store/pinBoardReducer"
import { fetchPinBoard } from "../../../store/pinBoardReducer"

export default function BoardMenuItem ({ pin, board}) {
    const dispatch = useDispatch()

    let pins = board.pins ? Object.values(board.pins) : []

    const pinUrl = pins[0] ? pins[0].photoUrl : ''
    const [saved, setSaved] = useState(false)

    const handleClick = () => {
        if(saved){
            dispatch(removePinFromBoard(pin.id, board.id))
            setSaved(false)
        } else {
            dispatch(addPinToBoard({pinId: pin.id, boardId: board.id}))
            setSaved(true)
        }
    }

    // useEffect(() => {
    //     dispatch(fetchPinBoard(pin.id, board.id))
    // }, [dispatch])

    return (
        <div onClick={handleClick} className='bmi-wrapper' style={{height: '50px', padding: '8px', width: '280px', display: 'flex'}}>
            <div className='board-menu-item-preview' style={{flex: '1'}}>
            <div style={{
                height:'50px',
                width: '50px',
                backgroundImage: `url(${pinUrl})`,
                borderRadius: '10px',
                backgroundSize:'cover',
                backgroundColor:'#EEEEEE'
            }} />                {/* <div className='board-save-thumbnail-placeholder'></div> */}
            </div>
            <div className='board-menu-item-label' style={{flex:'3'}}>
                {board.title}
            </div>
            <div style={{flex: '0.5'}} className={saved ? 'board-menu-saved' : 'board-menu-save'}> {saved ? 'Saved' : 'Save'} </div>
        </div>
    )
}

//create pinboard route