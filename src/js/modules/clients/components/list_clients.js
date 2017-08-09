module.exports = (app, actions) => {
    const template = app.templates.clients_list_clients
    return {
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
