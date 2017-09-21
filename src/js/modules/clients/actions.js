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
            app.vm.$notify({message: $t('Client {name} succesfully deleted', {name: client.name})})
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
        let promises = []

        if (formEndpoints) {
            promises = [
                app.api.client.get('clients/anonymize_after/', {adapter: app.api.cachingAdapter}),
                app.api.client.get('clients/audio_languages/', {adapter: app.api.cachingAdapter}),
                app.api.client.get('clients/blocked_call_permissions/', {adapter: app.api.cachingAdapter}),
                app.api.client.get('clients/countries/', {adapter: app.api.cachingAdapter}),
                app.api.client.get('clients/currencies/', {adapter: app.api.cachingAdapter}),
                app.api.client.get('clients/owners/'),
                app.api.client.get('clients/system_languages/', {adapter: app.api.cachingAdapter}),
                app.api.client.get('clients/timezones/', {adapter: app.api.cachingAdapter}),
            ]
        }

        if (clientId) promises.push(app.api.client.get(`clients/${clientId}/`))
        const res = await Promise.all(promises)

        if (formEndpoints) {
            Object.assign(context, {
                anonymizeAfter: res[0].data,
                audioLanguages: res[1].data,
                blockedCallPermissions: res[2].data,
                client: clientId ? res[8].data : _module.getObservables().client,
                countries: res[3].data,
                currencies: res[4].data,
                owners: res[5].data.results,
                systemLanguages: res[6].data,
                timezones: res[7].data,
            })
        } else {
            context.client = clientId ? res[0].data : _module.getObservables().client
        }

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
        let {data: clients} = await app.api.client.get(url)
        return clients
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
                app.vm.$notify({message: $t('Client {name} succesfully updated', {name: client.name})})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        } else {
            app.api.client.post('clients/', payload).then((res) => {
                app.vm.$notify({message: $t('Client {name} succesfully created', {name: client.name})})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        }
    }

    return actions
}
