import * as cache from './cache';
import {
  base,
  defaultRequest,
  cachePostResponseAsGet
} from '../config/api.json';

function setupRequestOptions(path, _options) {
  return {
    uri: `${base}${path}`,
    options: Object.assign({}, defaultRequest, _options)
  };
}

export function get(path, _options) {
  const { uri, options } = setupRequestOptions(path, _options);

  if (cache.isCached(uri)) {
    return cache.get(uri);
  }

  const promise = fetch(uri, options).then(res => res.json());

  cache.add({ uri, promise });

  return promise;
}

export function post(path, body) {
  const { uri, options } = setupRequestOptions(path, { body, method: 'POST' });

  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  const promise = fetch(uri, options).then(res => res.json());

  if (cachePostResponseAsGet.includes(path)) {
    cache.add({ uri, promise });
  }

  return promise;
}

export function put(path, body) {
  const { uri, options } = setupRequestOptions(path, { body, method: 'PUT' });

  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  return fetch(uri, options).then(res => res.json());
}

export function del(path) {
  const { uri, options } = setupRequestOptions(path, { method: 'DELETE' });
  return fetch(uri, options).then(res => res.json());
}

// prime the cache with the external session request
// and set the csrf-token
{
  if (window && window.csrf) {
    defaultRequest.headers['X-csrftoken'] = window.csrf;
  }

  const { session } = window.voipgrid;
  if (session) {
    cache.add({ uri: `${base}/session`, promise: session });
    delete window.voipgrid.session;
  }
}
