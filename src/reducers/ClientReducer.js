import {
  GET_CLIENTS,
  GET_CLIENT,
  FORM_ERROR,
  EMPTY_CLIENT
} from '../actions/ClientActions';

const INITIAL_STATE = {
  current: null,
  partners: [],
  errors: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLIENT:
      return {
        ...state,
        current: action.payload.data
      };
    case GET_CLIENTS:
      return {
        ...state,
        objects: action.payload.data.results
      };
    case FORM_ERROR:
      return {
        ...state,
        errors: action.payload.data
      };
    case EMPTY_CLIENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}
