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
        let pinboard = await res.json()
        dispatch(receivePinboard(pinboard))
    }
}

export const fetchPinBoard = (pinId, boardId) => async dispatch => {
    let res = await csrfFetch(`/api/pinboards?pin_id=${pinId}&board_id=${boardId}`);
  
    console.log(res);
  
    if (res.ok) {
      let pinboard = await res.json();
      dispatch(receivePinboard(pinboard));
    }
  };

export const addPinToBoard = (boardId, pinId) => async dispatch => {
    let res = await csrfFetch(`/api/pinboards/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(boardId, pinId)
    })

    if(res.ok){
        let pinboard = await res.json()
        dispatch(receivePinboard(pinboard))
    }
}

export const removePinFromBoard = (boardId,  pinId) => async dispatch => {
    const url = `/api/pinboards?board_id=${boardId}&pin_id=${pinId}`;
    let res = await csrfFetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'}
    });

    if(res.ok) {
        dispatch(removePinboard(boardId, pinId))
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