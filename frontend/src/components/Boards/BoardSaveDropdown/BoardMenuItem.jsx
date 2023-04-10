import { useDispatch } from "react-redux"
import { addPinToBoard } from "../../../store/pinBoardReducer"

export default function BoardMenuItem ({ pin, board}) {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addPinToBoard({pinId: pin.id, boardId: board.id}))
    }

    return (
        <div onClick={handleClick} style={{height: '50px', padding: '8px', width: '280px'}}>
            <div className='board-menu-item-preview'>

            </div>
            <div className='board-menu-item-label'>
                {board.title}
            </div>
        </div>
    )
}

//create pinboard route