module.exports = function(app, _module) {
    /**
     * @memberof module:user
     * @namespace
     */
    let actions = {}

    let $t = Vue.i18n.translate

    /**
    * Delete a user, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} user - The user store object.
    */
    actions.deleteUser = async function(user) {
        const clientId = app.router.currentRoute.params.client_id
        const partnerId = app.router.currentRoute.params.partner_id

        let backRoute
        let url
        if (clientId) {
            url = `clients/${clientId}/users/${user.id}`
            backRoute = {name: 'list_client_users', params: {client_id: clientId}}
        } else {
            backRoute = {name: 'list_partner_users', params: {partner_id: partnerId}}
            url = `/partners/${partnerId}/users/${user.id}`
        }

        const res = await app.api.client.delete(url)
        if (res.status === 204) {
            this.$store.users.users = this.$store.users.users.filter((i) => i.id !== user.id)
            app.vue.$shout({message: $t('User {name} succesfully deleted', {name: user.email})})
            app.router.push(backRoute)
        }
    }


    /**
     * Sign the user in to a new session, set the authentication flag
     * and update Axios with the new CSRF token.
     * @param {Observable} root - The module's reactive root object.
     * @param {Object} credentials - The credentials to login with.
     */
    actions.login = function(root, credentials) {
        app.api.client.post('login/', credentials).then((res) => {
            if (res.data) {
                window.csrf = res.data.csrf
                app.api.client = axios.create({
                    baseURL: 'http://localhost/api/v2/',
                    headers: {'X-CSRFToken': csrf},
                    timeout: 1000,
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


    /**
     * Read user context from the API and update the user store object.
     * @param {String} userId - ID of the user to read from the API.
     * @returns {Object} - The observable properties.
     */
    actions.readUser = async function(userId) {
        let baseUrl, user
        const clientId = app.router.currentRoute.params.client_id
        const partnerId = app.router.currentRoute.params.partner_id
        if (clientId) baseUrl = `clients/${clientId}/users`
        else baseUrl = `/partners/${partnerId}/users`

        if (userId) {
            const res = await app.api.client.get(`${baseUrl}/${userId}`)
            user = Object.assign(_module.getObservables().currentUser, res.data)
        } else {
            user = _module.getObservables().currentUser
        }

        let [groups] = await Promise.all([
            app.api.client.get(`${baseUrl}/groups`),
        ])

        return {
            groups: groups.data,
            user: user,
        }
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
     * @param {String} e - The change event.
     */
    actions.setLanguage = function(e) {
        // Set the language when user edits it's own information. Other users
        // being edited will just have a modified language field.
        if (this.user.id !== app.store.users.user.id) return

        let language
        let oldLanguage = this.user.profile.language

        if (oldLanguage === 'en') language = 'nl'
        else language = 'en'

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
        this.user.profile.language = language
    }


    /**
    * Update a client or partner user.
    * @param {Observable} user - The observable user object.
    * @param {Observable} validator - The observable Vuelidate validator.
    */
    actions.upsertUser = function(user, validator) {
        let backRoute, url
        const clientId = app.router.currentRoute.params.client_id
        const partnerId = app.router.currentRoute.params.partner_id

        if (clientId) {
            backRoute = {name: 'list_client_users', params: {client_id: clientId}}
            url = `/clients/${clientId}/users/${user.id}/`
        } else {
            backRoute = {name: 'list_partner_users', params: {partner_id: partnerId}}
            url = `/partners/${partnerId}/users/${user.id}/`
        }

        app.api.client.put(url, user).then((res) => {
            if (res.status === 200) {
                app.store.main.apiValidation = false
                // Unset the password fields after a succesful update.
                Object.assign(user, {
                    old_password: '',
                    password: '',
                    password_confirm: '',
                })

                // User's own profile. Don't redirect to the last/list view.
                if (user.id === app.store.users.user.id) {
                    app.vue.$shout({message: $t('Profile succesfully updated')})
                } else {
                    app.vue.$shout({message: $t('User succesfully updated')})
                    app.router.push(app.utils.lastRoute(backRoute))
                }
            } else {
                // Trigger serverside validation.
                validator.$touch()
            }
        })
    }


    return actions
}
