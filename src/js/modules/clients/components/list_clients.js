module.exports = (app, actions) => {
    const template = app.templates.clients_list_clients
    return {
        methods: {
            readClients: actions.readClients,
            selectClientContext: function(client) {
                this.$store.user.selectedClient = client
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            clients: 'clients.clients',
        },
    }
}
