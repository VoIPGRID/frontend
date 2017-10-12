import { UPDATE_BRANDING } from '../actions/BrandingActions';

const INITIAL_STATE = {
  primary: window.__STORE__.user.partner
    ? window.__STORE__.user.partner.branding.brand
    : '',
  secondary: window.__STORE__.user.partner
    ? window.__STORE__.user.partner.branding.text
    : ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_BRANDING:
      return {
        ...state,
        primary: action.payload.primary,
        secondary: action.payload.secondary
      };
    default:
      return state;
  }
}
