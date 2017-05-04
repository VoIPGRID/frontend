'use strict'

module.exports = function(app) {
    return {
        readClient: (store, clientId) => {
            app.api.get(`clients/${clientId}/`).then((res) => {
                store.commit('CLIENT_CHANGED', res.data)
            })
        },
        readClients: (store) => {
            app.api.get('clients/').then((res) => {
                store.commit('CLIENTS_CHANGED', res.data)
            })
        },
        createClient: (store) => {
            const client = store.state.client
            app.api.post('clients/', client).then((res) => {
                store.dispatch('notify', {message: `Client ${client.name} succesfully created`}, {root: true})
                app.router.push({name: 'list_clients'})
            })
        },
        updateClient: (store) => {
            const client = store.state.client
            app.api.put(`clients/${client.id}/`, client).then((res) => {
                store.commit('CLIENT_CHANGED', res.data)
                store.dispatch('notify', {message: `Client ${client.name} succesfully updated`}, {root: true})
                app.router.push({name: 'list_clients'})
            })
        },
        deleteClient: (store) => {
            const client = store.state.client
            app.api.delete(`clients/${client.id}/`).then((res) => {
                store.commit('CLIENT_DELETED', client)
                store.dispatch('notify', {message: `Client ${client.name} succesfully deleted`}, {root: true})
                app.router.push({name: 'list_clients'})
            })
        },
    }
}
