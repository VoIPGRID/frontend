/**
 * Generic helpers that are accessible on the app object
 * and in the context of each Vue component.
 */
class Helpers {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        this.app = app
    }
    /**
     * Make smaller array chunks from a flat array.
     * @param {Array} items - The items array to chunk.
     * @param {Number} chunkSize - How many items to use per chunk.
     * @returns {Array} - The chunked array.
     * @example
     * chunk([1,2,3,4,5,6,7,8,9,0])
     * // [[1,2,3],[4,5,6],[7,8,9],[0]]
     */
    chunk(items, chunkSize) {
        let R = []
        for (let i = 0, len = items.length; i < len; i += chunkSize) {
            R.push(items.slice(i, i + chunkSize))
        }
        return R
    }


    /**
     * Make an object from location.search.
     * @param {String} query -Querystring, generally `location.search`.
     * @returns {Object} - Key/value of the parsed search string.
     * @example
     * location.search
     * // ?page=1
     * parseSearch(location.search)
     * // {page: "1"}
     */
    parseSearch(query) {
        let e, k, v
        let re = /([^&=]+)=?([^&]*)/g
        let decode = function(str) {
            return decodeURIComponent(str.replace(/\+/g, ' '))
        }
        let params = {}


        if (query) {
            if (query.substr(0, 1) === '?') {
                query = query.substr(1)
            }

            while ((e = re.exec(query))) {
                k = decode(e[1])
                v = decode(e[2])
                if (params[k] !== undefined) {
                    if (!$.isArray(params[k])) {
                        params[k] = [params[k]]
                    }
                    params[k].push(v)
                } else {
                    params[k] = v
                }
            }
        }
        return params
    }


    /**
     * Convert a simple key/value object to a querystring.
     * @param {Object} params - Key/value object to convert.
     * @returns {String} - The querystring.
     * @example
     * stringifySearch({page: "1"})
     * // page=1
     */
    stringifySearch(params) {
        return Object
        .keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')
    }


    /**
     * Return the previous route or a default route. Useful
     * to redirect to the previous page with using cancel buttons
     * for instance.
     * @param {String} defaultRoute - Name of the Vue-router route.
     * @returns {Object} route - Name and query properties of the route.
     */
    lastRoute(defaultRoute) {
        if (this.app.history.length > 1) {
            const lastRoute = this.app.history[this.app.history.length - 2]
            return {
                name: lastRoute.name,
                query: lastRoute.query,
            }
        }
        // Fall back to the default route.
        let route = this.app.router.resolve({name: defaultRoute})
        return {
            name: route.route.name,
            query: route.route.query,
        }
    }
}


module.exports = function install(Vue, app) {
    /** @memberof App */
    app.utils = new Helpers(app)
    Object.defineProperties(Vue.prototype, {
        $helpers: {
            get() {
                return app.utils
            },
        },
    });
}
