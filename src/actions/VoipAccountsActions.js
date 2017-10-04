import axios from 'axios';
import API_ROOT from '../constants';

import { AUTH_FAILED } from './BaseActions';

export const GET_VOIPACCOUNTS = 'GET_VOIPACCOUNTS';
export const GET_VOIPACCOUNT = 'GET_VOIPACCOUNT';
export const EMPTY_VOIPACCOUNT = 'EMPTY_VOIPACCOUNT';
export const FORM_ERROR = 'FORM_ERROR';

export function getVoipAccounts(clientId) {
  const url = `${API_ROOT}/clients/${clientId}/phoneaccounts/`;

  try {
    const request = axios.create({
      headers: { 'X-CSRFToken': window.__STORE__.user.csrf },
      timeout: 3000,
      withCredentials: true
    });

    const result = request.get(url);

    return {
      type: GET_VOIPACCOUNTS,
      payload: result
    };
  } catch (err) {
    return {
      type: AUTH_FAILED,
      payload: err
    };
  }
}

export function getVoipAccount(clientId, voipAccountId) {
  const url = `${API_ROOT}/clients/${clientId}/phoneaccounts/${voipAccountId}`;

  try {
    const request = axios.create({
      headers: { 'X-CSRFToken': window.__STORE__.user.csrf },
      timeout: 3000,
      withCredentials: true
    });

    const result = request.get(url);

    return {
      type: GET_VOIPACCOUNT,
      payload: result
    };
  } catch (err) {
    return {
      type: AUTH_FAILED,
      payload: err
    };
  }
}
