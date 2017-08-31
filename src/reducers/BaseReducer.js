import { LOGIN_USER, AUTH_FAILED, LOGOUT_USER, SET_CONTEXT } from '../actions/BaseActions'

let initialAuth = {};

// Serve an empty object when JSDom sets up our virtual dom for test purposes.
if (typeof window !== 'undefined') {
    initialAuth = window.__STORE__.user
}

const INITIAL_STATE = {
    auth: initialAuth,
    context: {
        type: null,
        id: null,
    },
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case LOGIN_USER:
        return { ...state,
            auth: action.payload.data,
        };
    case AUTH_FAILED:
    case LOGOUT_USER:
        window.__STORE__.user.authenticated = false;
        return state;
    case SET_CONTEXT:
        return {
            ...state,
            context: action.payload,
        }
    default:
        return state;
    }
}
