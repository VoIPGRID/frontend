import { LOGIN_USER, AUTH_FAILED, LOGOUT_USER, SET_CONTEXT } from './BaseActions'

const INITIAL_STATE = {
    'auth': window.__STORE__.user,
    'context': {
        type: null,
        id: null,
    }
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state,
                auth: action.payload.data
            };
        case AUTH_FAILED:
        case LOGOUT_USER:
            window.__STORE__.user.authenticated = false;
            return state;
        case SET_CONTEXT:
            return {
                ...state,
                context: action.payload
            }
        default:
            return state;
    }
}
