module.exports = function(app) {
    /**
     * @memberof module:user
     * @namespace
     */
    let actions = {}

    /**
     * Log the user in to a new session, commit
     * the authentication switch to the store and update
     * Axios with the new CSRF token.
     * @param {Vuex} store - The Vuex store.
     */
    actions.login = (store) => {
        app.api.post('login/', store.state.credentials).then((res) => {
            if (res.data) {
                window.csrf = res.data.csrf
                app.api = axios.create({
                    baseURL: 'http://localhost/api/v2/',
                    timeout: 1000,
                    headers: {'X-CSRFToken': csrf},
                })
                store.commit('AUTHENTICATE', true)
                app.router.replace('/')
            }
        })
    }

    /**
     * Log the user out of the current session and commit
     * the authentication switch to the store.
     * @param {Vuex} store - The Vuex store.
     */
    actions.logout = (store) => {
        app.api.post('logout/').then((res) => {
            if (res.data) {
                store.commit('AUTHENTICATE', false)
                app.router.push({name: 'user_login'})
            }
        })
    }

    /**
     * Set the language in the backend and directly switch to
     * the new language in the frontend by updating the Vuex locale.
     * Retrieve the language file first, when the language is not yet
     * available.
     * @param {Vuex} store - The Vuex store.
     * @param {String} language - The language code to set.
     */
    actions.setLanguage = (store, language) => {
        if (!global.translations || translations[language]) {
            app.utils.injectScript(`/public/i18n/${language}.js`, () => {
                // Add the translations to the Vuex store.
                Vue.i18n.add(language, translations[language])
                app.api.get(`language/${language}`).then((res) => {
                    store.commit('SET_LOCALE', {locale: language}, {root: true})
                })
            })
        } else {
            app.api.get(`language/${language}`).then((res) => {
                store.commit('SET_LOCALE', {locale: language}, {root: true})
            })
        }

    }

    return actions
}
