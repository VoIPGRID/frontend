import { GET_PARTNERS, CREATE_PARTNER, GET_PARTNER, UPDATE_PARTNER, DELETE_PARTNER, EMPTY_PARTNER, FORM_ERROR } from './PartnerActions'

const INITIAL_STATE = {
    current: null,
    partners: [],
    errors: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PARTNER:
            return { ...state,
                current: action.payload.data
            };
        case GET_PARTNERS:
            return { ...state,
                objects: action.payload.data.results
            };
        case FORM_ERROR:
            return {
                ...state,
                errors: action.payload.data
            }
        case CREATE_PARTNER:
            return { ...state };
        case UPDATE_PARTNER:
            return { ...state,
                objects: state.objects.map(partner => {
                    if (partner.id === action.payload.data.id) {
                        partner = action.payload.data;
                    }

                    return partner;
                })
            };
        case DELETE_PARTNER:
            return { ...state,
                objects: state.objects.filter(partner => {
                    return partner.id !== action.payload.id
                })
            }
        case EMPTY_PARTNER:
            return { ...state,
                current: null,
            }
        default:
            return state;
    }
}
