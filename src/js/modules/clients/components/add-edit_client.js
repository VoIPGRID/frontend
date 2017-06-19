module.exports = (app) => {
    const template = app.templates.clients_add_edit_client
    const v = Vuelidate.validators

    return Vue.component('AddEditClient', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Object.assign(Vuex.mapState({
            anonymizeAfter: state => state.clients.anonymizeAfter,
            audioLanguages: state => state.clients.audioLanguages,
            blockedCallPermissions: state => state.clients.blockedCallPermissions,
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
                billingprofile: {
                    billing_email: {
                        email: v.email,
                    },
                    currency: {
                        required: v.required,
                    },
                },
                description: {
                    maxLength: v.maxLength(63),
                },
                foreign_code: {
                    maxLength: v.maxLength(16),
                },
                name: {
                    minLength: v.minLength(3),
                    required: v.required,
                },
                profile: {
                    audio_language: {
                        required: v.required,
                    },
                    country: {
                        code: {
                            required: v.required,
                        },
                    },
                    system_language: {
                        required: v.required,
                    },
                    timezone: {
                        required: v.required,
                    },
                },
            },
        },
    })
}
