'use strict'

module.exports = function(app) {
    return {
        /**
         * Set the clients variable state that is used for the client's
         * list view.
         * @param {Vuex.State} state - The client module's state.
         * @param {Array} clients - The updated array of clients from the API.
         */
        CLIENT_CHANGED: (state, client) => {
            state.client = client
        },
        CLIENT_EMPTIED: (state) => {
            state.partner = {}
        },
        /**
         * Remove the client from the store's clients.
         */
        CLIENT_DELETED: (state, client) => {
            state.clients = state.clients.filter((i) => i.id !== client.id)
        },
        CLIENTS_CHANGED: (state, clients) => {
            state.clients = clients
        },
    }
}
