import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_PARTNER = 'GET_CLIENTS_PARTNER';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const GET_CLIENT = 'GET_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';

export function getClients(partnerId = null) {
    let url = `${API_ROOT}/clients/`;

    if (partnerId) {
        url += `?partner=${partnerId}`;
    }

    const request = axios.get(url);

    return {
        type: GET_CLIENTS,
        payload: request,
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

export function getClient(id) {
    const url = `${API_ROOT}/clients/${id}`;
    const request = axios.get(url);

    return {
        type: GET_CLIENT,
        payload: request,
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

