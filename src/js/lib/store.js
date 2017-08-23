const Cookie = require('js-cookie')

/**
* This is the app's store. The properties of `app.store` are reactive and
* can be shared with all components in the application. Please define
* new store properties in modules. The store is passed either from
* the Django index view, a state js view or from the SSR proxy, in which
* case it contains the full state of the rendered page.
*/
class Store {

    constructor(app, store) {
        this.app = app
        // SSR provides an initial store to be reused for
        // clientside hydration.
        app.store = store
        // } else {
        //     // Otherwise start with the default store, combined with
        //     // the initial state.
        //     app.store = this.defaultStore(initialState)
        //     Object.assign(app.store.user, this.getCookieState())
        // }
    }

    defaultStore(initialState) {
        let defaultState = {
            shouts: [],
            user: {
                authenticated: false,
                client: {},
                csrf: null,
                id: null,
                language: 'en',
                partner: {},
                selectedClient: {
                    id: null,
                    name: '',
                },
                selectedPartner: {
                    id: null,
                    name: '',
                },
                superuser: false,
            },
        }
        // Assign the user state from the API.
        Object.assign(defaultState.user, initialState)
        return defaultState
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
