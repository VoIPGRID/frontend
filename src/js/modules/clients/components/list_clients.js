module.exports = (app, actions) => {
    const template = app.templates.clients_list_clients
    return {
        asyncData: async function(store, route) {
            // return the Promise from the action
            let clientsData = await actions.readClients({
                params: {
                    page: 1,
                },
                resourceUrl: '/clients/',
            })
            store.clients.clients = clientsData.results
        },
        created: function() {
            this.clients = this.$store.clients.clients
        },
        methods: {
            fetchData: actions.readClients,
            selectClientContext: function(client) {
                this.$store.users.user.selectedClient = client
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            clients: 'clients.clients',
        },
    }
}
