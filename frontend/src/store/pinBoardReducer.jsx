import csrfFetch from "./csrf"

const RECEIVE_PINBOARDS = 'pinboards/RECEIVE_PINBOARDS'
const RECEIVE_PINBOARD = 'pinboards/RECEIVE_PINBOARD'
const REMOVE_PINBOARD = 'pinboards/REMOVE_PINBOARD'

export const receivePinboards = pinboards => ({
    type: RECEIVE_PINBOARDS,
    pinboards
})

export const receivePinboard = (pinboard) => ({
    type: RECEIVE_PINBOARD,
    pinboard
})

export const removePinboard = (boardId, pinId) => ({
    type: REMOVE_PINBOARD,
    boardId,
    pinId
})

export const getPinboards = (state) => {
    return state.pinBoard ? Object.values(state.pinBoard) : []
}

export const fetchPinBoards = () => async dispatch => {
    let res = await csrfFetch(`/api/pinboards/`, {
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        let pinboards = await res.json()
        dispatch(receivePinboards(pinboards))
    }
}

export const fetchPinBoard = (pinId, boardId) => async dispatch => {
    let res = await csrfFetch(`/api/pinboards?pin_id=${pinId}&board_id=${boardId}`);

    if (res.ok) {
        let pinboard = await res.json();
        dispatch(receivePinboard(pinboard));
    }
};

export const addPinToBoard = (boardId, pinId) => async dispatch => {
    let res = await csrfFetch(`/api/pinboards/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({pinboard: {board_id: boardId, pin_id: pinId}})
    })

    if (res.ok) {
        let pinboard = await res.json()
        dispatch(receivePinboard(pinboard))
    }
}

export const removePinFromBoard = (boardId, pinId) => async dispatch => {
    const url = `/api/pinboards?board_id=${boardId}&pin_id=${pinId}`;
    let res = await csrfFetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        dispatch(removePinboard(boardId, pinId))
    }
}

export default function pinBoardReducer(state = {}, action) {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_PINBOARDS:
            return { ...state, ...action.pinboards }
        case RECEIVE_PINBOARD:
            return action.pinboard
        case REMOVE_PINBOARD:
            const newPinboards = { ...newState };
            delete newPinboards[`${action.boardId}-${action.pinId}`];
            return newPinboards;
        default:
            return state;
    }
}