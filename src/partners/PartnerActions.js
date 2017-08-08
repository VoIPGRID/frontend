import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const GET_PARTNERS = 'GET_PARTNERS';
export const CREATE_PARTNER = 'CREATE_PARTNER';
export const GET_PARTNER = 'GET_PARTNER';
export const UPDATE_PARTNER = 'UPDATE_PARTNER';
export const DELETE_PARTNER = 'DELETE_PARTNER';

export async function getPartners(searchString = '') {
    const url = `${API_ROOT}/partners/?name_like=${searchString}`;
    const request = await axios.get(url);

    return {
        type: GET_PARTNERS,
        payload: request,
    }
}

export async function createPartner(values) {
    const url = `${API_ROOT}/partners/`;

    values.created_at = Date.now();
    values.is_active = true;
    const request = await axios.post(url, values);

    return {
        type: CREATE_PARTNER,
        payload: request,
    }
}

export async function getPartner(id) {
    const url = `${API_ROOT}/partners/${id}`;
    const request = await axios.get(url);

    return {
        type: GET_PARTNER,
        payload: request,
    }
}

export async function updatePartner(values) {
    const { id } = values;
    const url = `${API_ROOT}/partners/${id}`;
    const request = await axios.patch(url, values);

    return {
        type: UPDATE_PARTNER,
        payload: request,
    }
}

export async function deletePartner(id) {
    const url = `${API_ROOT}/partners/${id}`;
    const request = await axios.delete(url);

    return {
        type: DELETE_PARTNER,
        payload: {id, request},
    }
}
