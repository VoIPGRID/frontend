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
     * @param {Observable} root - The module's reactive root object.
     * @param {Object} credentials - The credentials to login with.
     */
    actions.login = function(root, credentials) {
        app.api.client.post('login/', credentials).then((res) => {
            if (res.data) {
                window.csrf = res.data.csrf
                app.api.client = axios.create({
                    baseURL: 'http://localhost/api/v2/',
                    timeout: 1000,
                    headers: {'X-CSRFToken': csrf},
                })
                Object.assign(root, res.data)
                app.router.replace('/')
            }
        })
    }


    /**
     * Log the user out of the current session and commit
     * the authentication switch to the store.
     */
    actions.logout = function() {
        app.api.client.post('logout/').then((res) => {
            if (res.data) {
                app.store.user.authenticated = false
                app.router.push({name: 'user_login'})
            }
        })
    }


    actions.readProfile = async function(root) {
        let user = await app.api.client.get('profile/')
        // Make sure to provide all keys in order for reactivity to work.
        Object.assign(root.user, user.data)
    }


    /**
     * Set the language in the backend and directly switch to
     * the new language in the frontend by updating the Vuex locale.
     * Retrieve the language file first, when the language is not yet
     * available.
     * @param {String} language - The language code to set.
     */
    actions.setLanguage = function(language) {
        if ((!global.translations || translations[language]) && language !== 'en') {
            app.utils.injectScript(`/public/i18n/${language}.js`, () => {
                // Add the translations to the Vuex store.
                Vue.i18n.add(language, translations[language])
                app.api.client.get(`language/${language}`).then((res) => {
                    app.store.i18n.locale = language
                })
            })
        } else {
            app.api.client.get(`language/${language}`).then((res) => {
                app.store.i18n.locale = language
            })
        }
    }


    actions.setPartnerContext = async function(store, partnerId) {
        let partner = await app.api.client.get(`partners/${partnerId}/`)
        app.vuex.commit('user/SET_PARTNER_CONTEXT', partner.data)
    }


    actions.updateProfile = function(user, validator) {
        let $t = Vue.i18n.translate
        app.api.client.put('profile/', user).then((res) => {
            if (res.status === 200) {
                app.store.main.apiValidation = false
                // Unset the password fields after a succesful update.
                Object.assign(user, {
                    old_password: '',
                    password: '',
                    password_confirm: '',
                })
                this.$store.shouts.push({message: $t('Profile succesfully updated')})
            } else {
                // Trigger serverside validation.
                validator.$touch()
            }
        })
    }

    return actions
}
