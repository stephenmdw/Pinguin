import { Link } from "react-router-dom"
export default function BoardIndexItem({board, user}) {
    
    return (
        <div className='board-index-item-div'>
            <Link className='board-index-item' to={`/users/${user.id}/boards/${board.id}`}>
                {board.title}
            </Link>
        </div>
    )
}