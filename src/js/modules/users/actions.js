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

        const {status} = await app.api.client.delete(url)
        if (status === 204) {
            this.$store.users.users.results = this.$store.users.users.results.filter((i) => i.id !== user.id)
            app.vm.$shout({message: $t('User {name} succesfully deleted', {name: user.email})})
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
                Object.assign(this.$store, res.data)
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
                app.store.user.authenticated = false
                app.router.push({name: 'user_login'})
            }
        })
    }


    /**
    * Read user context from the API and update the user store object.
    * @param {String} [clientId] - ID of the client the user belongs to.
    * @param {String} [partnerId] - ID of the partner user belongs to.
    * @param {String} userId - ID of the user to retrieve.
    * @returns {Object} - Raw user data from the API.
    */
    actions.readUser = async function(clientId, partnerId, userId) {
        let context = {}
        let promises = []
        let baseUrl

        if (clientId) baseUrl = `clients/${clientId}/users`
        else baseUrl = `/partners/${partnerId}/users`

        if (userId) promises.push(app.api.client.get(`${baseUrl}/${userId}/`))
        promises.push(app.api.client.get(`${baseUrl}/groups/`, {adapter: app.api.cachingAdapter}))

        if (userId) {
            let [{data: user}, {data: groups}] = await Promise.all(promises)
            // context.user = Object.assign(_module.getObservables().user, user)
            Object.assign(context, {groups: groups, user: user})
        } else {
            let [{data: groups}] = await Promise.all(promises)
            Object.assign(context, {groups: groups, user: _module.getObservables().user})
        }

        return context
    }


    /**
    * Provide data for the add_edit_users view. Retrieve all of the user's
    * possible userdestinations; both phoneaccounts and fixeddestinations.
    * @param {String} [clientId] - ID of the client the user belongs to.
    * @param {String} userId - ID of the user the userdestination belongs to.
    * @returns {Object} - Raw userdestination data from the API.
    */
    actions.readUserDestinations = async function(clientId, userId) {
        let baseUrl = `clients/${clientId}/users/${userId}/userdestinations`
        let [fixeddestinations, phoneaccounts] = await Promise.all([
            app.api.client.get(`${baseUrl}/fixeddestinations/`),
            app.api.client.get(`${baseUrl}/phoneaccounts/`),
        ])

        let userdestinations = phoneaccounts.data.results.concat(fixeddestinations.data.results)
        return {userdestinations}
    }


    /**
    * Provide data for the list_users view.
    * @param {Object} url - The url object.
    * @param {Number} url.oage - The page of the url.
    * @param {String} url.path - The path of the url.
    * @returns {Object} - an API endpoint formatted result list.
    */
    actions.readUsers = async function({page, path}) {
        let {data: users} = await app.api.client.get(`${path}?page=${page}`)
        return users
    }


    /**
     * Set the language in the backend and directly switch to
     * the new language in the frontend. Retrieve the language file first,
     * when the language is not yet available.
     * @param {String} e - The change event.
     */
    actions.setLanguage = async function(e) {
        // Set the language when user edits it's own information. Other users
        // being edited will just have a modified language field.
        if (this.user.id !== app.store.user.id) return

        let language
        let oldLanguage = this.user.profile.language

        if (oldLanguage === 'en') language = 'nl'
        else language = 'en'

        if ((!global.translations || translations[language]) && language !== 'en') {
            app.utils.injectScript(`/public/js/i18n/${language}.js`, async() => {
                // Add the translations to the Stash store.
                Vue.i18n.add(language, translations[language])
                const res = await app.api.client.get(`language/${language}`)
                if (res.status === 200) {
                    app.store.i18n.locale = language
                    app._store.setCookieState({language: language})
                }
            })
        } else {
            const res = await app.api.client.get(`language/${language}`)
            if (res.status === 200) {
                app.store.i18n.locale = language
                app._store.setCookieState({language: language})
            }
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
            url = `/clients/${clientId}/users/`
            user.client = clientId
        } else {
            backRoute = {name: 'list_partner_users', params: {partner_id: partnerId}}
            url = `/partners/${partnerId}/users/`
            user.partner = partnerId
        }

        if (user.id) {
            url += `${user.id}/`
            app.api.client.put(url, user).then((res) => {
                if (res.status === 200) {
                    app.store.general.apiValidation = false
                    // Unset the password fields after a succesful update.
                    Object.assign(user, {
                        old_password: '',
                        password: '',
                        password_confirm: '',
                    })

                    // User's own profile. Don't redirect to the last/list view.
                    if (user.id === app.store.user.id) {
                        app.vm.$shout({message: $t('Profile succesfully updated')})
                    } else {
                        app.vm.$shout({message: $t('User succesfully updated')})
                        app.router.push(app.utils.lastRoute(backRoute))
                    }
                } else {
                    // Trigger serverside validation.
                    validator.$touch()
                }
            })
        } else {
            // Remove this key when creating a new user.
            delete user.old_password
            app.api.client.post(url, user).then((res) => {
                if (res.status === 201) {
                    app.store.general.apiValidation = false
                    // Unset the password fields after a succesful update.
                    Object.assign(user, {
                        password: '',
                        password_confirm: '',
                    })

                    app.vm.$shout({message: $t('User succesfully updated')})
                    app.router.push(app.utils.lastRoute(backRoute))
                } else {
                    // Trigger serverside validation.
                    validator.$touch()
                }
            })
        }


    }


    return actions
}
