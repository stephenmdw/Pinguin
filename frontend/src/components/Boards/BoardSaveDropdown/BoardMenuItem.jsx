import { useDispatch } from "react-redux"
import { addPinToBoard } from "../../../store/pinBoardReducer"

export default function BoardMenuItem ({ pin, board}) {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addPinToBoard({pinId: pin.id, boardId: board.id}))
    }

    return (
        <div onClick={handleClick} className='bmi-wrapper' style={{height: '50px', padding: '8px', width: '280px'}}>
            <div className='board-menu-item-preview'>
                <div className='board-save-thumbnail-placeholder'></div>
            </div>
            <div className='board-menu-item-label'>
                {board.title}
            </div>
        </div>
    )
}

//create pinboard route