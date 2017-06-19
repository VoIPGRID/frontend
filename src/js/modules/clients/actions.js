module.exports = function(app) {
    /**
     * @memberof module:clients
     * @namespace
     */
    let actions = {}

    /**
     * Delete a client to the API, commit the deleted client to the clients
     * property of the store and commit a notification. Route to the last route
     * afterwards.
     * @param {Vuex} store - The client scoped Vuex store.
     */
    actions.deleteClient = (store) => {
        const client = store.state.client
        app.api.delete(`clients/${client.id}/`).then((res) => {
            let $t = Vue.i18n.translate
            store.commit('CLIENT_DELETED', client)
            store.dispatch('notify', {
                message: $t('Client {name} succesfully deleted', {name: client.name}),
            }, {root: true})
            app.router.push({name: 'list_clients'})
        })
    }

    /**
     * Clear the currently selected client.
     * @param {Vuex} store - The client scoped Vuex store.
     */
    actions.emptyClient = (store) => {
        store.commit('CLIENT_EMPTIED')
    }

    /**
     * Read client from the API and commit the change to the store.
     * @param {Vuex} store - The client scoped Vuex store.
     * @param {String} clientId - ID of the client to read from the API.
     */
    actions.readClient = async (store, clientId) => {
        let [anonymizeAfter, audio, blockedCallPermissions, countries, currencies, owners, system, timezones] = await Promise.all([
            app.api.get('clients/anonymize_after/'),
            app.api.get('clients/audio_languages/'),
            app.api.get('clients/blocked_call_permissions/'),
            app.api.get('clients/countries/'),
            app.api.get('clients/currencies/'),
            app.api.get('clients/owners/'),
            app.api.get('clients/system_languages/'),
            app.api.get('clients/timezones/'),
        ])

        store.commit('CLIENT_OPTIONS_CHANGED', {
            anonymizeAfter: anonymizeAfter.data,
            audioLanguages: audio.data,
            blockedCallPermissions: blockedCallPermissions.data,
            countries: countries.data,
            currencies: currencies.data,
            owners: owners.data.results,
            systemLanguages: system.data,
            timezones: timezones.data,
        })

        if (clientId) {
            let client = await app.api.get(`clients/${clientId}/`)
            store.commit('CLIENT_CHANGED', client.data)
        } else {
            store.commit('CLIENT_CHANGED', {
                billingprofile: {
                    currency: '',
                    billing_email: '',
                    exclude_from_export: false,
                },
                blocked_call_permissions: [],
                description: '',
                foreign_code: '',
                name: '',
                profile: {
                    audio_language: '',
                    country: {
                        code: '',
                    },
                    system_language: '',
                    timezone: '',
                },

            })
        }
    }

    /**
     * Read clients from the API and commit the change to the store.
     * Used by the paginator component.
     * @param {Vuex} store - The client scoped Vuex store.
     * @param {Object} data - Context passed from the Paginator component.
     * @returns {Promise} - Resolves when API data is committed to the store.
     */
    actions.readClients = (store, data) => {
        return new Promise((resolve, reject) => {
            const uri = `${data.resource_url}?${app.utils.stringifySearch(data.params)}`
            app.api.get(uri).then((res) => {
                store.commit('CLIENTS_CHANGED', res.data)
                resolve(res.data)
            })
        })
    }

    /**
     * Update or insert a client to the API, commit a notification to the store
     * and route back to the last route afterwards.
     * @param {Vuex} store - The client scoped Vuex store.
     */
    actions.upsertClient = (store) => {
        const client = store.state.client
        let $t = Vue.i18n.translate
        if (client.id) {
            app.api.put(`clients/${client.id}/`, client).then((res) => {
                store.dispatch('notify', {
                    message: $t('Client {name} succesfully updated', {name: client.name}),
                }, {root: true})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        } else {
            app.api.post('clients/', client).then((res) => {
                store.dispatch('notify', {
                    message: $t('Client {name} succesfully created', {name: client.name}),
                }, {root: true})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        }
    }

    return actions
}
