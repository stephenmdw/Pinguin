import csrfFetch from "./csrf"

const RECEIVE_PIN = 'pins/RECEIVE_PIN' //show, create, update
const RECEIVE_PINS = 'pins/RECEIVE_PINS' //index
const REMOVE_PIN = 'pins/REMOVE_PIN' //destroy

export const receivePins = (pins) => ({
    type: RECEIVE_PINS,
    pins
})

export const receivePin = (payload) => ({
    type: RECEIVE_PIN,
    payload
})

export const removePin = (pinId) => ({
    type: REMOVE_PIN,
    pinId
})

//selectors
export const getPin = (pinId) => (state) => {
    console.log(state)
    return state.pins ? state.pins[pinId] : null
}

export const getPins = (state) => {
    return state.pins ? Object.values(state.pins) : []
}
//not sure how i want this formatted yet

//THUNKS

export const fetchPins = () => async dispatch => {
    let res = await csrfFetch('/api/pins')

    if (res.ok) {
        let pins = await res.json()
        dispatch(receivePins(pins))
    }
}
export const fetchPin = (pinId) => async dispatch =>{
    let res = await csrfFetch(`/api/pins/${pinId}`)

    if (res.ok) {
        let pin = await res.json()
        dispatch(receivePin(pin))
    }
}

export const createPin = pin => async dispatch => {
    let res = await csrfFetch('/api/pins', {
        method: "POST",
        // headers: {'Content-Type': 'application/json'},
        body: pin
    })

    if(res.ok) {
        let newPin = await res.json()
        dispatch(receivePin(newPin))
    }
}

export const updatePin = pin => async dispatch => {
    let res = await csrfFetch(`/api/pins/${pin.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pin)
    })

    if(res.ok) {
        let newPin = await res.json()
        dispatch(receivePin(newPin))
    }
}

export const deletePin = pinId => async dispatch => {
    let res = await csrfFetch(`/api/pins/${pinId}`, {
        method: "DELETE"
    })

    if(res.ok) {
        dispatch(removePin(pinId))
    }
}

export default function pinsReducer(state={}, action) {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_PINS: 
            return action.pins;
        case RECEIVE_PIN:
            // debugger
            let pin = action.payload.pin
               newState[pin.id] = pin
            return newState
        case REMOVE_PIN:
            delete newState[action.pinId]
            return newState
        default:
            return state;
    }
}
