import { useDispatch, useSelector } from 'react-redux'
import './UserShow.css'
import { useEffect } from 'react';
import BoardIndex from '../Boards/BoardIndex';
import { fetchUser } from '../../store/usersReducer';
import { useParams, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PinUserIndex from '../Pins/PinUserIndex';
import { getUser } from '../../store/usersReducer';

export default function UserShow() {
    const dispatch = useDispatch()

    // const sessionUser = useSelector(state => state.session.user);

    const { userId } = useParams()

    const user = useSelector(getUser(userId))
    console.log(user)
    
    const { boardType } = useParams()

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])

    console.log(boardType)
    function createdOrSaved() {
        if (boardType === 'created') {
            return (
                <PinUserIndex />
                )
        } else {
            return (
                <BoardIndex />
                )
        }
    }


    if (user) {
        let username = user.username
        let initial = username.slice(0, 1).toUpperCase()

        return (
            <div  style={{
                paddingTop: '80px'
            }}>
            
                <div className='user-info'>
                    <div className='user-icon'>
                        {initial}
                    </div>
                    <div className='big-username'> {username} </div>
                    <div className='small-username'> @{username} </div>
                </div>
                <div className='create-or-save'>
                    <Link to={`/users/${userId}/created`}>Created </Link>
                    <Link to={`/users/${userId}/saved`}>Saved</Link>
                </div>
                    {createdOrSaved()}
            </div>
        )
    } else {
        return (
            <h1> User not found! </h1>
        )
    }
}