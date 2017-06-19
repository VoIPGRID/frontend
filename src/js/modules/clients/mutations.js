module.exports = function(app) {
    /**
     * @memberof module:clients
     * @namespace
     */
    let mutations = {}

    /**
     * Editing client is changed.
     * @param {Observer} state - The client module scoped state.
     * @param {Object} client - The new client state.
     */
    mutations.CLIENT_CHANGED = function(state, client) {
        state.client = client
    }


    /**
     * Remove client from the clients list.
     * @param {Observer} state - The client module scoped state.
     * @param {Object} client - The new clients state without client.
     */
    mutations.CLIENT_DELETED = (state, client) => {
        state.clients.results = state.clients.results.filter((i) => i.id !== client.id)
    }


    /**
     * Editing client is changed.
     * @param {Observer} state - The client module scoped state.
     * @param {Object} options - The form's context options.
     */
    mutations.CLIENT_OPTIONS_CHANGED = (state, options) => {
        Object.assign(state, options)
    }


    /**
     * Change the current clients list.
     * @param {Observer} state - The client module scoped state.
     * @param {Object} clients - The client object to set state to.
     */
    mutations.CLIENTS_CHANGED = (state, clients) => {
        state.clients = clients
    }

    return mutations
}
