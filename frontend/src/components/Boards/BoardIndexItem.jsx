import { Link } from "react-router-dom"
export default function BoardIndexItem({board, user}) {
    
    return (
            <Link className='board-index-item' to={`/users/${user.id}/boards/${board.id}`}>
        <div className='board-index-item-div'>
                <div className='board-placeholder'></div>
                {board.title}
        </div>
            </Link>
    )
}