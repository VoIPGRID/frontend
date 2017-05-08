module.exports = (app) => {
    return {
        /**
         * Makes smaller array chunks from a flat array, e.g.
         * `[[1,2,3],[4,5,6],[7,8,9],[0]]` from `[1,2,3,4,5,6,7,8,9,0]`.
         */
        chunk(arr, chunkSize) {
            let R = []
            for (let i = 0, len = arr.length; i < len; i += chunkSize) {
                R.push(arr.slice(i, i + chunkSize))
            }
            return R
        },
        parseParams(query) {
            var e, k, v;
            var re = /([^&=]+)=?([^&]*)/g;
            var decode = function(str) {
                return decodeURIComponent(str.replace(/\+/g, ' '));
            };
            var params = {};


            if (query) {
                if (query.substr(0, 1) === '?') {
                    query = query.substr(1);
                }

                while ((e = re.exec(query))) {
                    k = decode(e[1]);
                    v = decode(e[2]);
                    if (params[k] !== undefined) {
                        if (!$.isArray(params[k])) {
                            params[k] = [params[k]];
                        }
                        params[k].push(v);
                    } else {
                        params[k] = v;
                    }
                }
            }
            return params;
        },
        toQueryString(paramsObject) {
            return Object
            .keys(paramsObject)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
            .join('&')
        },
        /**
         * Returns the previous route or a default route. Useful
         * to redirect to the previous page with using cancel buttons
         * for instance.
         */
        lastRoute(defaultRoute) {
            if (app.history.length > 1) {
                const lastRoute = app.history[app.history.length - 2]
                return {
                    name: lastRoute.name,
                    query: lastRoute.query,
                }
            }
            // Fall back to the default route.
            let route = app.router.resolve({name: defaultRoute})
            return {
                name: route.route.name,
                query: route.route.query,
            }
        },
    }
}
