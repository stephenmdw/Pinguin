import csrfFetch from "./csrf"

const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
const RECEIVE_PIN_COMMENTS = 'comments/RECEIVE_PIN_COMMENTS'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})

export const removeComment = (commentId) => ({
    type: REMOVE_COMMENT, 
    commentId
})

export const getComments = (state) => {
    return state.comments ? Object.values(state.comments): []
}

// export const getPinComments = (pin) = state => {

// }

export const fetchComments = () => async dispatch => {
    let res = await csrfFetch(`/api/comments`)

    if (res.ok) {
        let comments = await res.json()
        dispatch(receiveComments(comments))
    }
}


export const createComment = (comment) => async dispatch => {
    let res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        let newComment = await res.json()
        dispatch(receiveComment(newComment))
    }
}

export const updateComment = (comment) => async dispatch => {
    let res = await csrfFetch(`/api/comments/${comment.id}`,{
        method: "PATCH", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })

    if(res.ok) {
        let updatedComment = await res.json()
        dispatch(receiveComment(updatedComment))
    }
}

export const deleteComment = commentId => async dispatch => {
    let res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(removeComment(commentId))
    }
}

export default function commentsReducer(state={}, action) {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_COMMENTS: 
            return {...state, ...action.comments}
        case RECEIVE_COMMENT:
            let comment = action.comment
            newState[comment.id] = comment
            return newState
        case REMOVE_COMMENT:
            delete newState[action.commentId]
            return newState
        default:
            return state;
    }
}
