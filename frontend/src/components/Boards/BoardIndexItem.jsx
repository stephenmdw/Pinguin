import { Link } from "react-router-dom"
export default function BoardIndexItem({board, user}) {
    
    return (
        <div>
            <Link to={`/users/${user.id}/boards/${board.id}`}>
                {board.title}
            </Link>
        </div>
    )
}