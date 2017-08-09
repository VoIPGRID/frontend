module.exports = (app, actions) => {
    const template = app.templates.clients_delete_client
    return {
        created: function() {
            this.fetchData()
        },
        methods: {
            deleteClient: actions.deleteClient,
            fetchData: function() {
                actions.readClient.call(this, this.$store.clients, app.router.currentRoute.params.client_id)
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            client: 'clients.client',
        },
        watch: {
            $route: 'fetchData',
        },
    }
}
