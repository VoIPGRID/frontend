import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const GET_VOIPACCOUNTS = 'GET_VOIPACCOUNTS';
export const GET_VOIPACCOUNT = 'GET_VOIPACCOUNT';
export const FORM_ERROR = 'FORM_ERROR';

import { AUTH_FAILED} from '../../../base/LoginActions';

export async function getVoipAccounts(clientId) {
    const url = `${API_ROOT}/clients/${clientId}/phoneaccounts/`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__INITIAL_STATE__.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_VOIPACCOUNTS,
            payload: result,
        }
    } catch(err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export async function getVoipAccount(clientId, voipAccountId) {
    const url = `${API_ROOT}/clients/${clientId}/phoneaccounts/${voipAccountId}`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__INITIAL_STATE__.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_VOIPACCOUNT,
            payload: result,
        }
    } catch(err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}
