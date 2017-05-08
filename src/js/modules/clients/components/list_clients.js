module.exports = (app) => {
    const template = app.templates.clients_list_clients
    return Vue.component('ListClients', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Vuex.mapState({
            clients: state => state.clients.clients,
            current_client: state => state.clients.current_client,
        }),
        mounted: function() {
            app.vuex.dispatch('clients/readClients')
        },
    })
}
