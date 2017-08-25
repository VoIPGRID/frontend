import { GET_VOIPACCOUNTS, GET_VOIPACCOUNT, EMPTY_VOIPACCOUNT, FORM_ERROR } from './VoipAccountsActions'

const INITIAL_STATE = {
    current: null,
    accounts: [],
    errors: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_VOIPACCOUNT:
            return { ...state,
                current: action.payload.data
            };
        case GET_VOIPACCOUNTS:
            return { ...state,
                accounts: action.payload.data.results
            };
        case FORM_ERROR:
            return {
                ...state,
                errors: action.payload.data
            }
        case EMPTY_VOIPACCOUNT:
            return { ...state,
                current: null,
            }
        default:
            return state;
    }
}
