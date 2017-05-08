module.exports = function(app) {
    return {
        emptyClient: (store) => {
            store.commit('CLIENT_EMPTIED')
        },
        readClient: (store, clientId) => {
            app.api.get(`clients/${clientId}/`).then((res) => {
                store.commit('CLIENT_CHANGED', res.data)
            })
        },
        readClients: (store, data) => {
            return new Promise((resolve, reject) => {
                const uri = `${data.resource_url}?${app.utils.toQueryString(data.params)}`
                app.api.get(uri).then((res) => {
                    store.commit('CLIENTS_CHANGED', res.data)
                    resolve(res.data)
                })
            })
        },
        upsertClient: (store) => {
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
