module.exports = function(app, _module) {
    /**
     * @memberof module:clients
     * @namespace
     */
    let actions = {}

    let $t = Vue.i18n.translate

    /**
    * Delete a client to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} client - The client store object.
    */
    actions.deleteClient = async function(client) {
        const res = await app.api.client.delete(`clients/${client.id}/`)
        if (res.status === 204) {
            let clients = this.$store.clients.clients.results
            this.$store.clients.clients.results = clients.filter((i) => i.id !== client.id)
            app.vm.$shout({message: $t('Client {name} succesfully deleted', {name: client.name})})
            app.router.push({name: 'list_clients'})
        }
    }


    /**
    * Read client from the API and update the client store object.
    * @param {String} clientId - ID of the client to read from the API.
    * @param {Boolean} formEndpoints - Include form data for selects.
    * @returns {Object} - All data related to the client form.
    */
    actions.readClient = async function(clientId, formEndpoints = true) {
        let context = {}
        if (clientId) {
            const res = await app.api.client.get(`clients/${clientId}/`)
            context.client = res.data
        } else {
            context.client = _module.getObservables().client
        }

        if (!formEndpoints) return context

        let [
            anonymizeAfter, audio, blockedCallPermissions, countries,
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

        Object.assign(context, {
            anonymizeAfter: anonymizeAfter.data,
            audioLanguages: audio.data,
            blockedCallPermissions: blockedCallPermissions.data,
            countries: countries.data,
            currencies: currencies.data,
            owners: owners.data.results,
            systemLanguages: system.data,
            timezones: timezones.data,
        })

        return context
    }


    /**
     * Read clients from the API. Used by the paginator component.
     * @param {Object} data - Context passed from the Paginator component.
     * @returns {Object} - Returns the client object from the API endpoint.
     */
    actions.readClients = async function({page}) {
        // Filter the selection based on the currently selected partner.
        let url = `/clients/?page=${page}`
        if (app.store.user.selectedPartner) {
            url += `&partner=${app.store.user.selectedPartner.id}`
        }
        let clients = await app.api.client.get(url)
        this.clients = clients.data
        return clients.data
    }


    /**
    * Delete a partner to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} client - The client object.
    */
    actions.upsertClient = function(client) {
        // Format the data that we are about to send to the API first.
        let payload = JSON.parse(JSON.stringify(client))
        if (client.id) {
            app.api.client.put(`clients/${client.id}/`, payload).then((res) => {
                app.vm.$shout({message: $t('Client {name} succesfully updated', {name: client.name})})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        } else {
            app.api.client.post('clients/', payload).then((res) => {
                app.vm.$shout({message: $t('Client {name} succesfully created', {name: client.name})})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        }
    }

    return actions
}
