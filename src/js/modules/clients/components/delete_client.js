module.exports = (app) => {
    const template = app.templates.clients_delete_client
    return Vue.component('DeleteClient', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Vuex.mapState({
            client: state => state.clients.client,
        }),
        mounted: function() {
            app.vuex.dispatch('clients/readClient', app.router.currentRoute.params.client_id)
        },
    })
}
