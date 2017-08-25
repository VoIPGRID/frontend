import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlReducer as Intl } from 'react-redux-multilingual'

import ClientReducer from 'clients/ClientReducer';
import VoipAccountsReducer from 'clients/admin_modules/voip_accounts/VoipAccountsReducer';
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
    voipaccounts: VoipAccountsReducer
});

export default rootReducer;
