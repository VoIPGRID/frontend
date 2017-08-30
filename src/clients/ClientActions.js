import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_PARTNER = 'GET_CLIENTS_PARTNER';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const GET_CLIENT = 'GET_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';

import { AUTH_FAILED} from '../base/BaseActions';

export async function getClients(partner = null) {
    let url;

    if (partner) {
        url = `${API_ROOT}/clients/?partner=${partner}`;
    } else {
        url = `${API_ROOT}/clients/`;
    }

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__STORE__.user.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_CLIENTS,
            payload: result,
        }
    } catch(err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export function createClient(values) {
    const url = `${API_ROOT}/clients/`;

    values.created_at = Date.now();
    const request = axios.post(url, values);

    return {
        type: CREATE_CLIENT,
        payload: request,
    }
}

export async function getClient(id) {
    const url = `${API_ROOT}/clients/${id}/`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__STORE__.user.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_CLIENT,
            payload: result,
        }
    } catch(err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export function updateClient(values) {
    const { id } = values;
    const url = `${API_ROOT}/clients/${id}`;
    const request = axios.patch(url, values);

    return {
        type: UPDATE_CLIENT,
        payload: request,
    }
}

export function deleteClient(id) {
    const url = `${API_ROOT}/clients/${id}`;
    const request = axios.delete(url);

    return {
        type: DELETE_CLIENT,
        payload: {id, request},
    }
}
