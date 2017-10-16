import axios from 'axios';
import API_ROOT from '../constants';
import { updateBranding } from './BrandingActions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_FAILED = 'AUTH_FAILED';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const SET_CONTEXT = 'SET_CONTEXT';

// Send a request to the API to logout the user
// and return the result object.
export function logoutUser(result) {
  const url = `${API_ROOT}/logout`;

  const request = axios.create({
    headers: { 'X-CSRFToken': window.__STORE__.user.csrf },
    timeout: 3000,
    withCredentials: true
  });

  request.get(url);

  return {
    type: LOGOUT_USER,
    payload: result
  };
}

// This loginUser functionality calls the login function as well as
// using the branding information returned after the login in call
// to set the default branding when the user logs in succesfully.
export function loginUser(values) {
  return async dispatch => {
    let url = `${API_ROOT}/login/`;

    let request = await axios.create({
      baseURL: 'http://localhost:8001/api/v2/',
      headers: { 'X-CSRFToken': window.__STORE__.user.csrf },
      timeout: 3000,
      withCredentials: true
    });

    const result = await request.post(url, values);

    if (result.data.user.authenticated) {
      dispatch(updateBranding(result.data.user.partner.branding));
    }

    return dispatch({
      type: LOGIN_USER,
      payload: result
    });
  };
}

let nextNotificationId = 0;
export function showNotification(text, type, timeout) {
  return dispatch => {
    // Assigning IDs to notifications lets reducer ignore HIDE_NOTIFICATION
    // for the notification that is not currently visible.
    // Alternatively, we could store the interval ID and call
    // clearInterval(), but we’d still want to do it in a single place.
    const id = nextNotificationId++;
    dispatch(sendNotification(text, type));

    if (timeout) {
      setTimeout(() => {
        dispatch(hideNotification(id));
      }, 2000);
    }
  };
}

function sendNotification(content, notificationType) {
  return {
    type: SEND_NOTIFICATION,
    payload: {
      content,
      notificationType
    }
  };
}

function hideNotification(id) {
  return { type: HIDE_NOTIFICATION, id };
}
