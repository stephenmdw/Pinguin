import { useDispatch, useSelector } from 'react-redux'
import './UserShow.css'
import { getBoards, fetchBoards } from '../../store/boardsReducer';
import { useEffect } from 'react';
import BoardIndexItem from '../Boards/BoardIndexItem';

export default function UserShow(){
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);
    const boards = useSelector(getBoards)
    console.log(boards)
    const userBoards = boards.filter((board) => board.userId === sessionUser.id) 
    console.log(userBoards)
    useEffect(() => {
        dispatch(fetchBoards())
    }, [dispatch])

    console.log(userBoards)

    if(sessionUser){
        let username = sessionUser.username
        let initial = username.slice(0, 1)

        return (
            <div>
                <div className='user-info'>
                    <div className='user-icon'>
                        {initial}
                    </div>
                    <div className='big-username'> {username} </div>
                    <div className= 'small-username'> @{username} </div>
                </div>
                <div>
                    <div></div>
                    {userBoards.map(board => <BoardIndexItem board={board}/>)}
                </div>
            </div>
        )
    }
}