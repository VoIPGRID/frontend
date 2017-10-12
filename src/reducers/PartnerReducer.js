import {
  GET_PARTNERS,
  CREATE_PARTNER,
  GET_PARTNER,
  UPDATE_PARTNER,
  DELETE_PARTNER,
  EMPTY_PARTNER,
  UPDATE_BRANDING,
  FORM_ERROR
} from '../actions/PartnerActions';

const INITIAL_STATE = {
  current: null,
  partners: [],
  errors: null,
  branding: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PARTNER:
      return {
        ...state,
        current: action.payload.data
      };
    case GET_PARTNERS:
      return {
        ...state,
        partners: action.payload.data.results
      };
    case FORM_ERROR:
      return {
        ...state,
        errors: action.payload.data
      };
    case CREATE_PARTNER:
      return { ...state };
    case UPDATE_PARTNER:
      return {
        ...state,
        partners: state.partners.map(partner => {
          if (partner.id === action.payload.data.id) {
            partner = action.payload.data;
          }

          return partner;
        }),
        branding: {
          primary: action.payload.data.brand,
          secondary: action.payload.data.text
        }
      };
    case DELETE_PARTNER:
      return {
        ...state,
        partners: state.partners.filter(
          partner => partner.id !== action.payload.id
        )
      };
    case EMPTY_PARTNER:
      return {
        ...state,
        current: null
      };
    case UPDATE_BRANDING:
      return {
        ...state,
        branding: {
          primary: action.payload,
          secondary: action.payload
        }
      };
    default:
      return state;
  }
}
