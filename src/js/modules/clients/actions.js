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
            store.commit('CLIENT_DELETED', client)
            store.dispatch('notify', {message: `Client ${client.name} succesfully deleted`}, {root: true})
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
    actions.readClient = (store, clientId) => {
        app.api.get(`clients/${clientId}/`).then((res) => {
            store.commit('CLIENT_CHANGED', res.data)
        })
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
        if (client.id) {
            app.api.put(`clients/${client.id}/`, client).then((res) => {
                store.dispatch('notify', {message: `Client ${client.name} succesfully updated`}, {root: true})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        } else {
            app.api.post('clients/', client).then((res) => {
                store.dispatch('notify', {message: `Client ${client.name} succesfully created`}, {root: true})
                app.router.push(app.utils.lastRoute('list_clients'))
            })
        }
    }

    return actions
}
