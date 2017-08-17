const Cookie = require('js-cookie')

/**
* This is the app store. The properties of `app.store` are reactive and
* can be shared with all components in the application. Please define
* new store properties in modules.
*/
class Store {

    constructor(app, intitialState) {
        this.app = app
        // SSR provides an initial store to be reused for
        // clientside hydration.
        if (global.__INITIAL_STORE__) {
            app.store = global.__INITIAL_STORE__
        } else {
            // Otherwise start with the default store, combined with
            // the initial state.
            app.store = this.defaultStore(intitialState)
            Object.assign(app.store.user, this.getCookieState())
        }
    }

    defaultStore(intitialState) {
        return {
            shouts: [],
            user: intitialState,
        }
    }


    getCookieState() {
        let cookieStore
        if (Cookie.get('__INITIAL_STORE__')) {
            cookieStore = JSON.parse(Cookie.get('__INITIAL_STORE__'))
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
        Cookie.set('__INITIAL_STORE__', JSON.stringify(cookieStore), {expires: 7 })
    }
}

module.exports = Store
