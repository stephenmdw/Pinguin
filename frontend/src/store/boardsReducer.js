import csrfFetch from "./csrf"

export const RECEIVE_BOARD = '/boards/RECEIVE_BOARD'
export const RECEIVE_BOARDS = '/boards/RECEIVE_BOARDS'
export const REMOVE_BOARD = 'boards/REMOVE_BOARD'

const receiveBoards = (boards) => ({
    type: RECEIVE_BOARDS,
    boards
})

const receiveBoard = (board) => ({
    type: RECEIVE_BOARD,
    board
})

const removeBoard = (boardId) => ({
    type: REMOVE_BOARD,
    boardId
})

export const getBoards = (state) => {
    return state.boards ? Object.values(state.boards) : []
}

export const getBoard = (boardId) => (state) => {
    return state.boards ? state.boards[boardId] : null
}

export const fetchBoards = () => async dispatch => {
    let res = await csrfFetch(`/api/boards`)

    if (res.ok) {
        let boards = await res.json()
        dispatch(receiveBoards(boards))
    }
}

export const fetchBoard = (board) => async dispatch => {
    let res = await csrfFetch(`/api/boards/${board.id}`)

    if(res.ok) {
        let board = await res.json()
        dispatch(receiveBoard(board))
    }
}

export const createBoard = (board) => async dispatch => {
    let res = await csrfFetch(`/api/boards`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(board)
    })

    if(res.ok) {
        let board = await res.json()
        dispatch(receiveBoard(board))
    }
}

export const updateBoard = (board) => async dispatch => {
    let res = await csrfFetch(`/api/boards/${board.id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(board)
    })

    if (res.ok){
        let board = await res.json()
        dispatch(receiveBoard(board))
    }
}

export const deleteBoard = (boardId) => async dispatch => {
    let res = await csrfFetch(`/api/boards/${boardId}`,{
    method: 'DELETE'
    })

    if(res.ok) {
        dispatch(removeBoard(boardId))
    }
}

export default function boardsReducer(state={}, action) {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_BOARDS:
            return action.boards
        case RECEIVE_BOARD:
            let board = action.board
            newState[board.id] = board
            return newState
        case REMOVE_BOARD:
            delete newState[action.boardId]
            return newState;
        default:
            return state;
    }
}