import { getBoard, fetchBoard } from '../../../store/boardsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function BoardThumbnail({ boardId }) {
    const dispatch = useDispatch()
    const board = useSelector(getBoard(boardId))

    //this doesn't work bc the state stays the same

    let pins = board.pins ? Object.values(board.pins) : []

    let pin1 = pins[0] ? pins[0].photoUrl : ''
    let pin2 = pins[1] ? pins[1].photoUrl : ''
    let pin3 = pins[2] ? pins[2].photoUrl : ''
    let pin4 = pins[3] ? pins[3].photoUrl : ''
    let pin5 = pins[5] ? pins[5].photoUrl : ''

    useEffect(() => {
        dispatch(fetchBoard(boardId))
    }, [dispatch, boardId])


    return (
        <div style={{ height: '157px', width: '234px', borderRadius: '10px', display: 'flex' }}>
            <div style={{ flex: '2', 
                backgroundImage: `url(${pin1})`,
                borderTopLeftRadius:  '10px',
                borderBottomLeftRadius: '10px',
                backgroundSize:'cover',
                border: '0.5px solid white',
                backgroundColor:'#EEEEEE'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <div style={{ flex: '1', 
                    backgroundImage: `url(${pin2})`,
                    borderTopRightRadius:'10px',
                    backgroundSize:'cover',
                    border: '0.5px solid white',
                    backgroundColor:'#EEEEEE'
                }} />
                <div style={{ flex: '1', 
                    backgroundImage: `url(${pin3})`,
                    backgroundSize:'cover',
                    borderBottomRightRadius:'10px',
                    border: '0.5px solid white',
                    backgroundColor:'#EEEEEE'
                    }} />
            </div>
        </div>
    )
}