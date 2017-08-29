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
    actions.deletePhoneaccount = async function(client) {
        const res = await app.api.client.delete(`clients/${client.id}/`)
        if (res.status === 204) {
            let clients = this.$store.clients.clients.results
            this.$store.clients.clients.results = clients.filter((i) => i.id !== client.id)
            app.vm.$shout({message: $t('Client {name} succesfully deleted', {name: client.name})})
            app.router.push({name: 'list_clients'})
        }
    }


    /**
    * Read phoneaccount from the API and update the client store object.
    * @param {String} clientId - ID of the client to read from the API.
    * @param {Boolean} formEndpoints - Include form data for selects.
    * @returns {Object} - All data related to the client form.
    */
    actions.readPhoneaccount = async function(clientId, phoneaccountId, formEndpoints = true) {
        console.log("READ PHONEACCOUNT")
        let context = {}
        let promises = []

        if (formEndpoints) {
            promises = [

            ]
        }

        if (phoneaccountId) promises.push(app.api.client.get(`clients/${clientId}/phoneaccounts/`))
        const res = await Promise.all(promises)

        // Object.assign(context, {
        //
        // })

        if (phoneaccountId) context.phoneaccount = res[0].data
        else context.phoneaccount = _module.getObservables().phoneaccount

        return context
    }


    /**
     * Retrieve paginated phoneaccounts from the API. Used by the paginator component.
     * @param {Object} data - Context passed from the Paginator component.
     * @returns {Object} - Returns the client object from the API endpoint.
     */
    actions.readPhoneaccounts = async function(clientId, page) {
        // Filter the selection based on the currently selected partner.
        let {data: phoneaccounts} = await app.api.client.get(`/clients/${clientId}/phoneaccounts/?page=${page}`)
        return phoneaccounts
    }


    /**
    * Delete a partner to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} client - The client object.
    */
    actions.upsertPhoneaccount = function(client) {
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
