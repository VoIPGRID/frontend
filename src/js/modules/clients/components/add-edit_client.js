module.exports = (app) => {
    const template = app.templates.clients_add_edit_client
    const validators = Vuelidate.validators

    return Vue.component('AddEditClient', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Object.assign(Vuex.mapState({
            client: state => state.clients.client,
        }), {
            formIsValid: function() {
                return !this.$v.$invalid
            },
        }),
        mounted: function() {
            // Start of without validation errors.
            if (app.router.currentRoute.params.client_id) {
                app.vuex.dispatch('clients/readClient', app.router.currentRoute.params.client_id)
            } else {
                app.vuex.dispatch('clients/emptyClient')
            }
        },
        validations: {
            client: {
                name: {
                    required: validators.required,
                    minLength: validators.minLength(3),
                },
            },
        },
    })
}
