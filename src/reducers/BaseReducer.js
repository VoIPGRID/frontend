import {
    LOGIN_USER,
    AUTH_FAILED,
    LOGOUT_USER,
    SET_CONTEXT,
    SEND_NOTIFICATION,
    HIDE_NOTIFICATION,
} from '../actions/BaseActions';

let initialAuth = {};

// Serve an empty object when JSDom sets up our virtual dom for test purposes.
if (typeof window !== 'undefined') {
    initialAuth = window.__STORE__
}

const INITIAL_STATE = {
    auth: initialAuth,
    context: {
        type: null,
        id: null,
    },
    notification: null,
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
        return INITIAL_STATE;
    case SET_CONTEXT:
        return {
            ...state,
            context: action.payload,
        }
    case SEND_NOTIFICATION:
        return {
            ...state,
            notification: {
                type: action.notificationType,
                content: action.content,
            },
        }
    case HIDE_NOTIFICATION:
        return {
            ...state,
            notification: null,
        }
    default:
        return state;
    }
}
