import csrfFetch from "./csrf"

const RECEIVE_PINBOARD = 'pinboards/RECEIVE_PINBOARD'
const REMOVE_PINBOARD = 'pinboards/RECEIVE_PINBOARD'

export const receivePinboard = (pinboard) => ({
    type: RECEIVE_PINBOARD,
    pinboard
})

export const removePinboard = (pinBoardId) => ({
    type: REMOVE_PINBOARD,
    pinBoardId
})

export const fetchPinBoards = (pinboardId) => async dispatch => {
    let res = await csrfFetch(`/api/pinboards/`)

    if(res.ok){
        let pinboard = res.json()
        dispatch(receivePinboard(pinboard))
    }
}

export const addPinToBoard = (boardId, pinId) => async dispatch => {
    let res = await csrfFetch(`/api/pinboards/`, {
        method: 'POST',
        haeders: {'Content-Type': 'application/json'},
        body: JSON.stringify(boardId, pinId)
    })

    if(res.ok){
        let pinboard = res.json()
        dispatch(receivePinboard(pinboard))
    }
}

export default function pinBoardReducer(state={}, action) {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_PINBOARD:
            return action.pinboard
        case REMOVE_PINBOARD:
            delete newState[action.pinboardId]
            return newState
        default:
            return state;
    }
}