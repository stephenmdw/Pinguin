import { useDispatch } from "react-redux"
import { addPinToBoard } from "../../../store/pinBoardReducer"

export default function BoardMenuItem ({setShowBoardDropdownModal, pin, board}) {
    const dispatch = useDispatch()

    const handleClick = () => {
        setShowBoardDropdownModal(false)
        dispatch(addPinToBoard({pinId: pin.id, boardId: board.id}))
    }

    return (
        <div onClick={handleClick}>
            <div className='board-menu-item-preview'>

            </div>
            <div className='board-menu-item-label'>
                {board.title}
            </div>
        </div>
    )
}

//create pinboard route