import axios from 'axios';
import { API_ROOT } from 'src/constants';

export const LOGIN_USER = 'LOGIN_USER';

export async function loginUser(values) {
    let url = `${API_ROOT}/login/`;

    let request = await axios.create({
        baseURL: 'http://localhost:8001/api/v2/',
        headers: {'X-CSRFToken': window.__INITIAL_STATE__.csrf},
        timeout: 3000,
        withCredentials: true,
    });

    const result = request.post(url, values);

    return {
        type: LOGIN_USER,
        payload: result,
    }
}
