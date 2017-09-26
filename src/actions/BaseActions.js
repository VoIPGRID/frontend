import axios from 'axios';
import API_ROOT from '../constants';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_FAILED = 'AUTH_FAILED';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const SET_CONTEXT = 'SET_CONTEXT';


export async function loginUser(values) {
    let url = `${API_ROOT}/login/`;

    let request = await axios.create({
        baseURL: 'http://localhost:8001/api/v2/',
        headers: {'X-CSRFToken': window.__STORE__.user.csrf},
        timeout: 3000,
        withCredentials: true,
    });

    const result = request.post(url, values);

    return {
        type: LOGIN_USER,
        payload: result,
    }
}

export async function logoutUser(result) {
    const url = `${API_ROOT}/logout`;

    const request = axios.create({
        headers: {'X-CSRFToken': window.__STORE__.user.csrf},
        timeout: 3000,
        withCredentials: true,
    });

    request.get(url);

    return {
        type: LOGOUT_USER,
        payload: result,
    }
}

function sendNotification(content, notificationType) {
    return {
        type: SEND_NOTIFICATION,
        payload: {
            content,
            notificationType,
        }
    }
}

function hideNotification(id) {
    return { type: HIDE_NOTIFICATION, id }
}



let nextNotificationId = 0
export function showNotification(text, type, timeout) {
    return function(dispatch) {
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
    }
}
