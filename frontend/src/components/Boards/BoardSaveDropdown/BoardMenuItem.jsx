import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { addPinToBoard, removePinFromBoard } from "../../../store/pinBoardReducer"
import { getPinboards, fetchPinBoards } from "../../../store/pinBoardReducer"

export default function BoardMenuItem({ pin, board }) {
    const dispatch = useDispatch()
    let pins = board.pins ? Object.values(board.pins) : []
    const pinUrl = pins[0] ? pins[0].photoUrl : ''
    const [saved, setSaved] = useState(false)
    const pinboards = useSelector(getPinboards)

    console.log(pinboards)

    const checkAssociationExists = () => {
        for (let i = 0; i < pinboards.length; i++) {
            if (pinboards[i].pinId === pin.id && pinboards[i].boardId === board.id) {
                return true;
            }
        }
        return false;
    };
    
    useEffect(() => {
        dispatch(fetchPinBoards());
        const isSaved = checkAssociationExists();
        setSaved(isSaved);
    }, [pin.id, board.id, dispatch]);



    const handleClick = async () => {
        if (saved) {
            try {
                // setSaved(false);
                await dispatch(removePinFromBoard(board.id, pin.id)).then(() => {
                    setSaved(false)
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(addPinToBoard(board.id, pin.id));
            setSaved(true);
        }
    };

    // useEffect(() => {
    //     dispatch(fetchPinBoard(pin.id, board.id))
    // }, [dispatch])

    return (
        <div onClick={handleClick} className='bmi-wrapper' style={{ height: '50px', padding: '8px', width: '280px', display: 'flex' }}>
            <div className='board-menu-item-preview' style={{ flex: '1' }}>
                <div style={{
                    height: '50px',
                    width: '50px',
                    backgroundImage: `url(${pinUrl})`,
                    borderRadius: '10px',
                    backgroundSize: 'cover',
                    backgroundColor: '#EEEEEE'
                }} />                {/* <div className='board-save-thumbnail-placeholder'></div> */}
            </div>
            <div className='board-menu-item-label' style={{ flex: '3' }}>
                {board.title}
            </div>
            <div style={{ flex: '0.5' }} className={saved ? 'board-menu-saved' : 'board-menu-save'}> {saved ? 'Saved' : 'Save'} </div>
        </div>
    )
}