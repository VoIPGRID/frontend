'use strict'


module.exports = (app) => {
    const template = app.templates.clients_add_edit_client
    return Vue.component('AddEditClient', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Object.assign(Vuex.mapState({
            client: state => state.clients.client,
        }), {
            formIsValid: function() {
                return Object.keys(this.fields).every(field => this.fields[field].valid)
            },
        }),
        mounted: function() {
            // Start of without validation errors.
            this.errors.clear()
            if (app.router.currentRoute.params.client_id) {
                app.vuex.dispatch('clients/readClient', app.router.currentRoute.params.client_id)
            } else {
                app.vuex.dispatch('clients/emptyClient')
            }
        },
    })
}
