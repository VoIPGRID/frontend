import { GET_CLIENTS } from './ClientActions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_CLIENTS:
            return action.payload.data.results;
        default:
            return state;
    }
}
