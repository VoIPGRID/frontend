import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlReducer as Intl } from 'react-redux-multilingual'

import ClientReducer from 'clients/ClientReducer';
import PartnerReducer from 'partners/PartnerReducer';
import UserReducer from '../users/UserReducer';

import loginReducer from 'base/LoginReducer';

const rootReducer = combineReducers({
    clients: ClientReducer,
    partners: PartnerReducer,
    form: formReducer,
    auth: loginReducer,
    user: UserReducer,
    Intl: Intl,
});

export default rootReducer;
