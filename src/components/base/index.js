import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlReducer as Intl } from 'react-redux-multilingual'

import ClientReducer from '../../reducers/ClientReducer';
import VoipAccountsReducer from '../../reducers/VoipAccountsReducer';
import PartnerReducer from '../../reducers/PartnerReducer';
import UserReducer from '../../reducers/UserReducer';

import baseReducer from '../../reducers/BaseReducer';

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
