module.exports = function(app, _module) {
    /**
     * @memberof module:clients
     * @namespace
     */
    let actions = {}

    /**
     * Delete a client to the API, update the store and add a notification.
     * Route to the last route afterwards.
     * @param {Observable} client - The client store object.
     */
    actions.deleteClient = function(client) {
        app.api.client.delete(`clients/${client.id}/`).then((res) => {
            let $t = Vue.i18n.translate
            this.$store.clients.clients = this.$store.clients.clients.filter((i) => i.id !== client.id)
            app.vue.$shout({message: $t('Client {name} succesfully deleted', {name: client.name})})
            app.router.push({name: 'list_clients'})
        })
    }


    /**
     * Read client from the API and update the client store object.
     * @param {Observable} root - The module's reactive root object.
     * @param {String} clientId - ID of the client to read from the API.
     */
    actions.readClient = async(root, clientId) => {
        if (clientId) {
            let client = await app.api.client.get(`clients/${clientId}/`)
            Object.assign(root.client, client.data)
        } else {
            Object.assign(root.client, _module.getObservables().client)
        }

        let [anonymizeAfter, audio, blockedCallPermissions, countries,
             currencies, owners, system, timezones,
        ] = await Promise.all([
            app.api.client.get('clients/anonymize_after/'),
            app.api.client.get('clients/audio_languages/'),
            app.api.client.get('clients/blocked_call_permissions/'),
            app.api.client.get('clients/countries/'),
            app.api.client.get('clients/currencies/'),
            app.api.client.get('clients/owners/'),
            app.api.client.get('clients/system_languages/'),
            app.api.client.get('clients/timezones/'),
        ])

        Object.assign(root, {
            anonymizeAfter: anonymizeAfter.data,
            audioLanguages: audio.data,
            blockedCallPermissions: blockedCallPermissions.data,
            countries: countries.data,
            currencies: currencies.data,
            owners: owners.data.results,
            systemLanguages: system.data,
            timezones: timezones.data,
        })
    }


    /**
     * Read clients from the API. Used by the paginator component.
     * @param {Object} data - Context passed from the Paginator component.
     * @returns {Object} - Returns the client object from the API endpoint.
     */
    actions.readClients = async function(data) {
        // Filter the selection based on the currently selected partner.
        if (app.store.users.user.selectedPartner) {
            data.params.partner = app.store.users.user.selectedPartner.id
        }

        let clients = await app.api.client.get(`${data.resourceUrl}?${app.utils.stringifySearch(data.params)}`)
        this.clients = clients.data.results
        return clients.data
    }


    /**
    * Delete a partner to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} client - The client object.
    */
    actions.upsertClient = function(client) {
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
