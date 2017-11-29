import { base, defaultRequest } from '../../config/api.json';

if (window && window.csrf) {
  defaultRequest.headers['X-csrftoken'] = window.csrf;
}

export function setupRequestOptions(path, _options) {
  return {
    uri: `${base}${path}`,
    options: Object.assign({}, defaultRequest, _options)
  };
}
