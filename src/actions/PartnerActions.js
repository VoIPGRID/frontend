import axios from 'axios';
import API_ROOT from '../constants';
import { AUTH_FAILED } from './BaseActions';

import { updateBranding } from './BrandingActions';

export const GET_PARTNERS = 'GET_PARTNERS';
export const CREATE_PARTNER = 'CREATE_PARTNER';
export const GET_PARTNER = 'GET_PARTNER';
export const UPDATE_PARTNER = 'UPDATE_PARTNER';
export const DELETE_PARTNER = 'DELETE_PARTNER';
export const EMPTY_PARTNER = 'EMPTY_PARTNER';
export const FORM_ERROR = 'FORM_ERROR';
export const UPDATE_BRANDING = 'UPDATE_BRANDING';

/**
 * Get a list of partners.
 */
export async function getPartners() {
  const url = `${API_ROOT}/partners/`;

  try {
    const request = await axios.create({
      headers: { 'X-CSRFToken': window.__STORE__.user.csrf },
      timeout: 3000,
      withCredentials: true
    });

    const result = await request.get(url);

    return {
      type: GET_PARTNERS,
      payload: result
    };
  } catch (err) {
    return {
      type: AUTH_FAILED,
      payload: err
    };
  }
}

/**
 * Create a partner
 * @param {object} values - Object of partner values
 */
export async function createPartner(values) {
  const url = `${API_ROOT}/partners/`;

  const request = await axios.create({
    headers: {
      Accept: 'application/json',
      'X-CSRFToken': window.__STORE__.user.csrf
    },
    timeout: 3000,
    withCredentials: true
  });

  let result;
  let object;

  // Use a request interceptor to check for errors before returning the
  // action type for success or an error.
  request.interceptors.response.use(
    response => {
      result = response;
      object = {
        type: CREATE_PARTNER,
        payload: result
      };
    },
    error => {
      result = error.response.data;
      object = {
        type: FORM_ERROR,
        payload: result
      };
    }
  );

  result = await request.post(url, values);

  return object;
}

/**
 * Get a partner object.
 * @param {int} id - Id of the partner to retrieve.
 */
export async function getPartner(id) {
  const url = `${API_ROOT}/partners/${id}/`;

  try {
    const request = await axios.create({
      headers: { 'X-CSRFToken': window.__STORE__.user.csrf },
      timeout: 3000,
      withCredentials: true
    });

    const result = await request.get(url);

    return {
      type: GET_PARTNER,
      payload: result
    };
  } catch (err) {
    return {
      type: AUTH_FAILED,
      payload: err
    };
  }
}

/**
 * Update a specific partner.
 * @param {object} values - Object of partner values
 */
export function updatePartner(values) {
  return async dispatch => {
    const { id } = values;
    const url = `${API_ROOT}/partners/${id}/`;

    const request = await axios.create({
      headers: {
        Accept: 'application/json',
        'X-CSRFToken': window.__STORE__.user.csrf
      },
      timeout: 3000,
      withCredentials: true
    });

    let result;
    let object;

    // Use a request interceptor to check for errors before returning the
    // action type for success or an error.
    request.interceptors.response.use(
      response => {
        result = response;
        object = {
          type: UPDATE_PARTNER,
          payload: result
        };
      },
      error => {
        result = error.response.data;
        object = {
          type: FORM_ERROR,
          payload: result
        };
      }
    );

    result = await request.patch(url, values);

    // Update branding colors if the partner is succesfully updated.
    if (object.payload.status === 200) {
      const branding = {
        brand: values.brand,
        text: values.text
      };

      dispatch(updateBranding(branding));
    }

    return dispatch(object);
  };
}

export async function deletePartner(id) {
  const url = `${API_ROOT}/partners/${id}`;
  const request = await axios.delete(url);

  return {
    type: DELETE_PARTNER,
    payload: { id, request }
  };
}

export function emptyPartner() {
  return {
    type: EMPTY_PARTNER
  };
}
