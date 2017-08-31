const Cookie = require('js-cookie')

/**
* This is the app's store. The properties of `app.store` are reactive and
* can be shared with all components in the application. The store is passed
* either from the Django index view, a state js view or from the SSR proxy,
* in which case it contains the full state of the rendered page, instead
* of the minimal user state.
*/
class Store {

    constructor(app, store) {
        this.app = app
        // SSR provides an initial store to be reused for
        // clientside hydration.
        app.store = Object.assign(store, this.getDefaults())
    }


    /**
    * Store defaults that aren't provided by the SSR proxy
    * or the API backend.
    * @returns {Object} - Default store properties.
    */
    getDefaults() {
        return {
            breadcrumbs: [],
            shouts: [],
        }
    }


    getCookieState() {
        let cookieStore
        if (Cookie.get('__STORE__')) {
            cookieStore = JSON.parse(Cookie.get('__STORE__'))
        } else {
            cookieStore = {}
        }
        return cookieStore
    }


    /**
    * Set user state to a cookie. This way the state can persist, even
    * when using SSR.
    * @param {Object} props - The user properties to make persistent.
    */
    setCookieState(props) {
        let cookieStore = this.getCookieState()
        Object.assign(cookieStore, props)
        Cookie.set('__STORE__', JSON.stringify(cookieStore), {expires: 7 })
    }
}

module.exports = Store
