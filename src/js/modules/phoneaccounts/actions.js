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
            app.vm.$notify({message: $t('Client {name} succesfully deleted', {name: client.name})})
            app.router.push({name: 'list_clients'})
        }
    }


    /**
    * Read phoneaccount from the API and update the client store object.
    * @param {String} clientId - ID of the client.
    * @param {String} phoneaccountId - ID of the phoneaccount.
    * @param {Boolean} formEndpoints - Include form data for selects.
    * @returns {Object} - All data related to the client form.
    */
    actions.readPhoneaccount = async function(clientId, phoneaccountId, formEndpoints = true) {
        let context = {}
        let promises = []

        if (formEndpoints) {
            promises = [
                app.api.client.get(`clients/${clientId}/phoneaccounts/calling_codes/`, {adapter: app.api.cachingAdapter}),
                app.api.client.get(`clients/${clientId}/phoneaccounts/regions_112/`, {adapter: app.api.cachingAdapter}),
            ]
        }

        if (phoneaccountId) promises.push(app.api.client.get(`clients/${clientId}/phoneaccounts/${phoneaccountId}/`))

        const res = await Promise.all(promises)
        if (formEndpoints) {
            Object.assign(context, {
                calling_codes: res[0].data,
                phoneaccount: phoneaccountId ? res[2].data : _module.getObservables().phoneaccount,
                regions_112: res[1].data,
            })
        } else {
            context.phoneaccount = phoneaccountId ? res[2].data : _module.getObservables().phoneaccount
        }

        return context
    }


    /**
    * Retrieve paginated phoneaccounts from the API.
    * Used by the paginator component.
    * @param {Object} clientId - Context passed from the Paginator component.
    * @returns {Object} - Returns the client object from the API endpoint.
    */
    actions.readPhoneaccounts = async function(clientId, page) {
        // Filter the selection based on the currently selected partner.
        let {data: phoneaccounts} = await app.api.client.get(`clients/${clientId}/phoneaccounts/?page=${page}`)
        return phoneaccounts
    }


    /**
    * Delete a partner to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {String} clientId - Id of the client the phoneaccount belongs to.
    * @param {String} [phoneaccountId] - Id to the phoneaccount.
    */
    actions.upsertPhoneaccount = function(clientId, phoneaccount) {
        // Format the data that we are about to send to the API first.
        let payload = JSON.parse(JSON.stringify(phoneaccount))
        if (!payload.n112_region.id) delete payload.n112_region
        if (phoneaccount.id) {
            app.api.client.put(`clients/${clientId}/phoneaccounts/${phoneaccount.id}/`, payload).then((res) => {
                app.vm.$notify({message: $t('Phoneaccount "{name}" succesfully updated', {name: phoneaccount.description})})
                app.router.push(app.utils.lastRoute('list_phoneaccounts'))
            })
        } else {
            app.api.client.post(`clients/${clientId}/phoneaccounts/`, payload).then((res) => {
                app.vm.$notify({message: $t('Phoneaccount "{name}" succesfully created', {name: phoneaccount.description})})
                app.router.push(app.utils.lastRoute('list_phoneaccounts'))
            })
        }
    }

    return actions
}
