import { useDispatch, useSelector } from 'react-redux'
import { getBoards, fetchBoards } from '../../store/boardsReducer';
import BoardIndexItem from '../Boards/BoardIndexItem';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function BoardIndex({user}) {
    const dispatch = useDispatch()
    const {userId} = useParams()
    // const sessionUser = useSelector(state => state.session.user);

    const boards = useSelector(getBoards)

    const userBoards = boards.filter((board) => board.userId == userId) 

    useEffect(() => {
        dispatch(fetchBoards())
    }, [dispatch])

    return (
        <div>
            {userBoards.map(board => <BoardIndexItem board={board} user={user}/>)}
        </div>
    )
}