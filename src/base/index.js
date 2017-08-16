import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ClientReducer from 'clients/ClientReducer';
import PartnerReducer from 'partners/PartnerReducer';

import loginReducer from 'base/LoginReducer';

const rootReducer = combineReducers({
    clients: ClientReducer,
    partners: PartnerReducer,
    form: formReducer,
    auth: loginReducer
});

export default rootReducer;
