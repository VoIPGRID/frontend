module.exports = (app, actions) => {
    const template = app.templates.clients_list_clients
    return {
        asyncData: async function(route) {
            // return the Promise from the action
            let currentPage = parseInt(route.query.page) || 1
            let clientsData = await actions.readClients({page: currentPage})
            app.store.clients.clients = clientsData
            return clientsData
        },
        created: function() {
            this.clients = this.$store.clients.clients
        },
        methods: {
            fetchData: async function(...args) {
                this.clients = await actions.readClients(...args)
            },
            /**
            * Set the context for the currently selected client and stores
            * it in a cookie to persist after page reload.
            * @param {Observable} client - The client object.
            */
            selectClientContext: function(client) {
                Object.assign(this.$store.user.selectedClient, {
                    id: client.id,
                    name: client.name,
                })
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            clients: 'clients.clients',
        },
    }
}
