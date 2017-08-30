import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_FAILED = 'AUTH_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
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

export function logoutUser(result) {
    return {
        type: LOGOUT_USER,
        payload: result,
    }
}

export function setContext(context) {
    return {
        type: SET_CONTEXT,
        payload: context
    }
}
