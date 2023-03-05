import { Link } from "react-router-dom"
export default function BoardIndexItem({board}) {
    
    return (
        <div>
            <Link to='/'>
                {board.title}
            </Link>
        </div>
    )
}