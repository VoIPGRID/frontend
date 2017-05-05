'use strict'


module.exports = (app) => {
    const template = app.templates.clients_add_client
    return Vue.component('AddClient', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Object.assign(
            Vuex.mapState({
                client: state => state.clients.client,
            }), {
                formIsValid: function() {
                    return Object.keys(this.fields).every(field => this.fields[field].valid)
                },
            }
        ),
    })
}
