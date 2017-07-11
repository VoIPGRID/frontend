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
        app.api.client.post('login/', store.state.credentials).then((res) => {
            if (res.data) {
                window.csrf = res.data.csrf
                app.api.client = axios.create({
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
        app.api.client.post('logout/').then((res) => {
            if (res.data) {
                store.commit('AUTHENTICATE', false)
                app.router.push({name: 'user_login'})
            }
        })
    }

    actions.readProfile = async (store) => {
        let user = await app.api.client.get('profile/')
        // Make sure to provide all keys in order for reactivity to work.
        user.data.old_password = ''
        user.data.password = ''
        user.data.password_confirm = ''
        store.commit('FILL_USER_PROFILE', user.data)
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
        if ((!global.translations || translations[language]) && language !== 'en') {
            app.utils.injectScript(`/public/i18n/${language}.js`, () => {
                // Add the translations to the Vuex store.
                Vue.i18n.add(language, translations[language])
                app.api.client.get(`language/${language}`).then((res) => {
                    store.commit('SET_LOCALE', {locale: language}, {root: true})
                })
            })
        } else {
            app.api.client.get(`language/${language}`).then((res) => {
                store.commit('SET_LOCALE', {locale: language}, {root: true})
            })
        }
    }

    actions.updateProfile = (store, validator) => {
        let $t = Vue.i18n.translate
        const user = JSON.parse(JSON.stringify(store.state.user))

        app.api.client.put('profile/', user).then((res) => {
            if (res.status === 200) {
                this.app.vuex.commit('main/API_VALIDATION', false)
                store.dispatch('notify', {message: $t('Profile succesfully updated', {name: user.name})}, {root: true})
                app.vuex.dispatch('user/readProfile')
            } else {
                // Trigger serverside validation.
                validator.$touch()
            }
        })
    }

    return actions
}
