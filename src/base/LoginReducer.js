import { LOGIN_USER } from './LoginActions'

const INITIAL_STATE = {
    logged_in_data: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state,
                logged_in_data: action.payload.data
            };
        default:
            return state;
    }
}
