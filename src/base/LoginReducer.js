import { LOGIN_USER, AUTH_FAILED, LOGOUT_USER } from './LoginActions'

const INITIAL_STATE = {
    'auth': window.__INITIAL_STATE__
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state,
                auth: action.payload.data
            };
        case AUTH_FAILED:
        case LOGOUT_USER:
            window.__INITIAL_STATE__.authenticated = false;
            return state;
        default:
            return state;
    }
}
