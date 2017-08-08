const LOCALHOST = 'http://localhost:3001/api';

let apiRoot = '';

if (location && location.hostname === 'localhost') {
    apiRoot = LOCALHOST;
} else {
    // Obviously this should be a production url in a real life situation.
    apiRoot = LOCALHOST;
}

export const API_ROOT = apiRoot;
