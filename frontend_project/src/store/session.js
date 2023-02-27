import csrfFetch from "./csrf.js";

export const SET_CURRENT_USER = 'session/setCurrentUser'
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser'

const setCurrentUser = (user) => {
    return {
    type: SET_CURRENT_USER,
    payload: user
    };
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
};

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) {sessionStorage.setItem("X-CSRF-Token", csrfToken);}
}

const storeCurrentUser = user => {
    if (user) {sessionStorage.setItem("currentUser", JSON.stringify(user));}
    else {sessionStorage.removeItem("currentUser");}
}

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const login = ({ credential, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};
  

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};


const initialState = { 
    user: sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")) : null
};

export const signup = (user) => async (dispatch) => {
    const { username, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export default function sessionReducer(state=initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, user: action.payload}
        case REMOVE_CURRENT_USER:
            return {...state, user: null}
        default:
            return state;
    }
}