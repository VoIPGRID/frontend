import axios from 'axios';
import API_ROOT from '../constants';
import { AUTH_FAILED} from './BaseActions';

export const GET_PARTNERS = 'GET_PARTNERS';
export const CREATE_PARTNER = 'CREATE_PARTNER';
export const GET_PARTNER = 'GET_PARTNER';
export const UPDATE_PARTNER = 'UPDATE_PARTNER';
export const DELETE_PARTNER = 'DELETE_PARTNER';
export const EMPTY_PARTNER = 'EMPTY_PARTNER';
export const FORM_ERROR = 'FORM_ERROR';



export async function getPartners(searchString = '') {
    const url = `${API_ROOT}/partners/`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__STORE__.user.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_PARTNERS,
            payload: result,
        }
    } catch (err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export async function createPartner(values) {
    const url = `${API_ROOT}/partners/`;

    const request = await axios.create({
        headers: {
            Accept: 'application/json',
            'X-CSRFToken': window.__STORE__.user.csrf,
        },
        timeout: 3000,
        withCredentials: true,
    });

    let result;
    let object;

    request.interceptors.response.use((response) => {
        result = response;
        object = {
            type: CREATE_PARTNER,
            payload: result,
        }
    }, (error) => {
        result = error.response.data;
        object = {
            type: FORM_ERROR,
            payload: result,
        }
    });

    result = await request.post(url, values);

    return object;
}

export async function getPartner(id) {
    const url = `${API_ROOT}/partners/${id}/`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__STORE__.user.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const result = await request.get(url);

        return {
            type: GET_PARTNER,
            payload: result,
        }
    } catch (err) {
        return {
            type: AUTH_FAILED,
            payload: err,
        }
    }
}

export async function updatePartner(values) {
    const { id } = values;
    const url = `${API_ROOT}/partners/${id}/`;

    const request = await axios.create({
        headers: {
            Accept: 'application/json',
            'X-CSRFToken': window.__STORE__.user.csrf,
        },
        timeout: 3000,
        withCredentials: true,
    });

    let result;
    let object;

    request.interceptors.response.use((response) => {
        result = response;
        object = {
            type: UPDATE_PARTNER,
            payload: result,
        }
    }, (error) => {
        result = error.response.data;
        object = {
            type: FORM_ERROR,
            payload: result,
        }
    });

    result = await request.patch(url, values);

    return object;
}


export async function deletePartner(id) {
    const url = `${API_ROOT}/partners/${id}`;
    const request = await axios.delete(url);

    return {
        type: DELETE_PARTNER,
        payload: {id, request},
    }
}

export function emptyPartner() {
    return {
        type: EMPTY_PARTNER,
    }
}
