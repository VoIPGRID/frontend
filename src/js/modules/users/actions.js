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
                Object.assign(root.user, res.data)
                app.router.replace('/')
            }
        })
    }


    /**
     * Log the user out of the current session.
     */
    actions.logout = function() {
        app.api.client.post('logout/').then((res) => {
            if (res.data) {
                app.store.users.user.authenticated = false
                app.router.push({name: 'user_login'})
            }
        })
    }


    actions.readProfile = async function(user) {
        let userData = await app.api.client.get('profile/')
        // Make sure to provide all keys in order for reactivity to work.
        Object.assign(user, userData.data)
    }


    actions.readUsers = async function(data) {
        const uri = `${data.resourceUrl}?${app.utils.stringifySearch(data.params)}`
        let users = await app.api.client.get(uri)
        this.users = users.data.results
    }


    /**
     * Set the language in the backend and directly switch to
     * the new language in the frontend. Retrieve the language file first,
     * when the language is not yet available.
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
                app.vue.$shout({message: $t('Profile succesfully updated')})
            } else {
                // Trigger serverside validation.
                validator.$touch()
            }
        })
    }


    /**
    * Update a client or partner user.
    * @param {Observable} user - The observable user object.
    */
    actions.upsertUser = function(user) {
        // Format the data that we are about to send to the API first.
        let $t = Vue.i18n.translate
        let payload = JSON.parse(JSON.stringify(client))
        if (client.id) {
            app.api.client.put(`clients/${client.id}/`, payload).then((res) => {
                app.vue.$shout({message: $t('Client {name} succesfully updated', {name: client.name})})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        } else {
            app.api.client.post('clients/', payload).then((res) => {
                app.vue.$shout({message: $t('Client {name} succesfully created', {name: client.name})})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        }
    }

    return actions
}
