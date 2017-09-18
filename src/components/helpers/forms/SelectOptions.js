import axios from 'axios';
import API_ROOT from '../../../constants';

// General function to request API data for select option fields.
async function getSelectOptions(type, idReplacement) {
    const url = `${API_ROOT}/${type}`;

    try {
        const request = await axios.create({
            headers: {'X-CSRFToken': window.__STORE__.user.csrf},
            timeout: 3000,
            withCredentials: true,
        });

        const results = await request.get(url);

        const options = results.data.map((result) => {
            if (idReplacement) {
                return {value: result[idReplacement], label: result.name};
            } else {
                return {value: result.id, label: result.name};
            }

        });

        return {options};

    } catch (err) {
        console.log(err)
    }

    return null;
}

export default getSelectOptions;
