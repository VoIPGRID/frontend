import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlReducer as Intl } from 'react-redux-multilingual'

import ClientReducer from './ClientReducer';
import VoipAccountsReducer from './VoipAccountsReducer';
import PartnerReducer from './PartnerReducer';
import UserReducer from './UserReducer';

import baseReducer from './BaseReducer';

const rootReducer = combineReducers({
    base: baseReducer,
    clients: ClientReducer,
    form: formReducer,
    Intl: Intl,
    partners: PartnerReducer,
    user: UserReducer,
    voipaccounts: VoipAccountsReducer,
});

export default rootReducer;
