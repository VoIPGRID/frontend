import * as cache from './cache';
import { base, defaultRequest } from '../config/api.json';

export default function(path, options, forceCache = false) {
  const uri = `${base}${path}`;
  const requestOptions = Object.assign({}, defaultRequest, options);

  if (requestOptions.method === 'GET') {
    if (cache.isCached(uri)) {
      return cache.get(uri);
    }
  }

  if (requestOptions.body && typeof requestOptions.body === 'object') {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  const promise = fetch(uri, requestOptions).then(res => res.json());
  if (forceCache) {
    cache.add({ uri, promise });
  }
  return promise;
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
