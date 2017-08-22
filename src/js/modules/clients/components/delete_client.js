module.exports = (app, actions) => {
    const template = app.templates.clients_delete_client

    async function asyncData(route) {
        const clientId = route.params.client_id
        let clientData = await actions.readClient(clientId, false)
        Object.assign(app.store.clients, clientData)
        return clientData
    }

    return {
        asyncData: function(route) {
            return asyncData.call(this, route)
        },
        methods: {
            deleteClient: actions.deleteClient,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            client: 'clients.client',
        },
        watch: {
            $route: function(to, from) {
                asyncData.call(this, to)
            },
        },
    }
}
