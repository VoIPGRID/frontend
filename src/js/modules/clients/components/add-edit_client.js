module.exports = (app) => {
    const template = app.templates.clients_add_edit_client
    const v = Vuelidate.validators

    return Vue.component('AddEditClient', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Object.assign(Vuex.mapState({
            audioLanguages: state => state.clients.audioLanguages,
            countries: state => state.clients.countries,
            currencies: state => state.clients.currencies,
            owners: state => state.clients.owners,
            client: state => state.clients.client,
            systemLanguages: state => state.clients.systemLanguages,
            timezones: state => state.clients.timezones,
        }), {
            formIsValid: function() {
                return !this.$v.$invalid
            },
        }),
        mounted: function() {
            app.vuex.dispatch('clients/readClient', app.router.currentRoute.params.client_id)
        },
        validations: {
            client: {
                name: {
                    required: v.required,
                    minLength: v.minLength(3),
                },
                description: {
                    maxLength: v.maxLength(63),
                },
                foreign_code: {
                    maxLength: v.maxLength(16),
                },
                billingprofile: {
                    billing_email: {
                        email: v.email,
                    },
                },
            },
        },
    })
}
