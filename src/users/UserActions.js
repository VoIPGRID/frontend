import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const GET_USERS = 'GET_USERS';
export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const EMPTY_USER = 'EMPTY_USER';
export const FORM_ERROR = 'FORM_ERROR';

import { AUTH_FAILED} from '../base/LoginActions';

export async function getUsers(searchString = '') {
    const url = `${API_ROOT}/users/`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__INITIAL_STATE__.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_USERS,
            payload: result,
        }
    } catch(err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export async function getUser() {
    const partnerId = window.__INITIAL_STATE__.partner.id;
    const userId = window.__INITIAL_STATE__.id;
    const url = `${API_ROOT}/partners/${partnerId}/users/${userId}`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__INITIAL_STATE__.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_USER,
            payload: result,
        }
    } catch(err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export async function updateUser(values) {
    const partnerId = window.__INITIAL_STATE__.partner.id;
    const userId = window.__INITIAL_STATE__.id;
    const url = `${API_ROOT}/partners/${partnerId}/users/${userId}`;

    const request = await axios.create({
        headers: {
            Accept: 'application/json',
            'X-CSRFToken': window.__INITIAL_STATE__.csrf
        },
        timeout: 3000,
        withCredentials: true,
    });

    let result;
    let object;

    request.interceptors.response.use((response) => {
        result = response;
        object = {
            type: UPDATE_USER,
            payload: result,
        }
    }, (error) => {
        result = error.response.data;
        object = {
            type: FORM_ERROR,
            payload: result,
        }
    });

    result  = await request.patch(url, values);

    return object;
}

export function emptyUser() {
    return {
        type: EMPTY_USER
    }
}
