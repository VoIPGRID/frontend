import {
    GET_USERS,
    CREATE_USER,
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    EMPTY_USER,
    FORM_ERROR,
} from '../actions/UserActions';

const INITIAL_STATE = {
    current: null,
    users: [],
    errors: null,
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case GET_USER:
        return { ...state,
            current: action.payload.data,
        };
    case GET_USERS:
        return { ...state,
            users: action.payload.data.results,
        };
    case FORM_ERROR:
        return {
            ...state,
            errors: action.payload.data,
        }
    case CREATE_USER:
        return { ...state };
    case UPDATE_USER:
        return { ...state }
    case DELETE_USER:
        return { ...state,
            objects: state.objects.filter(user =>
                user.id !== action.payload.id
            ),
        }
    case EMPTY_USER:
        return { ...state,
            current: null,
        }
    default:
        return state;
    }
}
