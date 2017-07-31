module.exports = (app, actions) => {
    const template = app.templates.clients_delete_client
    return Vue.component('DeleteClient', {
        methods: {
            deleteClient: actions.deleteClient,
        },
        mounted: function() {
            actions.readClient(this.$store.clients, app.router.currentRoute.params.client_id)
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            client: 'clients.client',
        },
    })
}
